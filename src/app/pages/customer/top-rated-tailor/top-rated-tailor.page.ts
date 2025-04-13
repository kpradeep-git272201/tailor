import { Component, OnInit } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { IconService } from 'src/app/services/icon.service';
import { IonCardSubtitle } from "@ionic/angular/standalone";
import { Router } from '@angular/router';

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
        private iconService: IconService,
        private router: Router
  ) {
    this.iconService.registerIcons();
  }

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

  viewTailor(tailor:any){
    console.log(JSON.stringify(tailor));
    this.router.navigate(["/tailor", tailor.tailorId]);
  }
}
