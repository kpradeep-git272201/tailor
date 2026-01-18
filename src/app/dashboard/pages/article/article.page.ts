import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { addIcons } from 'ionicons';
import {
  chevronForward,
  locationOutline,
  notificationsOutline,
  heartOutline,
  personOutline,
  checkmarkCircle,
} from 'ionicons/icons';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common/common.service';
import { WithfabricService } from 'src/app/services/withfabric/withfabric.service';
import { MasterService } from 'src/app/services/master/master.service';
import { IconService } from 'src/app/services/icon/icon.service';


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
  fabricByArticle: any = [];
  displayedFabrics: any = [];
  showAllFabric = false;
  allFabricsLoaded = false;
  initialDisplayCount = 6;
  loadMoreCount = 20;
  navigatedData: any = {};
  articles: any = [];
  articlesCategories: any = [];
  isScrolled = false;
  selectArticle: any = [];
  articlesCategory: any=[];
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
    this.iconService.registerIcons();
    const artilceId = this.route.snapshot.paramMap.get('articleId');
    this.getArticleById(artilceId);
    this.getArticleCategoryByArticleId(artilceId);
    this.fabricByArticle = this.wfService.getFabricMasterData();
    this.updateDisplayedFabrics();
  }
  ngAfterViewInit() {
    this.commonService.setCurrentPath();
  }
  getArticleById(articleId:any){
    this.articles=this.masterService.getArticles();
    this.article=this.articles.filter((artilce:any)=>{
      return artilce.articleId==articleId;
    });
    if(this.articles){
      this.article= this.articles[0]
    }
  }

  getArticleCategoryByArticleId(articleId: any){
    this.articlesCategories = this.masterService.getArticleCategory().filter((item:any)=>{
      return item.articleId==articleId;
    });
    this.articlesCategory=this.articlesCategories;
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

  selectedArticle(article: any) {
    this.navigatedData.article = article;
    this.router.navigate(
      [`/main/article/${article.articleId}`, article.artCatId],
      {
        queryParams: {
          navigatedData: JSON.stringify({
            serviceType: this.navigatedData.serviceType,
            article: this.navigatedData.article,
            fabric: article.fabric,
          }),
        },
      },
    );
  }

  toggleSelection(selectedArticle: any) {
    selectedArticle.selected = !selectedArticle.selected;
    if (selectedArticle.selected) {
      if (!this.selectArticle.includes(selectedArticle.artCatId)) {
        this.selectArticle.push(selectedArticle.artCatId);
      }
    } else {
      this.selectArticle = this.selectArticle.filter(
        (id: any) => id !== selectedArticle.artCatId,
      );
    }
    this.articlesCategories =this.masterService.getArticleCategory() 
      .filter((artCat:any) => ( this.selectArticle.length==0)? true : this.selectArticle.includes(artCat.artCatId));
  }



}
