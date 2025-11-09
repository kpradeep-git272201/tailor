import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-size-model',
  templateUrl: './size-model.page.html',
  styleUrls: ['./size-model.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class SizeModelPage implements OnInit {

  sizeChart = [
    { category: 'Child', fabric: 1 },
    { category: 'Adult Male', fabric: 2 },
    { category: 'Adult Female', fabric: 2.5 },
    { category: 'XL Male', fabric: 3 },
  ];
  selectedSize: any;

  constructor(private modalCtrl: ModalController) {}

 

  ngOnInit() {
  }

  selectSize(item: any) {
    this.selectedSize = item;
  }

  confirmSelection() {
    this.modalCtrl.dismiss( this.selectedSize, 'confirmed');
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
