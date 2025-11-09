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
import 'swiper/css';
import { register } from 'swiper/element/bundle';
import { MasterService } from 'src/app/services/master/master.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
  standalone: true,
  imports: [SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // ✅ add here
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
  articleId: any | null;
  loggedUser: any;
  selectedTailor: any;
  masterMenu: any = [];
  selectedArticle: any;
  selectedItem: any = [];
  fabricId: any;
  colorModelPage: any = ColorModelPage;
  subArticles: any;
  currentSlideId = 'slide-0';
  articleColor: any;
  currentBag: any;
  articles: any;
  artCatTexture:any=[];
  colorTextures: any=[];
  articlesCategories: any;
  articlesCategory: any;
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


  ngOnInit() {
    const artCatId = this.route.snapshot.paramMap.get('artCatId');
    this.articleId = this.route.snapshot.paramMap?.get('articleId');
    this.getColorTextureById(artCatId);
    this.getArticleById(this.articleId);

    // this.subArtcles = this.commonService.getSubArtcles();
    // this.colorMaster = this.commonService.colorClassificationMaster();
    // this.masterMenu = this.commonService.getMasterMenu();
   
    // this.fabricId = this.route.snapshot.paramMap?.get('fabricId');

    // const currentBooking = localStorage.getItem('currentBooking');
    // if (currentBooking) {
    //   const parseCurrentBooking = JSON.parse(currentBooking);
    //   this.selectedColor = parseCurrentBooking?.color;
    //   this.selectedTailor = parseCurrentBooking?.tailor;
    //   this.navigatedData = parseCurrentBooking?.itme;
    // } else {
    //   this.selectedColor = this.colorMaster[0];
    // }

    this.route.queryParams.subscribe((params) => {
      this.loggedUser = !!localStorage.getItem('loggedUser');
    //   if (params['navigatedData']) {
    //     this.navigatedData = JSON.parse(params['navigatedData']);
    //     this.article = this.navigatedData?.article;
    //     this.fabric = this.navigatedData?.fabric;
    //     this.selectedArticle = this.article?.articleId;
    //     this.subArticles = this.article?.subArticles;
    //     if(this.subArticles){
    //       this.subArticles[0].selected=true;
    //       this.articleColor = this.subArticles[0];
    //       this.addToCurrentBag(this.article, this.subArticles[0]);
    //     }
    //   }
    });

    // this.selectedItems();
  }

  ngAfterViewInit() {
    register();
    this.commonService.setCurrentPath();
  }

  getColorTextureById(id:any){
    this.artCatTexture=this.masterService.getArticleCatTexture().filter((item:any)=>{
      return item.artCatId==id;
    });
    if(this.artCatTexture){
      this.colorTextures=this.artCatTexture[0]?.colorTexture[0];
      this.colorTextures.selected=true;
    }
  }
  getArticleById(articleId:any){
    this.articles=this.masterService.getArticles();
    this.article=this.articles.filter((artilce:any)=>{
      return artilce.articleId==articleId;
    });
    if(this.articles){
      this.article= this.article[0];
      this.getArticleCategoryByArticleId(this.article);
    }
  }

  getArticleCategoryByArticleId(article: any){
    this.articlesCategories = this.masterService.getArticleCategory().filter((item:any)=>{
      return item.articleId==article.articleId;
    });
    this.articlesCategory=this.articlesCategories[0];

    this.addToCurrentBag(article, this.articlesCategory, this.colorTextures);
  }
  toggleSelection(clrTexture: any, index: number): void {
    this.artCatTexture[0].colorTexture.forEach((element:any)=>{
      element.selected=false;
    })
     this.colorTextures=this.artCatTexture[0].colorTexture[index];
      this.colorTextures.selected=true;
    // this.subArticles.forEach(
    //   (a: { selected: boolean }) => (a.selected = false),
    // );
    // subArticle.selected = true;
    // this.articleColor = subArticle;
    this.addToCurrentBag(this.article, this.articlesCategory, clrTexture);

  }

  addToCurrentBag(article:any, artCategory:any, clrTexture?:any){
    this.currentBag={
      colorId: clrTexture.colorId,
      articleId: article.articleId,
      artCatId: artCategory.artCatId,
      articleName: article.articleName,
      fabric: artCategory.fabric,
      imageUrl: clrTexture.path,
      price: artCategory.priceId,
      hrs: artCategory.workHrsId,
      // subArticle:{
      //   imageUrl: artCategory.path,
      //   selected: artCategory.selected,
      //   subArticleId: artCategory.subArticleId
      // }
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



  selectColor(color: any) {
    this.selectedColor = color;
    if (this.selectedItem.length == 1) {
      this.selectedItem = [];
      this.selectedItems();
    }
  }

  removeQuntity(article: any) {
    if (article.quntity == 1) {
      return;
    }
    article.quntity--;
  }

  addQuntity(article: any) {
    if (!article.articleId) {
      this.alertService.showAlerCancel(
        'Alrert!',
        'Please select article first before add quantity',
        'alert',
      );
      return;
    }
    article.quntity++;
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
          phoneNumber: this.loggedUser?.phoneNumber,
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
        phoneNumber: loggedUser?.phoneNumber,
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
          phoneNumber: loggedUser?.phoneNumber,
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
      phoneNumber: loggedUser?.phoneNumber,
      tailor: tailor,
      itme: this.navigatedData,
      color: this.selectedColor,
      selectedItem: selectedItem,
    };
    localStorage.setItem('currentBooking', JSON.stringify(data));
  }

  goToOrderSummary(myOrder: any) {
    this.router.navigate(
      ['/main/with-fabric', this.articleId, this.fabricId, 'order-summary'],
      {
        queryParams: {
          order: JSON.stringify(myOrder),
        },
      },
    );
  }

  // addToCart() {
  //   let isChecked = false;
  //   this.selectedItem.filter((item: any) => {
  //     if (item.isChecked) {
  //       isChecked = true;
  //     }
  //     return;
  //   });
  //   if (isChecked) {
  //     const carts = localStorage.getItem('addToCart');
  //     const addToCart = this.selectedItem;
  //     if (carts) {
  //       const cartParse = JSON.parse(carts);
  //       cartParse.concat(addToCart);
  //     } else {
  //       localStorage.setItem('addToCart', JSON.stringify(this.selectedItem));
  //     }
  //   } else {
  //     this.alertService.showAlerCancel(
  //       'Alrert!',
  //       'Please check at least one Article',
  //       'alert',
  //     );
  //   }
  // }

  selectedItems() {
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
  }

  addItems() {
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
  addToWishList(article:any) {
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


  addToBag(){
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
    if(localStorage.getItem('shopping_bag')){
      const currentBag:any = localStorage.getItem('shopping_bag');
      const currentBagJson:any = JSON.parse(currentBag);
      const filterCart = currentBagJson.find((item:any)=>{
        return item.artCatId == this.currentBag.artCatId;
      });
      if(!filterCart){
        const data = currentBagJson.concat(this.currentBag);
        localStorage.setItem('shopping_bag', JSON.stringify(data));
      }
    }else{
      localStorage.setItem('shopping_bag', JSON.stringify([this.currentBag]));
    }
    this.router.navigate(['/main/cart']);
  }
}
