import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';
import { AlertService } from 'src/app/services/alert.service';
import { TostService } from 'src/app/services/tost.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { ModalController } from '@ionic/angular';
import { ChartModelPage } from '../chart-model/chart-model.page';
import { CommonService } from 'src/app/services/common.service';
import { WithfabricService } from 'src/app/services/withfabric.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: true,
  imports: [SharedModule],
  providers: [ModalController],
})
export class ArticlePage implements OnInit {
  article: any;
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel | any;
  colorClassificatioMaster: any = [];
  searchQueryAuto: string = 'Search for ';
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  fabricByArticle: any=[];

  displayedFabrics: any = [];
  showAllFabric = false;
  allFabricsLoaded = false;
  initialDisplayCount = 6;
  loadMoreCount = 20;


  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private tostService: TostService,
    private modalController: ModalController,
    private commonService: CommonService,
    private wfService: WithfabricService,
    private router: Router
  ) {
    addIcons({ chevronForward });
  }

  ngOnInit() {
    this.fabricByArticle = this.wfService.getFabricMasterData();
    this.colorClassificatioMaster=this.commonService.getColorClassificatioMaster();
    this.route.queryParams.subscribe((params) => {
      if (params['article']) {
        this.article = JSON.parse(params['article']);
        // console.log("article", JSON.stringify(this.article));
        // this.fabricByArticle=fabricMaster.filter((article)=>{
        //   return article.articleIds.includes(this.article);
        // });
      }
      this.updateDisplayedFabrics();
    });
  }

  loadMoreFabrics() {
    this.updateDisplayedFabrics();
  }
  updateDisplayedFabrics() {
    const currentDisplayCountColor = this.displayedFabrics.length;
    const nextDisplayCount = currentDisplayCountColor + (currentDisplayCountColor === 0 ? this.initialDisplayCount : this.loadMoreCount);
    this.displayedFabrics = this.fabricByArticle.slice(0, nextDisplayCount);
    this.allFabricsLoaded = this.displayedFabrics.length >= this.fabricByArticle.length;
  }
  openSizeChartModal() {
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ChartModelPage,
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
  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  selectedFabric(fabric:any){
    this.router.navigate([`/tabs/customer/with-fabric/${this.article.articleName}`,fabric.fabricId],{
      queryParams: {
        article: JSON.stringify(this.article),
        fabric: JSON.stringify(fabric)
      }
    });
  }
}
