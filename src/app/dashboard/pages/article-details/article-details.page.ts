import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.page.html',
  styleUrls: ['./article-details.page.scss'],
  imports: [SharedModule],
  providers: [],
})
export class ArticleDetailsPage implements OnInit {
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel | any;
  article: any;
  fabric: any;
  subArtcles: any = [];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
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
  masterMenu: any=[];
  selectedArticle:any;
  selectedItem: any=[];
  fabricId: any;

  constructor(
    private iconService: IconService,
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private commonService: CommonService,
  ) {
    this.iconService.registerIcons();
  }

  ngOnInit() {
    this.subArtcles = this.commonService.getSubArtcles();
    this.colorMaster = this.commonService.colorClassificationMaster();
    this.masterMenu=this.commonService.getMasterMenu();
    this.articleId = this.route.snapshot.paramMap?.get('articleId');
    this.fabricId = this.route.snapshot.paramMap?.get('fabricId');
   
    const currentBooking = localStorage.getItem('currentBooking');
    if (currentBooking) {
      const parseCurrentBooking = JSON.parse(currentBooking);
      this.selectedColor = parseCurrentBooking?.color;
      this.selectedTailor = parseCurrentBooking?.tailor;
      this.navigatedData = parseCurrentBooking?.itme;
    }else{
      this.selectedColor=this.colorMaster[0];
    }

    this.route.queryParams.subscribe((params) => {
      this.loggedUser = !!localStorage.getItem('loggedUser');
      if (params['navigatedData']) {
        this.navigatedData = JSON.parse(params['navigatedData']);
        this.article = this.navigatedData?.article;
        this.fabric = this.navigatedData?.fabric;
        this.selectedArticle=this.article?.articleId;
      }
    });

    this.selectedItems();
  }

  ngAfterViewInit() {
    this.commonService.setCurrentPath();
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

  addToWishList() {
    this.isWishlisted = !this.isWishlisted;
  }

  selectColor(color: any) {
    this.selectedColor = color;
    if(this.selectedItem.length==1){
      this.selectedItem=[];
      this.selectedItems();
    }
  }

  removeQuntity(item:any) {
    if (item.quntity == 1) {
      return;
    }
    item.quntity--;
  }

  addQuntity(item:any) {
    item.quntity++;
  }

  openSizeChartModal(action: any, ModelPage?: any) {
    this.presentModal(action, ModelPage);
  }

  async presentModal(action: any, ModelPage?: any, loggedUser?: any) {
    const modal = await this.modalController.create({
      component: ModelPage,
      cssClass: 'bottom-modal',
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.7,
      handle: true,
      componentProps: {
        bookTailor: this.navigatedData, // pass your required data
        selectedItem: this.selectedItem
      },
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirmed' && data) {
      if (action == 'selectedColor') {
        this.selectedColor = data;
        const data1 = {
          phoneNumber: this.loggedUser?.phoneNumber,
          tailor: this.selectedTailor,
          itme: this.navigatedData,
          color: this.selectedColor,
          selectedItem: this.selectedItem
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
    if(this.validateItem() && !this.validateItem().articleId){
      this.alertService
        .showAlerCancel('Alrert!', 'Please select at least one Article', 'alert')
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
    // this.goToOrderSummary();
    const myOrder: any = localStorage.getItem('myOrder');
    if (myOrder) {
      const order: any = JSON.parse(myOrder);

      const data = {
        phoneNumber: loggedUser?.phoneNumber,
        tailor: tailor,
        itme: this.navigatedData,
        selectedItem: this.selectedItem
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
          selectedItem: this.selectedItem
        },
      ];
      // localStorage.setItem('myOrder', JSON.stringify(order));
      this.goToOrderSummary(order);
    }
  }
  currentBooking(loggedUser: any, tailor: any) {
    const data = {
      phoneNumber: loggedUser?.phoneNumber,
      tailor: tailor,
      itme: this.navigatedData,
      color: this.selectedColor,
      selectedItem: this.selectedItem
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

  addToCart() {
    const carts = localStorage.getItem('addToCart');
    const addToCart = [this.navigatedData];
    if (carts) {
      const cartParse = JSON.parse(carts);
      cartParse.push(addToCart);
    } else {
      localStorage.setItem('addToCart', JSON.stringify(addToCart));
    }
    console.log(JSON.stringify(this.navigatedData));
  }


  selectedItems(){
    const items={
      articleName: (this.article)?this.article.articleName:'',
      articleId: (this.article)?this.article.articleId:'',
      colorName: this.selectedColor?.colorName,
      colorCode: this.selectedColor?.hexCode,
      colorDescription: this.selectedColor.description,
      quntity: 1,
      fabricType: this.fabric?.fabricType,
      price: this.fabric.pricePerMeter,

      articleUrl: (this.article)?this.article.imageUrl:'',
      fabricUrl: this.fabric.imageUrl,
      fabricWashingInstruction: this.fabric.washingInstruction,
      fabricIroning: this.fabric.ironing
    }
    this.selectedItem.push(items);
  }

  addItems(){
     const items={
      articleName: "",
      articleId: "",
      colorName: this.selectedColor?.colorName,
      colorCode: this.selectedColor?.hexCode,
      colorDescription: this.selectedColor.description,
      quntity: 1,
      fabric: "",
      price: "",
      articleUrl: "",
      fabricUrl: "",
      fabricWashingInstruction: this.fabric.washingInstruction,
      fabricIroning: this.fabric.ironing
    }
    this.selectedItem.unshift(items);
  }

  onArticleChange(event: any, item: any) {
    console.log("Selected Article ID:", event.detail.value);
    const article= this.masterMenu.filter((data:any)=>{
      return data.articleId==event.detail.value;
    });

    if(article.length>0){
      item.articleName=article[0].articleName;
      item.articleId=article[0].articleId;
      item.colorName= this.selectedColor?.colorName,
      item.colorCode=this.selectedColor?.hexCode,
      item.colorDescription= this.selectedColor.description,
      item.quntity=1,
      item.fabric=this.fabric?.fabricType,
      item.price=this.fabric.pricePerMeter,
      item.articleUrl=article[0].imageUrl,
      item.fabricUrl= this.fabric.imageUrl,
      item.fabricWashingInstruction=this.fabric.washingInstruction,
      item.fabricIroning=this.fabric.ironing
    }
  }


  removeItem(item:any){
    this.selectedItem=this.selectedItem.filter((element:any)=>{
      return element.articleId != item.articleId;
    })
  }


  validateItem(){
    const isValid = this.selectedItem.find((item: { articleId: any; }) => !item.articleId);
    return isValid;
  }
}
