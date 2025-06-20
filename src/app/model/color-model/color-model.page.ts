import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { ModalController } from '@ionic/angular';
import { IconService } from 'src/app/services/icon/icon.service';
import { WithfabricService } from 'src/app/services/withfabric/withfabric.service';
import { IonFabButton, IonFab } from "@ionic/angular/standalone";

@Component({
  selector: 'app-color-model',
  templateUrl: './color-model.page.html',
  styleUrls: ['./color-model.page.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, SharedModule],
})
export class ColorModelPage implements OnInit {
  selectedColor: any;
  colorMaster: any;
  constructor(
    private modalController: ModalController,
    private iconService: IconService,
    private wfService: WithfabricService,
  ) {
    this.iconService.registerIcons();
  }

  ngOnInit() {
    this.colorMaster = this.wfService.colorClassificationMaster();
  }

  dismiss() {
    this.modalController.dismiss();
  }


  selectColor(color: any) {
    this.selectedColor = color;
    this.modalController.dismiss(this.selectedColor , 'confirmed');
  }
  confirmSelection() {
    this.modalController.dismiss(this.selectedColor , 'confirmed');
  }
}
