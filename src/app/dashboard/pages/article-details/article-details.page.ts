import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { IconService } from 'src/app/services/icon.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
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
  selectedTailor:any;
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

    this.articleName = this.route.snapshot.paramMap?.get('article');
    this.articleId = this.route.snapshot.paramMap?.get('articleId');
    const currentBooking = localStorage.getItem('currentBooking');
    if(currentBooking){
      const parseCurrentBooking = JSON.parse(currentBooking);
      this.selectedColor = parseCurrentBooking?.color;
      this.selectedTailor =  parseCurrentBooking?.tailor;
      this.navigatedData = parseCurrentBooking?.itme
    }

    this.route.queryParams.subscribe((params) => {
      this.loggedUser = !!localStorage.getItem('loggedUser'); 
      if (params['navigatedData']) {
        this.navigatedData = JSON.parse(params['navigatedData']);
        this.article = this.navigatedData.article;
        this.fabric = this.navigatedData.fabric;
      }
    });
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
  }

  removeQuntity() {
    if (this.quntity == 1) {
      return;
    }
    this.quntity--;
  }

  addQuntity() {
    this.quntity++;
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
    this.selectedTailor=tailor;
    this.currentBooking(loggedUser, tailor);
    this.goToOrderSummary();
    const myOrder: any = localStorage.getItem('myOrder');
    if (myOrder) {
      const order: any = JSON.parse(myOrder);
      const data = {
        phoneNumber: loggedUser?.phoneNumber,
        tailor: tailor,
        itme: this.navigatedData,
      };
      order.push(data);
      localStorage.setItem('myOrder', JSON.stringify(order));
    } else {
      const order = [
        {
          phoneNumber: loggedUser?.phoneNumber,
          tailor: tailor,
          itme: this.navigatedData,
        },
      ];
      localStorage.setItem('myOrder', JSON.stringify(order));
    }
  }
  currentBooking(loggedUser: any, tailor: any) {
    const data = {
      phoneNumber: loggedUser?.phoneNumber,
      tailor: tailor,
      itme: this.navigatedData,
      color: this.selectedColor,
    };
    localStorage.setItem('currentBooking', JSON.stringify(data));
  }

  goToOrderSummary() {
    this.router.navigate(['/main/with-fabric', this.articleName, this.articleId, 'order-summary']);
  }
}
