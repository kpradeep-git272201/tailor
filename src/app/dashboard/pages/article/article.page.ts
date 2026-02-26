import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common/common.service';
import { WithfabricService } from 'src/app/services/withfabric/withfabric.service';
import { MasterService } from 'src/app/services/master/master.service';
import { IconService } from 'src/app/services/icon/icon.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: true,
  imports: [SharedModule],
  providers: [ModalController],
})
export class ArticlePage implements OnInit {
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel | any;
  colorClassificatioMaster: any = [];
  searchQueryAuto: string = 'Search for ';
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  fabricByArticle: any = [];
  displayedFabrics: any = [];
  showAllFabric = false;
  allFabricsLoaded = false;
  initialDisplayCount = 6;
  loadMoreCount = 20;
  navigatedData: any = {};
  fabricCategory: any = [];
  articlesCategories: any = [];
  isScrolled = false;
  selectArticle: any = [];
  article: any;
  allFabricCategory: any;
  articleData: any;
  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private wfService: WithfabricService,
    private router: Router,
    private masterService: MasterService,
    private iconService: IconService
  ) {

  }

  onScroll(event: any) {
    const scrollTop = event.detail.scrollTop;
    this.isScrolled = scrollTop > 10;
  }
  ngOnInit() {
    this.getRouterState();
    this.iconService.registerIcons();
    const artilceId = this.route.snapshot.paramMap.get('articleId');
    if (artilceId) this.getArticleById(Number(artilceId));
    this.fabricByArticle = this.wfService.getFabricMasterData();
    this.updateDisplayedFabrics();
  }

  getRouterState() {
    const state = history.state;
    this.articleData = state.articleData;
    console.log(state.serviceType);   // With Fabric
    console.log(state.articleData);
  }
  ngAfterViewInit() {
    this.commonService.setCurrentPath();
  }

  getArticleById(articleId: any) {
    const fabricCategory$ = this.commonService.getFabricCategory(articleId);
    const allFabricCategory$ = this.commonService.getAllFabricCategory();
    forkJoin([fabricCategory$, allFabricCategory$]).subscribe(([fabricCategory, allFabricCategory]: any) => {

      if (fabricCategory.status == 200) {
        this.fabricCategory = fabricCategory.body.data;
        this.article = fabricCategory.body.data[0];
      } else {
        this.fabricCategory = [];
      }

      if (allFabricCategory.status == 200) {
        this.articlesCategories = allFabricCategory.body.data;
        this.allFabricCategory = allFabricCategory.body.data;
      } else {
        this.articlesCategories = [];
      }
    });
  }

  loadMoreFabrics() {
    this.updateDisplayedFabrics();
  }
  updateDisplayedFabrics() {
    const currentDisplayCountColor = this.displayedFabrics.length;
    const nextDisplayCount =
      currentDisplayCountColor +
      (currentDisplayCountColor === 0
        ? this.initialDisplayCount
        : this.loadMoreCount);
    this.displayedFabrics = this.fabricByArticle.slice(0, nextDisplayCount);
    this.allFabricsLoaded =
      this.displayedFabrics.length >= this.fabricByArticle.length;
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

  selectedFabric(fabric: any) {
    this.navigatedData.article = fabric;

    this.router.navigate(
      ['/main/article', fabric.fabricId, fabric.fabricCategoryId],
      {
        state: {
          serviceType: this.navigatedData.serviceType,
          article: this.navigatedData.article,
          fabric: fabric.fabric,
          articleData: this.articleData
        }
      }
    );
  }


  toggleSelection(selectedArticle: any) {
    selectedArticle.selected = !selectedArticle.selected;
    if (selectedArticle.selected) {
      if (!this.selectArticle.includes(selectedArticle.fabricCategoryId)) {
        this.selectArticle.push(selectedArticle.fabricCategoryId);
      }
    } else {
      this.selectArticle = this.selectArticle.filter(
        (id: any) => id !== selectedArticle.fabricCategoryId,
      );
    }
    this.articlesCategories = this.allFabricCategory
      .filter((fabricCategoryId: any) => (this.selectArticle.length == 0) ? true : this.selectArticle.includes(fabricCategoryId.fabricCategoryId));
  }



}
