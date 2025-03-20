import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-chart-model',
  templateUrl: './chart-model.page.html',
  styleUrls: ['./chart-model.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ChartModelPage implements OnInit {

  constructor(private modalController: ModalController) {}

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
    this.closeModal();
  }

  closeModal() {
    const dataToSend = { selectedSize: 'L', color: 'Red' }; // Example data
    this.modalController.dismiss(dataToSend, 'confirmed'); // Pass data & role
  }
}
