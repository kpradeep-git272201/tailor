import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { ModalController } from '@ionic/angular';
import { IconService } from 'src/app/services/icon.service';


@Component({
  selector: 'app-filter-model',
  templateUrl: './filter-model.page.html',
  styleUrls: ['./filter-model.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class FilterModelPage implements OnInit {
  @Input() title: string | any;
  constructor(private modalController: ModalController,
     private iconService: IconService
   ) { 
    this.iconService.registerIcons();

   }

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
