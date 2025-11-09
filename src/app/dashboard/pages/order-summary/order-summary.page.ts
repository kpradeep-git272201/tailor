import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/icon/icon.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CommonService } from 'src/app/services/common/common.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { Location } from '@angular/common';
import { IonRadio, IonRadioGroup } from '@ionic/angular/standalone';
import { AddressPage } from 'src/app/users/pages/address/address.page';
import moment from 'moment';
import { Geolocation } from '@capacitor/geolocation';
import { MasterService } from 'src/app/services/master/master.service';

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
  currentLocation: any;
  selectedItems: any = [];
  APP_KEY='AIzaSyBZkhDjfujpipN2BX8tBQttWO-MON96QzI';
  billDetails: any;
  constructor(
    private iconService: IconService,
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private commonService: CommonService,
    private location: Location,
    private masterService: MasterService
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
    // this.getAddress();
    // if(!this.userAddress){
      this.getCurrentCoordinates()
    // }
    // if (currentBooking) {
    //   const parseCurrentBooking = JSON.parse(currentBooking);
    //   this.color = parseCurrentBooking?.color;
    //   this.tailor = parseCurrentBooking?.tailor;
    //   this.navigatedData = parseCurrentBooking?.itme;
    //   this.order.serviceType = this.navigatedData.serviceType;
    //   this.order.article = this.navigatedData.article;
    //   this.order.fabric = this.navigatedData.fabric;
    //   this.selectedItems=parseCurrentBooking?.selectedItem;
    // }
    this.route.queryParams.subscribe((params) => {
      if (params['order']) {
        this.myOrder = JSON.parse(params['order']);
        this.selectedItems = this.myOrder;
        this.calculateExpectedDeliveryDate();
      }
      if(params['billDetails']){
        this.billDetails = JSON.parse(params['billDetails']);
      }
    });
  }

  getAddressCurrent(lat:any, lon:any){
    this.commonService.getAddress(lat,lon).subscribe((res)=>{
      console.log(res);
    })
  }
  async getCurrentCoordinates() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates.coords);
    const latitude = coordinates.coords.latitude;
    const longitude = coordinates.coords.longitude;
    this.getCurrentLocation(latitude, longitude);
    // this.getAddressCurrent(latitude, longitude);
  }
  async getCurrentLocation(lat: number, lon: number) {
  try {
    // ✅ Google Maps Geocoding API URL
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=28.7055796,77.3287977&key=AIzaSyAoYbrW-KNT-M5K4JvCf1JAVWVf49Iu6sQ`;

    const response = await fetch(url);
    const data = await response.json();

    console.log("Google API Response:", data);

    if (data.results.length > 0) {
      const components = data.results[0].address_components;

      this.currentLocation = {
        fullAddress: data.results[0].formatted_address,
        area: components.find((x: any) =>
          x.types.includes("sublocality_level_1")
        )?.long_name,
        city: components.find((x: any) =>
          x.types.includes("locality")
        )?.long_name,
        district: components.find((x: any) =>
          x.types.includes("administrative_area_level_2")
        )?.long_name,
        state: components.find((x: any) =>
          x.types.includes("administrative_area_level_1")
        )?.long_name,
        pin: components.find((x: any) =>
          x.types.includes("postal_code")
        )?.long_name
      };

      console.log("Parsed Location:", this.currentLocation);
    } else {
      console.warn("No address found for given coordinates.");
    }
  } catch (err) {
    console.error("Error fetching location:", err);
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
        bookingDate: moment().format('DD-MM-YYYY'),
        orderId: this.getOrderId(),
        data: this.myOrder,
        selectedItems: this.selectedItems,
        billDetails: this.billDetails
      });
      localStorage.setItem('myOrder', JSON.stringify(myOrders));
    } else {
      localStorage.setItem(
        'myOrder',
        JSON.stringify([
          {
            phoneNumber: this.loggedUser.phoneNumber,
            bookingDate: moment().format('DD-MM-YYYY'),
            orderId: this.getOrderId(),
            data: this.myOrder,
            selectedItems: this.selectedItems,
            billDetails: this.billDetails
          },
        ]),
      );
    }

    this.removeArticleFromCart();
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

  removeArticleFromCart() {
    const updateShoppingBag = this.selectedItems.filter((item: any) => {
      return item.tailor != null;
    });
    const removeIds: any = [];
    updateShoppingBag.forEach((element: any) => {
      removeIds.push(element.artCatId);
    })
    const shoppingBag = localStorage.getItem('shopping_bag');
    if (shoppingBag) {
      const parseShoppingBag = JSON.parse(shoppingBag);

      const removeBag:any=[]=parseShoppingBag.filter((item: any) => {
        return !removeIds.includes(item.artCatId);
      });
      localStorage.setItem('shopping_bag', JSON.stringify(removeBag));
    }
    this.router.navigate(['/main/dashboard']);
  }

  calculateExpectedDeliveryDate(){

    const data = this.masterService.getTailorWorkHrs();
    let startDate = moment();
    let tailorWorkHrs = data.map((item, index) => {
    return {
      ...item,
        date: moment(startDate).add(index, "days").format("DD-MM-YYYY")
      };
    });

    this.selectedItems.forEach((element:any={})=>{
      const selectedTailor=  tailorWorkHrs.filter((tailor:any)=>{
          return tailor.tailorId==element.tailor.tailorId
        })
        let makingHrs=0;
        let makingDays=0;
        for (let i = 0; i < selectedTailor.length; i++) {
      const item = selectedTailor[i];
          makingHrs=makingHrs+item.hrs;
          if(element.hrs>=makingHrs){
            makingDays++;
            element.trialDate=moment(startDate).add((makingDays)*Number(element.quntity), "days").format("DD-MM-YYYY")
            element.expectedDeliveryDate=moment(startDate).add((makingDays+2)*Number(element.quntity), "days").format("DD-MM-YYYY")
          }else{
            element.trialDate=moment(startDate).add((makingDays)*Number(element.quntity), "days").format("DD-MM-YYYY")
            element.expectedDeliveryDate=moment(startDate).add((makingDays+2)*Number(element.quntity), "days").format("DD-MM-YYYY")
            break;
          }
        }
    })
    console.log(JSON.stringify(this.selectedItems));
  }
}
