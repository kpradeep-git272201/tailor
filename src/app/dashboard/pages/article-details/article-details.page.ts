import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { IconService } from 'src/app/services/icon/icon.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CommonService } from 'src/app/services/common/common.service';
import { ColorModelPage } from 'src/app/model/color-model/color-model.page';
import { TailorListPage } from 'src/app/tailor/pages/tailor-list/tailor-list.page';
// import 'swiper/css';
import { register } from 'swiper/element/bundle';
import { MasterService } from 'src/app/services/master/master.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
  standalone: true,
  imports: [SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] //add here
})
export class ArticleDetailsPage implements OnInit {

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel | any;
  article: any;
  fabric: any;
  subArtcles: any = [];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = true;
  pauseOnHover = false;
  pauseOnFocus = true;
  isWishlisted: boolean = false;
  navigatedData: any;
  colorMaster: any = [];
  selectedColor: any;
  quntity: number = 1;
  articleName: any | null;
  fabricId: any | null;
  loggedUser: any;
  selectedTailor: any;
  masterMenu: any = [];
  selectedArticle: any;
  selectedItem: any = [];
  colorModelPage: any = ColorModelPage;
  subArticles: any;
  currentSlideId = 'slide-0';
  articleColor: any;
  currentBag: any;
  articles: any;
  artCatTexture: any = [];
  colorTextures: any = [];
  articlesCategories: any;
  // articlesCategory: any;
  fabricCategory: any;
  fabricColor: any;
  serviceType: any;
  articleData: any;
  fabricColors: any;
  selectedFabricColor: any;
  selectedImage: any;
  constructor(
    private iconService: IconService,
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private commonService: CommonService,
    private masterService: MasterService
  ) {
    this.iconService.registerIcons();
  }

  ngAfterViewInit() {
    register();
    this.commonService.setCurrentPath();
  }

  ngOnInit() {
    this.getRouterState();
    const fabricCategoryId = this.route.snapshot.paramMap.get('artCatId');
    this.fabricId = this.route.snapshot.paramMap?.get('articleId');
    this.loadData(this.fabricId);
    // this.getColorTextureById(fabricCategoryId);
    // this.getArticleById(this.fabricId);
    this.route.queryParams.subscribe((params) => {
      this.loggedUser = !!localStorage.getItem('loggedUser');
    });
  }

  getRouterState() {
    const state = history.state;
    this.serviceType = state.serviceType;
    this.articleData = state.articleData;
    this.fabric = state.fabric;
    console.log(state);
  }

  loadData(fabricId: any) {
    const fabricCategory$ = this.commonService.getFabricCategoryByFabricId(fabricId);
    const fabricColor$ = this.commonService.getFabricByFabricId(fabricId);
    const fabricColorByFabricId$ = this.commonService.getFabricColorByFabricId(fabricId);
    forkJoin([fabricCategory$, fabricColor$, fabricColorByFabricId$]).subscribe(([fabricCategory, fabricColor, fabricColorByFabricId]: any) => {
      if (fabricCategory.status == 200) {
        this.fabricCategory = fabricCategory.body.data;
      } else {
        this.fabricCategory = {};
      }
      if (fabricColor.status == 200) {
        this.fabricColor = fabricColor.body.data;

      } else {
        this.fabricColor = [];
      }
      if (fabricColorByFabricId.status == 200) {
        this.fabricColors = fabricColorByFabricId.body.data;
        if (this.fabricColors.length > 0) {
          this.fabricColors[0].selected = true;   // first selected
          this.selectedFabricColor = this.fabricColors[0];
        }
      } else {
        this.fabricColors = [];
      }
      this.addToCurrentBag(this.articleData, this.selectedFabricColor);
    });
  }



  toggleSelection(color: any, index: number): void {
    this.fabricColors.forEach((c: any) => (c.selected = false));
    color.selected = true;
    this.selectedFabricColor = color;

    this.addToCurrentBag(this.articleData, color);
  }



  addToCurrentBag(article: any, color: any) {
    this.currentBag={};
    this.currentBag = {
      articleId: article.articleId,
      articleName: article.articleName,
      colorId: color.colorId,
      colorName: color.colorName,
      hexCode: color.hexCode,
      fabric: this.fabricCategory.fabricName,
      imageUrl: color.images[0].imageUrl,
      categoryName: this.fabricCategory.categoryName,
      quntity: 1,
      price: this.fabricCategory.pricePerMeter
    }
    console.log(JSON.stringify(this.currentBag));
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }



  openSizeChartModal(action: any, ModelPage?: any) {
    this.presentModal(action, ModelPage);
  }

  async changeColor(item: any) {
    const modal = await this.modalController.create({
      component: ColorModelPage,
      cssClass: 'bottom-modal',
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.7,
      handle: true,
      componentProps: {
        bookTailor: this.navigatedData,
        selectedItem: item,
      },
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirmed' && data) {
      item.colorName = data.colorName;
      item.colorCode = data.hexCode;
      item.colorDescription = data.description;
      this.selectedColor.description = data.description;
      this.selectedColor.colorName = data.colorName;
      this.selectedColor.hexCode = data.hexCode;
      this.selectedColor.colorId = data.colorId;
      this.selectedColor.fabricIds = data.fabricIds;
      this.selectedColor.category = data.category;
    }
  }

  async presentModal(action: any, ModelPage?: any, loggedUser?: any) {
    const selectedItem = this.selectedItem.filter((item: any) => {
      return item.isChecked;
    });
    const modal = await this.modalController.create({
      component: ModelPage,
      cssClass: 'bottom-modal',
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.7,
      handle: true,
      componentProps: {
        bookTailor: this.navigatedData, // pass your required data
        selectedItem: selectedItem,
      },
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirmed' && data) {
      if (action == 'selectedColor') {
        const selectedItem = this.selectedItem.filter((item: any) => {
          return item.isChecked;
        });
        this.selectedColor = data;
        const data1 = {
          phoneNumber: this.loggedUser?.mobile,
          tailor: this.selectedTailor,
          itme: this.navigatedData,
          color: this.selectedColor,
          selectedItem: selectedItem,
        };
        localStorage.setItem('currentBooking', JSON.stringify(data1));
      } else if (action == 'bookTailor') {
        this.handleModalData(data, loggedUser);
      }
    }
  }

  handleModalData(data: any, loggedUser: any) {
    console.log('Processing received data:', data);
    this.myOrders(data, loggedUser);
  }

  bookTailor() {
    const validateItem = this.validateItem();
    if (!validateItem) {
      this.alertService.showAlerCancel(
        'Alrert!',
        'Please check at least one Article',
        'alert',
      );
      return;
    }
    if (validateItem && !validateItem.articleId) {
      this.alertService.showAlerCancel(
        'Alrert!',
        'Please select at least one Article',
        'alert',
      );
      return;
    }
    if (!this.selectedColor) {
      this.openSizeChartModal('selectedColor', ColorModelPage);
      return;
    }

    if (!this.loggedUser) {
      this.alertService
        .showAlertWithCancel('Alrert!', 'Please login to continue', 'alert')
        .then((resp: any) => {
          if (resp) {
            this.commonService.setCurrentPath();
            this.router.navigate(['/auth/login']);
            return;
          }
        });
      return;
    }
    this.openSizeChartModal('bookTailor', TailorListPage);
  }

  myOrders(tailor: any, loggedUser: any) {
    this.selectedTailor = tailor;
    this.currentBooking(loggedUser, tailor);
    const selectedItem = this.selectedItem.filter((item: any) => {
      return item.isChecked;
    });
    const myOrder: any = localStorage.getItem('myOrder');
    if (myOrder) {
      const order: any = JSON.parse(myOrder);
      const data = {
        phoneNumber: loggedUser?.mobile,
        tailor: tailor,
        itme: this.navigatedData,
        selectedItem: selectedItem,
      };
      order.push(data);
      // localStorage.setItem('myOrder', JSON.stringify(order));
      this.goToOrderSummary(order);
    } else {
      const order = [
        {
          phoneNumber: loggedUser?.mobile,
          tailor: tailor,
          itme: this.navigatedData,
          selectedItem: this.selectedItem,
        },
      ];
      // localStorage.setItem('myOrder', JSON.stringify(order));
      this.goToOrderSummary(order);
    }
  }
  currentBooking(loggedUser: any, tailor: any) {
    const selectedItem = this.selectedItem.filter((item: any) => {
      return item.isChecked;
    });
    const data = {
      phoneNumber: loggedUser?.mobile,
      tailor: tailor,
      itme: this.navigatedData,
      color: this.selectedColor,
      selectedItem: selectedItem,
    };
    localStorage.setItem('currentBooking', JSON.stringify(data));
  }

  goToOrderSummary(myOrder: any) {
    this.router.navigate(
      ['/main/with-fabric', this.fabricId, this.fabricId, 'order-summary'],
      {
        queryParams: {
          order: JSON.stringify(myOrder),
        },
      },
    );
  }


  onTailorSelectChange(event: any, item: any) {
    const isChecked = event.detail.checked;
    item.isChecked = isChecked;
  }
  onArticleChange(event: any, item: any) {
    console.log('Selected Article ID:', event.detail.value);
    const article = this.masterMenu.filter((data: any) => {
      return data.articleId == event.detail.value;
    });

    if (article.length > 0) {
      (item.isChecked = false), (item.articleName = article[0].articleName);
      item.articleId = article[0].articleId;
      (item.colorName = this.selectedColor?.colorName),
        (item.colorCode = this.selectedColor?.hexCode),
        (item.colorDescription = this.selectedColor.description),
        (item.quntity = 1),
        (item.fabric = this.fabric?.fabricType),
        (item.price = this.fabric.pricePerMeter),
        (item.articleUrl = article[0].imageUrl),
        (item.fabricUrl = this.fabric.imageUrl),
        (item.fabricWashingInstruction = this.fabric.washingInstruction),
        (item.fabricIroning = this.fabric.ironing);
    }
  }

  removeItem(item: any) {
    this.selectedItem = this.selectedItem.filter((element: any) => {
      return element.articleId != item.articleId;
    });
  }

  validateItem() {
    const invalidItems = this.selectedItem.filter(
      (item: any) =>
        item.isChecked &&
        !(
          item.articleId == '' ||
          item.articleId === null ||
          item.articleId === undefined
        ),
    );

    return invalidItems.length > 0 ? invalidItems[0] : null;
  }
  addToWishList(article: any) {
    if (!this.loggedUser) {
      this.alertService
        .showAlertWithCancel('Alrert!', 'Please login to continue', 'alert')
        .then((resp: any) => {
          if (resp) {
            this.commonService.setCurrentPath();
            this.router.navigate(['/auth/login']);
            return;
          }
        });
      return;
    }
    this.isWishlisted = !this.isWishlisted;
  }


  addToBag() {
    if (!this.loggedUser) {
      this.alertService
        .showAlertWithCancel('Alrert!', 'Please login to continue', 'alert')
        .then((resp: any) => {
          if (resp) {
            this.commonService.setCurrentPath();
            this.router.navigate(['/auth/login']);
            return;
          }
        });
      return;
    }
    localStorage.setItem('shopping_bag', JSON.stringify([this.currentBag]));
    this.router.navigate(['/main/cart']);
  }

  getColorFilter(hex: string): string {
    switch (hex) {
      case '#F6D2D2':
        return 'hue-rotate(350deg) saturate(1.2)';
      case '#D3C8F4':
        return 'hue-rotate(250deg) saturate(1.1)';
      case '#F6F6F6':
        return 'grayscale(1) brightness(1.2)';
      case '#F6CA99':
        return 'hue-rotate(20deg) saturate(1.3)';
      default:
        return '';
    }
  }

  selectImage(img: any) {
    this.selectedImage = img;

    console.log(this.selectedImage);
  }


  /* selectedItems() {
    const items = {
      isChecked: false,
      articleName: this.article ? this.article.articleName : '',
      articleId: this.article ? this.article.articleId : '',
      colorName: this.selectedColor?.colorName,
      colorCode: this.selectedColor?.hexCode,
      colorDescription: this.selectedColor.description,
      quntity: 1,
      fabricType: this.fabric?.fabricType,
      price: this.fabric.pricePerMeter,
      hrs: this.article.hrs,
      articleUrl: this.article ? this.article.imageUrl : '',
      fabricUrl: this.fabric.imageUrl,
      fabricWashingInstruction: this.fabric.washingInstruction,
      fabricIroning: this.fabric.ironing,
    };
    this.selectedItem.push(items);
  } */

  /* addItems() {
    const items = {
      isChecked: false,
      articleName: '',
      articleId: '',
      colorName: this.selectedColor?.colorName,
      colorCode: this.selectedColor?.hexCode,
      colorDescription: this.selectedColor.description,
      quntity: 1,
      fabric: '',
      price: '',
      articleUrl: '',
      fabricUrl: '',
      fabricWashingInstruction: this.fabric.washingInstruction,
      fabricIroning: this.fabric.ironing,
    };
    this.selectedItem.unshift(items);
  } */


  /* getColorTextureById(id: any) {
    this.artCatTexture = this.masterService.getArticleCatTexture().filter((item: any) => {
      return item.artCatId == id;
    });
    if (this.artCatTexture) {
      this.colorTextures = this.artCatTexture[0]?.colorTexture[0];
      this.colorTextures.selected = true;
    }
  } */
  /* getArticleById(articleId: any) {
    this.articles = this.masterService.getArticles();
    this.article = this.articles.filter((artilce: any) => {
      return artilce.articleId == articleId;
    });
    if (this.articles) {
      this.article = this.article[0];
      this.getArticleCategoryByArticleId(this.article);
    }
  } */

  /* getArticleCategoryByArticleId(article: any) {
    this.articlesCategories = this.masterService.getArticleCategory().filter((item: any) => {
      return item.articleId == article.articleId;
    });
    this.articlesCategory = this.articlesCategories[0];
    this.addToCurrentBag(article, this.articlesCategory, this.colorTextures);
  } */


  /* selectColor(color: any) {
    this.selectedColor = color;
    if (this.selectedItem.length == 1) {
      this.selectedItem = [];
      this.selectedItems();
    }
  } */

  /* removeQuntity(article: any) {
    if (article.quntity == 1) {
      return;
    }
    article.quntity--;
  } */

  /* addQuntity(article: any) {
    if (!article.articleId) {
      this.alertService.showAlerCancel(
        'Alrert!',
        'Please select article first before add quantity',
        'alert',
      );
      return;
    }
    article.quntity++;
  } */
  /* toggleSelection(color: any, index: number): void {
    this.artCatTexture[0].colorTexture.forEach((element: any) => {
      element.selected = false;
    })
    this.colorTextures = this.artCatTexture[0].colorTexture[index];
    this.colorTextures.selected = true;
    this.addToCurrentBag(this.article, this.articlesCategory, color);
  } */
}
