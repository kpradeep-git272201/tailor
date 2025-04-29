import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconService } from 'src/app/services/icon.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class MenuPage implements OnInit {

  constructor(private iconService: IconService,
    private router: Router
  ) {
    this.iconService.registerIcons();
   }

  ngOnInit() {
  }


  onClick(action:string){
    if(action=="Address"){
      this.router.navigate(["main/user"]);
    }
  }
}
