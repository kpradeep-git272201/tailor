import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { IconService } from 'src/app/services/icon.service';
import { WithfabricService } from 'src/app/services/withfabric.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { ChartModelPage } from '../chart-model/chart-model.page';
import { ModalController } from '@ionic/angular';
import { TailorPage } from '../../mytabs/tailor/tailor.page';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
  standalone: true,
  imports: [SharedModule],
  providers: [ModalController],
})
export class ArticleDetailPage implements OnInit {
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
  constructor(
   
    private wfService: WithfabricService,
    private iconService: IconService,
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private commonService: CommonService
  ) {
    this.iconService.registerIcons();
  }

  ngOnInit() {
    this.subArtcles = this.wfService.getSubArtcles();
    this.colorMaster = this.wfService.colorClassificationMaster();
    this.route.queryParams.subscribe((params) => {
      if (params['navigatedData']) {
        this.navigatedData = JSON.parse(params['navigatedData']);
        this.article = this.navigatedData.article;
        this.fabric = this.navigatedData.fabric;
      }
    });
  }

  ngAfterViewInit(){
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

  
  openSizeChartModal(ModelPage?:any) {
    const isLoggedIn = !!localStorage.getItem('loggedUser'); // or use your AuthService

  if (!isLoggedIn) {
    this.alertService.showAlertWithCancel('Alrert!','Please login to continue','alert').then((resp:any)=>{
      if(resp){
        this.commonService.setCurrentPath();
        // Redirect to login
        this.router.navigate(['/auth/login']);
        return;
      }
    });
    return;
  }

  // Continue to booking process if already logged in
  this.router.navigate(['/book-tailor']);
  this.presentModal(ModelPage, isLoggedIn);

  }

  async presentModal(ModelPage?:any, isLoggedIn?:any) {
    const modal = await this.modalController.create({
      component: ModelPage || ChartModelPage,
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
      console.log('Data received from modal:', data);
      this.handleModalData(data, isLoggedIn);
    }
  }
  handleModalData(data: any, isLoggedIn:any) {
    console.log('Processing received data:', data);
    this.myOrders(data, isLoggedIn);
  }

  bookTailor(){
    this.openSizeChartModal(TailorPage);
    //this.router.navigate(["tabs/tailor"])
  }

  myOrders(tailor:any, isLoggedIn:any){
    const myOrder:any=localStorage.getItem('myOrder');
    if(myOrder){
      const order:any = JSON.parse(myOrder);
      const data=  {
        phoneNumber: isLoggedIn.phoneNumber,
        tailor: tailor,
        itme: this.navigatedData
      }
      order.push(data);
      localStorage.setItem('myOrder', JSON.stringify(order));
    }else{
      const order=[
        {
          phoneNumber: isLoggedIn.phoneNumber,
          tailor: tailor,
          itme: this.navigatedData
        }
      ]
      localStorage.setItem('myOrder', JSON.stringify(order));
    }
  }
}
