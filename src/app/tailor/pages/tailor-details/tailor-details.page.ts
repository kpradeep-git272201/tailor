import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { StichingPricePage } from 'src/app/model/stiching-price/stiching-price.page';
import { MasterService } from 'src/app/services/master/master.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-tailor-details',
  templateUrl: './tailor-details.page.html',
  styleUrls: ['./tailor-details.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class TailorDetailsPage implements OnInit {
  tailor: any;

  private masterService = inject(MasterService);
  private popoverCtrl = inject(PopoverController);
  constructor(private router: Router) {

  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    this.tailor = navigation?.extras?.state?.['tailor'];

    this.oldWorkImage();
  }

  oldWorkImage() {
    if (!this.tailor.oldWorks) {
      this.tailor.oldWorks = [
        'assets/pre-work-img/preImg1.jpeg',
        'assets/pre-work-img/preImg2.jpeg',
        'assets/pre-work-img/preImg3.jpeg',
        'assets/pre-work-img/preImg4.jpeg'
      ];
    }

    console.log('Tailor Data:', this.tailor);
  }

  async viewPriceList(ev: any) {
    const stichingPrice = this.masterService.getTailorArticleRates().filter((rate: any) => {
      return rate.tailorId == this.tailor.tailorId;
    })

    const popover = await this.popoverCtrl.create({
      component: StichingPricePage,
      event: ev,
      translucent: true,
      cssClass: 'price-popover',
      componentProps: {
        stichingPrice: (stichingPrice) ? stichingPrice[0].rates : stichingPrice,
      },
    });
    await popover.present();
  }
}
