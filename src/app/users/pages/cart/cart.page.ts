import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { TailorListPage } from 'src/app/tailor/pages/tailor-list/tailor-list.page';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CommonService } from 'src/app/services/common/common.service';
import { MasterService } from 'src/app/services/master/master.service';
import moment from 'moment';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class CartPage implements OnInit {

  shoppingBag: any = [];
  bookTailor: boolean = false;
  preferredDate: string = '';
  pickupLocation: string = '';
  loggedUser: any;
  fabricId: any;
  articleId: any;
  quntity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  tailor: any;
  item: any = {};
  masterArticle: any;
  selectedArticle: any = { 0: '' };
  articles: any = [];
  constructor(private route: ActivatedRoute,
    private modalController: ModalController,
    private router: Router,
    private alertService: AlertService,
    private commonService: CommonService,
    private masterService: MasterService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.loggedUser = !!localStorage.getItem('loggedUser');
    });
    this.loadRequiredData();
  }
  loadRequiredData() {
    const articles$ = this.commonService.getArticles();
    forkJoin([articles$,]).subscribe(([articles]: any) => {
      if (articles?.body?.data) {
        this.articles = articles.body.data;
      } else {
        this.articles = [];
      }
      this.getShoppingBag();
    });
  }
  getShoppingBag() {
    const shoppingBag = localStorage.getItem('shopping_bag');
    if (shoppingBag) {
      this.shoppingBag = JSON.parse(shoppingBag);
      this.shoppingBag.forEach((item: any) => {
        item.isAutoAssign = false;
        item.isBookTailor = false;
        item.tailor = null;
        item.quntity = 1;
        item.isFreez = false;
        item.isChecked = false;
        item.basePrice = item.price;
      })
    }
  }


  placeOrder(item: any) {
    const bookArticle = this.shoppingBag.filter((item: any) => {
      return item.isFreez;
    })
    this.goToOrderSummary(item, bookArticle);
    console.log('Order placed:', {
      items: this.shoppingBag,
      tailorBooked: item.tailor,
      date: this.preferredDate,
      location: this.pickupLocation
    });
  }

  changeTailor(item: any) {
    item.isFreez = !item.isFreez;
    this.getBookTailor(item);
  }
  async getBookTailor(item: any) {
    const subArticleIds: any = [];
    const checkedBag: any = [] = this.shoppingBag.filter((item: any) => {
      if (item.isChecked) {
        subArticleIds.push(item.artCatId);
      }
      return item.isChecked;
    });

    if (checkedBag.length == 0) {
      this.alertService.showAlerCancel(
        'Alrert!',
        'Please check at least one Article',
        'alert',
      );
      return;
    }
    item.serviceType = "With Fabric";
    const modal = await this.modalController.create({
      component: TailorListPage,
      cssClass: 'bottom-modal',
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.5,
      handle: true,
      componentProps: {
        bookTailor: item,
        selectedItem: [item],
      },
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirmed' && data) {
      this.tailor = data;
      item.isBookTailor = true;
      item.isAutoAssign = false;
      item.tailor = data;
      const checkedArticle = this.shoppingBag.filter((ele: any) => {
        return ele.isChecked;
      })
      item.totalTailorCharge = 0;
      this.shoppingBag.forEach((element: any) => {
        if (subArticleIds.includes(element.artCatId) && !element.isFreez && element.isChecked) {
          element.tailor = data;
          element.isFreez = true;
        }
        if (element.isChecked) {
          this.commonService.getArticleRatesByTailorAndArticle(data.tailorId, element.articleId).subscribe((resp: any) => {
            let priceList: any = resp.body?.data;
            const stichingPrice = priceList[0].rates.find((article: any) => article.articleId == element.articleId);
            element.stitchingPrice = stichingPrice.stitchingPrice * Number(element.quntity);
            item.totalTailorCharge = item.totalTailorCharge + element.stitchingPrice;
            this.calculateExpectedDeliveryDate(element, data, checkedArticle?.length);
          })

        }
      });
    } else {
      item.isFreez = !item.isFreez;
    }
  }



  goToOrderSummary(myOrder: any, bookArticle: any) {
    this.shoppingBag = this.shoppingBag.filter((item: any) => {
      return !item.isChecked;
    });
    localStorage.setItem('shopping_bag', JSON.stringify(this.shoppingBag));
    const billDetails = {
      itemTotal: this.calculateTotalPrice(),
      deliveryCharge: 0,
      handlingCharge: 9,
      totalTailorCharge: myOrder.totalTailorCharge,
      grandTotal: this.calculateTotalPrice(9, myOrder.totalTailorCharge)

    }
    this.router.navigate(
      ['/main/with-fabric', bookArticle[0].articleId, bookArticle[0].fabric, 'order-summary'],
      {
        queryParams: {
          billDetails: JSON.stringify(billDetails),
          order: JSON.stringify(bookArticle),
        },
      },
    );
  }
  currentBooking(tailor: any, item: any) {
    const data = {
      phoneNumber: this.loggedUser.phoneNumber,
      tailor: tailor,
      itme: item,
      color: item,
      selectedItem: [item],
    };
    localStorage.setItem('currentBooking', JSON.stringify(data));
  }


  onChangeQty(event: any, item: any) {
    const quntity = event.target.value;
    item.price = item.basePrice * quntity;
    item.quntity = quntity;
    if (item?.expectedDeliveryDate) {
      item.expectedDeliveryDate = moment(item?.expectedDeliveryDate).add((Number(item.quntity)), "days").format("DD-MM-YYYY")
    }
    if (item?.stitchingPrice) {
      item.stitchingPrice = item?.stitchingPrice * Number(item.quntity);
    }
  }

  addMoreOnChangeQty(event: any, item: any) {
    const quntity = event.target.value;
    item.price = item.basePrice * Number(quntity);
    item.quntity = quntity;
  }
  removeItem(item: any) {
    this.shoppingBag = this.shoppingBag.filter((i: { articleId: any; }) => i.articleId !== item.articleId);
    localStorage.setItem('shopping_bag', JSON.stringify(this.shoppingBag));
  }

  getAutoAssignTailor(item: any) {
    item.isAutoAssign = true;
    item.isBookTailor = false;
    item.tailor = null
    let totalPrice = 0;
    item.serviceType = "With Fabric";
    const subArticleIds: any = [];
    const checkedBag: any = [] = this.shoppingBag.filter((item: any) => {
      totalPrice = totalPrice + item.price;
      if (item.isChecked) {
        subArticleIds.push(item.artCatId);
      }
      return item.isChecked;
    });

    if (checkedBag.length == 0) {
      this.alertService.showAlerCancel(
        'Alrert!',
        'Please check at least one Article',
        'alert',
      );
      return;
    }
    const fabricPriceRange = this.masterService.fabricPriceRange();
    const avgPrice = totalPrice / this.shoppingBag.length;

    if (avgPrice) {
      const fabricRange = fabricPriceRange.find((price: any) => avgPrice >= price.min && avgPrice <= price.max);
      if (fabricRange) {
        // Get Tailor for this grad
        const allTailors = this.commonService.getTopRatedTailor();
        const tailor = allTailors.find((tailor: any) => tailor.grade == fabricRange.grade);
        console.log(tailor)
        this.shoppingBag.forEach((element: any) => {
          if (subArticleIds.includes(element.artCatId) && !element.isFreez) {
            element.tailor = tailor;
            element.isFreez = true;
          }
        });
      }
    }
  }

  onTailorSelectChange(event: any, item: any) {
    const isChecked = event.detail.checked;
    item.isChecked = isChecked;
  }

  selecteArticle(item: any, index: number) {
    item.isChecked = !item.isChecked;
  }
  getEdit(item: any) {
    item.isFreez = false;
  }


  addMoreArticle(item: any, index: number) {
    console.log(JSON.stringify(item))
    const newItem = {
      articleId: null,
      articleName: null,
      colorId: item.colorId || null,
      colorName: item.colorName || null,
      hexCode: item.hexCode || null,
      fabric: item.fabricName || null,
      imageUrl: null,
      categoryName: item.categoryName || null,
      quntity: 1,
      price: item.basePrice || null,
      basePrice: item.basePrice || null,
      isFreez: false,
      isChecked: false,
      isAutoAssign: false,
      isBookTailor: false,
      tailor: null,
      hrs: item?.hrs || null
    }
    this.shoppingBag.splice(index + 1, 0, newItem);
    console.log(JSON.stringify(this.shoppingBag));
  }

  onArticleChange(event: any, item: any) {
    item.articleId = event.detail.value.articleId;
    this.getArticleById(item);
  }

  getArticleById(item: any) {
    const article = this.articles.filter((artilce: any) => {
      return artilce.articleId == item.articleId;
    });
    if (article) {
      const articleObj = article[0];
      item.imageUrl = articleObj.imagePath,
        item.articleName = articleObj.articleName,
        this.getArticleCategoryByArticleId(item, articleObj);
    }
  }
  getArticleCategoryByArticleId(item: any, articleObj: any) {
    const articlesCategories = this.masterService.getArticleCategory().filter((resp: any) => {
      return resp.articleId == articleObj.articleId;
    });
    const articlesCategoryObj = articlesCategories[0];
    if (articlesCategories.length > 0) {
      item.articleId = item.articleId,
        item.artCatId = articlesCategoryObj.artCatId,
        item.articleName = articleObj.articleName,
        item.fabric = articlesCategoryObj.fabric,
        item.imageUrl = articlesCategoryObj.path,
        item.price = articlesCategoryObj.priceId,
        item.hrs = articlesCategoryObj.workHrsId
    }

  }

  calculateTotalPrice(tailorCharge?: any, gstAmount?: any): number {
    // shopping bag total
    const bagTotal = this.shoppingBag.reduce(
      (sum: number, current: { price: number }) => {
        return sum + (typeof current?.price === 'number' ? current?.price : 0);
      },
      0
    );

    // validation: tailorCharge
    const validTailorCharge =
      typeof tailorCharge === 'number' && !isNaN(tailorCharge)
        ? tailorCharge
        : 0;

    // validation: gstAmount
    const validGstAmount =
      typeof gstAmount === 'number' && !isNaN(gstAmount)
        ? gstAmount
        : 0;

    return bagTotal + validTailorCharge + validGstAmount;
  }


  getStichingPriceByTailorId(element: any, tailor: any) {

  }

  calculateExpectedDeliveryDate(element: any, tailor: any, countArticle: any = 0) {
    this.commonService.getLast10DaysWorkHours(tailor.tailorId).subscribe((response: any) => {
      const data = response.body?.data;

      let startDate = moment();
      let tailorWorkHrs = data.map((item: any, index: number) => {
        return {
          ...item,
          date: moment(startDate).add(index, "days").format("DD-MM-YYYY")
        };
      });

      let makingHrs = 0;
      let makingDays = 0;
      for (let i = 0; i < tailorWorkHrs.length; i++) {
        const item = tailorWorkHrs[i];
        makingHrs = makingHrs + item.workHours;

        if (element.hrs >= makingHrs) {
          makingDays++;
          element.trialDate = moment(startDate)
            .add(((makingDays) * Number(element.quntity) + countArticle), "days")
            .format("DD-MM-YYYY");
          element.expectedDeliveryDate = moment(startDate)
            .add(((makingDays + 2) * Number(element.quntity) + countArticle), "days")
            .format("DD-MM-YYYY");
        } else {
          makingDays = 1;
          element.trialDate = moment(startDate)
            .add(((makingDays) * Number(element.quntity) + countArticle), "days")
            .format("DD-MM-YYYY");
          element.expectedDeliveryDate = moment(startDate)
            .add(((makingDays + 2) * Number(element.quntity) + countArticle), "days")
            .format("DD-MM-YYYY");
          break;
        }
      }

      console.log(JSON.stringify(element));
    });
  }
}