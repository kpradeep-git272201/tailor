import { Component, Input, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-generic-model',
  templateUrl: './generic-model.page.html',
  styleUrls: ['./generic-model.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class GenericModelPage implements OnInit {
  @Input() title: string | any;
   constructor(private modalController: ModalController,
      private iconService: IconService
    ) { }

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
