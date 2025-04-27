import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class OrderSummaryPage implements OnInit {
  articleName: any | null;
  articleId: any | null;
  navigatedData: any;
  order:any = {};
  color:any;
  tailor:any;
  
  constructor(
    private iconService: IconService,
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private commonService: CommonService,
    private location: Location
  ) {
    this.iconService.registerIcons();
  }

  ngOnInit() {

    this.articleName = this.route.snapshot.paramMap.get('article');
    this.articleId = this.route.snapshot.paramMap.get('articleId');
    const currentBooking = localStorage.getItem('currentBooking');
    
    if(currentBooking){
      const parseCurrentBooking = JSON.parse(currentBooking);
      this.color = parseCurrentBooking?.color;
      this.tailor =  parseCurrentBooking?.tailor;
      this.navigatedData = parseCurrentBooking?.itme;
      this.order.serviceType=parseCurrentBooking.serviceType;
      this.order.article=parseCurrentBooking.article;
      this.order.fabric=parseCurrentBooking.fabric;

    }

  }

}
