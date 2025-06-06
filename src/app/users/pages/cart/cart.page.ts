import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class CartPage implements OnInit {
  wishList: any=[];

  constructor() { }

  ngOnInit() {
    this.getWishList();
  }

  getWishList(){
    const getWishList = localStorage.getItem('wish_list');
    if(getWishList){
      this.wishList = JSON.parse(getWishList);
    }
  }
}
