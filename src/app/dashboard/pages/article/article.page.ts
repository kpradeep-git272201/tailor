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
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { ModalController } from '@ionic/angular';
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
  navigatedData:any;

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
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
      if (params['navigatedData']) {
        this.navigatedData = JSON.parse(params['navigatedData']);
        this.article=this.navigatedData.article;
     
      }
      this.updateDisplayedFabrics();
    });
  }
  ngAfterViewInit(){
    this.commonService.setCurrentPath();
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
    this.router.navigate([`/main/with-fabric/${this.article.articleName}`,fabric.fabricId],{
      queryParams: {
        navigatedData: JSON.stringify({
          serviceType: this.navigatedData.serviceType,
          article: this.navigatedData.article,
          fabric: fabric
        })
      }
    });
  }
}
