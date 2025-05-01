import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.page.html',
  styleUrls: ['./wish-list.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class WishListPage implements OnInit {

  wishList: any=[];
  constructor(private iconService: IconService) { 
    this.iconService.registerIcons();
  }

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
