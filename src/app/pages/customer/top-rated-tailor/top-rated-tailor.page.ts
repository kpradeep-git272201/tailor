import { Component, OnInit } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { IonCardSubtitle } from "@ionic/angular/standalone";
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-top-rated-tailor',
  templateUrl: './top-rated-tailor.page.html',
  styleUrls: ['./top-rated-tailor.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, SharedModule]
})
export class TopRatedTailorPage implements OnInit {
 
  allTailors: any[] = [];
  displayedTailors: any[] = [];
  initialDisplayCount = 5;
  loadMoreCount = 10;

  constructor(
        private tailorService: TailorService,
        private iconService: IconService
  ) {}

  ngOnInit() {
    this.allTailors = this.tailorService.getTopRatedTailor();
    this.displayedTailors = this.allTailors.slice(0, this.initialDisplayCount);
  }

  loadMore() {
    const currentCount = this.displayedTailors.length;
    const newCount = currentCount + this.loadMoreCount;
    this.displayedTailors = this.allTailors.slice(0, newCount);
  }

  get showLoadMoreButton(): boolean {
    return this.displayedTailors.length < this.allTailors.length;
  }
}
