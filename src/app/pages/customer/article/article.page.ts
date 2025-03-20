import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';
import { AlertService } from 'src/app/services/alert.service';
import { TostService } from 'src/app/services/tost.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { ModalController } from '@ionic/angular';
import { ChartModelPage } from '../chart-model/chart-model.page';
import { CommonService } from 'src/app/services/common.service';



@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: true,
   imports: [SharedModule],
   providers: [ModalController]
})
export class ArticlePage implements OnInit {
  article: any;
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel | any;
  colorClassificatioMaster: any=[];
  constructor(private route: ActivatedRoute,
    private alertService: AlertService,
    private tostService: TostService,
    private modalController: ModalController,
    private commonService: CommonService
  ) {
    addIcons({ chevronForward });
   }

  ngOnInit() {
    this.colorClassificatioMaster=this.commonService.getColorClassificatioMaster();
    this.route.queryParams.subscribe(params=>{
      if(params['article']){
        this.article=JSON.parse(params['article']);
      }
    });
  }

  openSizeChartModal(){
    // this.alertService.presentAlert("Alert!", "Impotant Message", "This is my first message");
    // this.tostService.presentToast("This is my first message", "success");
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ChartModelPage,
      cssClass: 'bottom-modal', // Apply custom styles (optional)
      breakpoints: [0, 0.5, 1], // Allows collapse effect
      initialBreakpoint: 0.7, // Opens at half screen
      handle: true, // Enables drag-to-close handle
    });
  
    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirmed' && data) {
      console.log('Data received from modal:', data);
      this.handleModalData(data); 
    }
  }
  handleModalData(data: any) {
    console.log('Processing received data:', data);
  }
}
