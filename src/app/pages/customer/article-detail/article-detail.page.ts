import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { IconService } from 'src/app/services/icon.service';
import { WithfabricService } from 'src/app/services/withfabric.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
  standalone: true,
  imports: [SharedModule],
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
  isWishlisted: boolean=false;

  constructor(
    private route: ActivatedRoute,
    private wfService: WithfabricService,
    private iconService: IconService,
  ) {}

  ngOnInit() {
    this.subArtcles = this.wfService.getSubArtcles();
    this.route.queryParams.subscribe((params) => {
      if (params['article']) {
        this.article = JSON.parse(params['article']);
      }
      if (params['fabric']) {
        this.fabric = JSON.parse(params['fabric']);
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
}
