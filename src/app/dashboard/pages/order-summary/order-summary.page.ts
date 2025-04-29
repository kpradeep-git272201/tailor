import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { Location } from '@angular/common';
import { IonRadio, IonRadioGroup } from "@ionic/angular/standalone";
import { AddressPage } from 'src/app/users/pages/address/address.page';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
  standalone: true,
  imports: [IonRadioGroup, IonRadio, SharedModule]
})
export class OrderSummaryPage implements OnInit {
  articleName: any | null;
  articleId: any | null;
  navigatedData: any;
  order:any = {};
  color:any;
  tailor:any;
  userAddress: any = null;
  paymentMode: string = 'cod';
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
    this.getAddress();

    if(currentBooking){
      const parseCurrentBooking = JSON.parse(currentBooking);
      this.color = parseCurrentBooking?.color;
      this.tailor =  parseCurrentBooking?.tailor;
      this.navigatedData = parseCurrentBooking?.itme;
      this.order.serviceType=this.navigatedData.serviceType;
      this.order.article=this.navigatedData.article;
      this.order.fabric=this.navigatedData.fabric;

    }

  }


  addNewAddress() {
    this.presentModal(AddressPage);
  }
  async presentModal(ModelPage: any) {
    const modal = await this.modalController.create({
      component: ModelPage,
      cssClass: 'bottom-modal',
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.7,
      handle: true,
      componentProps: {
        title: "Add Address"
      },
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirmed' && data) {
      this.userAddress=data;
    }
  }
  changeAddress() {
    this.addNewAddress();
  }
  
  getPaymentMode(event: any) {
    this.paymentMode = event.detail.value;
    console.log(event);
  }

  getAddress(){
    const myAddress = localStorage.getItem("myAddress");
    if(myAddress){
      const address = JSON.parse(myAddress)?.filter((item:any)=>{
        return item.defaultAddress==true;
      });
      
      this.userAddress=address[0];
    }
  }
}
