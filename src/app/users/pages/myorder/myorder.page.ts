import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { IonItemDivider } from "@ionic/angular/standalone";
import { IconService } from 'src/app/services/icon.service';


import {inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import moment from 'moment';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.page.html',
  styleUrls: ['./myorder.page.scss'],
  standalone: true,
  imports: [SharedModule,
        MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})


export class MyorderPage implements OnInit {
  loggedUser: any;
  orderList: any=[];
 private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  constructor(private iconService: IconService) { 

  }

  ngOnInit() {
    this.iconService.registerIcons();
     const loggedUserString = localStorage.getItem('loggedUser');
    if (loggedUserString) {
      this.loggedUser = JSON.parse(loggedUserString);
    }
    this.getMyOrder();
  }

  getMyOrder(){
     const myOrder: any = localStorage.getItem('myOrder');
    if (myOrder) {
      const order: any = JSON.parse(myOrder);
      this.orderList = order.filter((myOrder: any) => {
        return myOrder.phoneNumber == this.loggedUser.phoneNumber;
      });
    } 
  }

  getExceptedDate(bookingDate:any){
    return moment(bookingDate, "DD-MMM-YYYY").add(2, 'days').format("DD-MMM-YYYY");
  }

  getDeliveryDate(bookingDate:any){
    return moment(bookingDate, "DD-MMM-YYYY").add(5, 'days').format("MMM DD");;
  }
}
