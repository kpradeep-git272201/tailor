import { Component, Input, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AddressPage implements OnInit {
  @Input() title: string | any;
  selectedType: string = '';
  addressForm!: FormGroup;

  constructor(private iconService: IconService,
    private modalController: ModalController,
    private fb: FormBuilder
  ) {
    this.iconService.registerIcons()
   }

  ngOnInit() {
    this.addressForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      pincode: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      houseNo: ['', Validators.required],
      area: ['', Validators.required],
      landmark: ['']
    });
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
    if (this.addressForm.valid) {
      const addressData = {
        ...this.addressForm.value,
        addressType: this.selectedType
      };
      console.log('Saved Address: ', JSON.stringify(addressData));
      localStorage.setItem("myAddress", JSON.stringify(addressData))
    } else {
      console.log('Form Invalid');
    }
  }


}
