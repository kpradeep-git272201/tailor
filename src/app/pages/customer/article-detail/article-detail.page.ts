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
    private route: ActivatedRoute,
    private wfService: WithfabricService,
    private iconService: IconService,
    private modalController: ModalController,
    private router: Router
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
    this.presentModal(ModelPage);
  }

  async presentModal(ModelPage?:any) {
    const modal = await this.modalController.create({
      component: ModelPage || ChartModelPage,
      cssClass: 'bottom-modal',
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.7,
      handle: true,
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirmed' && data) {
      console.log('Data received from modal:', data);
      this.handleModalData(data);
    }
  }
  handleModalData(data: any) {
    console.log('Processing received data:', data);
  }

  bookTailor(){
    this.openSizeChartModal(TailorPage);
    //this.router.navigate(["tabs/tailor"])
  }
}
