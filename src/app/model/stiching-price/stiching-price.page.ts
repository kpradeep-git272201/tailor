import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-stiching-price',
  templateUrl: './stiching-price.page.html',
  styleUrls: ['./stiching-price.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class StichingPricePage implements OnInit {
  @Input() stichingPrice: any;
  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }
  async dismiss() {
    await this.popoverCtrl.dismiss().catch(() => { });
  }

}
