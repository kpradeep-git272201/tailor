import { Component, OnInit } from '@angular/core';
import { TailorService } from 'src/app/services/tailor.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { IonCardSubtitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-top-rated-tailor',
  templateUrl: './top-rated-tailor.page.html',
  styleUrls: ['./top-rated-tailor.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, SharedModule]
})
export class TopRatedTailorPage implements OnInit {
 
  topRatedTailors: any = [];
  constructor(
        private tailorService: TailorService,
  ) { }

  ngOnInit() {
    this.topRatedTailors = this.tailorService.getTopRatedTailor();
  }

}
