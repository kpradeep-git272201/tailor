import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CommonService } from 'src/app/services/common.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { Location } from '@angular/common';
import { IonRadio, IonRadioGroup } from '@ionic/angular/standalone';
import { AddressPage } from 'src/app/users/pages/address/address.page';
import moment from 'moment';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class OrderSummaryPage implements OnInit {
  articleName: any | null;
  articleId: any | null;
  navigatedData: any;
  order: any = {};
  color: any;
  tailor: any;
  userAddress: any = null;
  paymentMode: string = 'cash';
  loggedUser: any;
  myOrder: any;
  currentLocation:any; 
  
  constructor(
    private iconService: IconService,
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private commonService: CommonService,
    private location: Location,
  ) {
    this.iconService.registerIcons();
    
  }

  ngOnInit() {
    const loggedUserString = localStorage.getItem('loggedUser');
    if (loggedUserString) {
      this.loggedUser = JSON.parse(loggedUserString);
    }
    this.articleName = this.route.snapshot.paramMap.get('article');
    this.articleId = this.route.snapshot.paramMap.get('articleId');
    const currentBooking = localStorage.getItem('currentBooking');
    this.getAddress();
    if(!this.userAddress){
      this.getCurrentCoordinates()
    }
    if (currentBooking) {
      const parseCurrentBooking = JSON.parse(currentBooking);
      this.color = parseCurrentBooking?.color;
      this.tailor = parseCurrentBooking?.tailor;
      this.navigatedData = parseCurrentBooking?.itme;
      this.order.serviceType = this.navigatedData.serviceType;
      this.order.article = this.navigatedData.article;
      this.order.fabric = this.navigatedData.fabric;
    }
    this.route.queryParams.subscribe((params) => {
      if (params['order']) {
        this.myOrder = JSON.parse(params['order']);
      }
    });
  }

  async getCurrentCoordinates() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates.coords);
    const latitude = coordinates.coords.latitude;
    const longitude = coordinates.coords.longitude;
    this.getCurrentLocation(latitude, longitude);
  }
  async getCurrentLocation(lat: any, lon: any) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
    );
    const data = await response.json();
    console.log(data);
    this.currentLocation=data;
   
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
        title: 'Add Address',
        currentLocation: this.currentLocation
      },
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirmed' && data) {
      this.userAddress = data;
    }
  }
  changeAddress() {
    this.addNewAddress();
  }

  getPaymentMode(event: any) {
    this.paymentMode = event.detail.value;
    console.log(event);
  }

  getAddress() {
    const myAddress = localStorage.getItem('myAddress');
    if (myAddress) {
      const address = JSON.parse(myAddress)?.filter((item: any) => {
        return item.phoneNumber == this.loggedUser.phoneNumber;
      });

      this.userAddress = address[0];
    }
  }
  confirmOrder() {
    this.alertService.showToast('Order placed successfully!', 'success');

    const myOrder: any = localStorage.getItem('myOrder');
    if (myOrder) {
      let myOrders = [];
      const order: any = JSON.parse(myOrder);
      myOrders = order.filter((myOrder: any) => {
        return myOrder.phoneNumber == this.loggedUser.phoneNumber;
      });
      myOrders.push({
        phoneNumber: this.loggedUser.phoneNumber,
        bookingDate: moment().format('DD-MMM-YYYY'),
        orderId: this.getOrderId(),
        data: this.myOrder,
      });
      localStorage.setItem('myOrder', JSON.stringify(myOrders));
    } else {
      localStorage.setItem(
        'myOrder',
        JSON.stringify([
          {
            phoneNumber: this.loggedUser.phoneNumber,
            bookingDate: moment().format('DD-MMM-YYYY'),
            orderId: this.getOrderId(),
            data: this.myOrder,
          },
        ]),
      );
    }
  }

getOrderId() {
  const now = new Date();
  const orderId =
    now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, '0') +
    now.getDate().toString().padStart(2, '0') +
    now.getHours().toString().padStart(2, '0') +
    now.getMinutes().toString().padStart(2, '0') +
    now.getSeconds().toString().padStart(2, '0') +
    now.getMilliseconds().toString().padStart(3, '0');
  return orderId;
}
 
}
