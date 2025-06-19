import { Component, EnvironmentInjector, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconService } from '../services/icon.service';
import { SharedModule } from '../sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class FooterPage implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  appRole: any;

  constructor(private router: Router, private iconService: IconService) {
    this.iconService.registerIcons();
  }
  ngOnInit()  {
   
  }

  ionViewWillEnter() {
    console.log("Checking role...");
    const loggedUserString = localStorage.getItem("loggedUser");
    if (loggedUserString) {
      const loggedUser: any = JSON.parse(loggedUserString);
      this.appRole = loggedUser.appRole;
      this.router.navigate([loggedUser.path]);
    } else {
      this.appRole = "defaultRole";
      this.router.navigate(['/tabs/customer']);
    }
  }

  myTabs(action:any){
    this.router.navigate(['/tabs/myTabs/'+action]);
  }

  onClick(action:string){
    if(action=="Home"){
      this.router.navigate(['/main/dashboard']);
    }else if(action=="Tailor"){
      this.router.navigate(['/main/tailor']);
    }else if(action=="Order"){
      this.router.navigate(['/main/myorder']);
    }else if(action=="Cart"){
      this.router.navigate(['/main/cart']);
    }else if(action=="Menu"){
      this.router.navigate(['/main/menu']);

    }
  }
}
