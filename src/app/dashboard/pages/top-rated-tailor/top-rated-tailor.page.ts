import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { IconService } from 'src/app/services/icon/icon.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-top-rated-tailor',
  templateUrl: './top-rated-tailor.page.html',
  styleUrls: ['./top-rated-tailor.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class TopRatedTailorPage implements OnInit {


  allTailors: any[] = [];
  displayedTailors: any[] = [];
  initialDisplayCount = 5;
  loadMoreCount = 10;

  constructor(
        private iconService: IconService,
        private router: Router,
        private commonService: CommonService
  ) {
    this.iconService.registerIcons();
  }

  ngOnInit() {
    this.allTailors = this.commonService.getTopRatedTailor();
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

