import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { TailorListPage } from 'src/app/tailor/pages/tailor-list/tailor-list.page';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CommonService } from 'src/app/services/common/common.service';
import { MasterService } from 'src/app/services/master/master.service';
import moment from 'moment';


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
    // this.getShoppingBag();
    this.articles = this.masterService.getArticles();
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
        // item.addMore=[];
        item.basePrice = item.price;
      })
    }
  }

  // removeItem(item: any) {
  //   this.shoppingBag = this.shoppingBag.filter(i => i.articleId !== item.articleId);
  //   localStorage.setItem('addToCart', JSON.stringify(this.shoppingBag));
  // }
  // getSubtotal(): number {
  //   return this.shoppingBag.reduce((sum, item) => sum + (item.price * item.quntity), 0);
  // }
  // getTotal(): number {
  //   return this.getSubtotal() + (this.bookTailor ? 50 : 0);
  // }

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
      breakpoints: [0, 0, 0],
      initialBreakpoint: 1,
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
          element.stitchingPrice = this.getStichingPriceByTailorId(element, data);
          item.totalTailorCharge = item.totalTailorCharge + element.stitchingPrice;
          this.calculateExpectedDeliveryDate(element, data, checkedArticle?.length);
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
      "colorId": item.colorId,
      "articleId": null,
      "artCatId": item.artCatId,
      "articleName": null,
      "fabric": item.fabric,
      "imageUrl": null,
      "price": item.price,
      "hrs": item.hrs,
      "isAutoAssign": false,
      "isBookTailor": false,
      "tailor": null,
      "quntity": 1,
      "isFreez": false,
      "isChecked": false,
      "basePrice": item.price
      // articleId: item.articleId,
      // subArticleId: null,
      // articleName: null,
      // fabric: item.fabric,
      // imageUrl: null,
      // price: item.price,
      // hrs: item.hrs,
      // subArticle:{
      //   imageUrl: null,
      //   selected: false,
      //   subArticleId: null
      // },
      // isAutoAssign: false,
      // isBookTailor: false,
      // tailor: null,
      // quntity: 1,
      // isFreez: false,
      // basePrice: item.basePrice
    }


    this.shoppingBag.splice(index + 1, 0, newItem);
    console.log(JSON.stringify(this.shoppingBag));
    // item.addMore.push({
    //   quntity: 1,
    //   isChecked: false,
    //   price: item.basePrice,
    //   basePrice: item.basePrice,
    //   imageUrl: item.subArticle.imageUrl,
    //   fabric: item.fabric,
    //   tailor: null,
    //   articles: this.commonService.getMasterMenu()
    // });
  }

  onArticleChange(event: any, item: any) {
    console.log('Selected Article ID:', event.detail.value);

    item.articleId = event.detail.value.articleId;
    this.getArticleById(item);
    // item.imageUrl = event.detail.value.imageUrl;
    // item.articleName = event.detail.value.articleName;
    // item.subArticleId = event.detail.value.articleId;
    // item.subArticle.imageUrl = event.detail.value.imageUrl;
    // item.subArticle.subArticleId = event.detail.value.articleId;
  }

  getArticleById(item: any) {
    const article = this.articles.filter((artilce: any) => {
      return artilce.articleId == item.articleId;
    });
    if (article) {
      const articleObj = article[0];
      item.imageUrl = articleObj.path,
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
        return sum + (typeof current.price === 'number' ? current.price : 0);
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
    let priceList: any = this.masterService.getTailorArticleRates().find((price: any) => {
      return price.tailorId == tailor.tailorId;
    })
    const stichingPrice = priceList?.rates.find((article: any) => article.articleId == element.articleId);
    console.log(JSON.stringify(stichingPrice))
    return stichingPrice.stitchingPrice * Number(element.quntity);
  }

  calculateExpectedDeliveryDate(element: any, tailor: any, countArticle: any = 0) {
    const data = this.masterService.getTailorWorkHrs().filter((tailor1: any) => {
      return tailor1.tailorId == tailor.tailorId;
    });
    let startDate = moment();
    let tailorWorkHrs = data.map((item, index) => {
      return {
        ...item,
        date: moment(startDate).add(index, "days").format("DD-MM-YYYY")
      };
    });
    const selectedTailor = tailorWorkHrs.filter((tailor: any) => {
      return tailor.tailorId == tailor.tailorId
    })
    let makingHrs = 0;
    let makingDays = 0;
    for (let i = 0; i < selectedTailor.length; i++) {
      const item = selectedTailor[i];
      makingHrs = makingHrs + item.hrs;
      if (element.hrs >= makingHrs) {
        makingDays++;
        element.trialDate = moment(startDate).add(((makingDays) * Number(element.quntity) + countArticle), "days").format("DD-MM-YYYY")
        element.expectedDeliveryDate = moment(startDate).add(((makingDays + 2) * Number(element.quntity) + countArticle), "days").format("DD-MM-YYYY")
      } else {
        makingDays = 1;
        element.trialDate = moment(startDate).add(((makingDays) * Number(element.quntity) + countArticle), "days").format("DD-MM-YYYY")
        element.expectedDeliveryDate = moment(startDate).add(((makingDays + 2) * Number(element.quntity) + countArticle), "days").format("DD-MM-YYYY")
        break;
      }
    }
    console.log(JSON.stringify(element));
  }
}