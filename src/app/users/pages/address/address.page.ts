import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonAccordion, IonCheckbox } from '@ionic/angular/standalone';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonAccordion, SharedModule],
})
export class AddressPage implements OnInit {
  @Input() title: string | any;
  @Input() currentLocation: any;
  selectedType: string = '';
  addressForm!: FormGroup;
  @ViewChild('accordionGroup', { static: true }) accordionGroup!: any;
  userAddressList: any = [];
  loggedUser: any;
  openedAccordion: string | null = null;
  constructor(
    private iconService: IconService,
    private modalController: ModalController,
    private fb: FormBuilder,
  ) {
    this.iconService.registerIcons();
  }

  ngOnInit() {
    
    const loggedUserString = localStorage.getItem('loggedUser');
    if (loggedUserString) {
      this.loggedUser = JSON.parse(loggedUserString);
    }
    console.log(JSON.stringify(this.currentLocation));
    this.addressForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      pincode: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      houseNo: ['', Validators.required],
      area: ['', Validators.required],
      defaultAddress: [''],
      landmark: [''],
    });

    if (this.currentLocation) {
      const currentLocation = {
        city: this.currentLocation.address.city,
        state: this.currentLocation.address.state_district,
        pincode: this.currentLocation.address.postcode,
        area: this.currentLocation.display_name,
        phoneNumber: this.loggedUser.phoneNumber || '',
      };
      this.addressForm.patchValue(currentLocation);
    }
    this.getAddressList();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  selectType(type: string) {
    this.selectedType = type;
  }

  addAlternatePhone() {
    console.log('Add Alternate Phone Clicked');
  }

  addLandmark() {
    console.log('Add Landmark Clicked');
  }

  useMyLocation() {
    console.log('Use My Location Clicked');
  }

  saveAddress() {
    const addressList = [];
    if (this.addressForm.valid) {
      const myAddress = localStorage.getItem('myAddress');
      if (myAddress) {
        this.userAddressList = JSON.parse(myAddress);
      }

      const addressData = {
        ...this.addressForm.value,
        addressType: this.selectedType,
      };
      this.userAddressList.push(addressData);
      console.log('Saved Address: ', JSON.stringify(this.userAddressList));
      localStorage.setItem('myAddress', JSON.stringify(this.userAddressList));
      if (this.title) {
        this.modalController.dismiss(addressData, 'confirmed');
      } else {
        this.getAddressList();
      }
    } else {
      console.log('Form Invalid');
    }
  }
  toggleAccordion = () => {
    const nativeEl = this.accordionGroup;
    if (nativeEl.value === 'second') {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = 'second';
    }
  };

  getAddressList() {
    const myAddress = localStorage.getItem('myAddress');
    if (myAddress) {
      this.userAddressList = JSON.parse(myAddress);
    }else{
     this.openedAccordion = 'first';
    }
  }
}
