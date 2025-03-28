import { Component, EnvironmentInjector, inject } from '@angular/core';
import { SharedModule } from '../sharedmodule/sharedmodule.module';
import { Router } from '@angular/router';
import { IconService } from '../services/icon.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [SharedModule],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  appRole: any;

  constructor(private router: Router, private iconService: IconService) {
  
  }

  ionViewWillEnter() {
    console.log("Checking role...");
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo: any = JSON.parse(userInfoString);
      this.appRole = userInfo.appRole;
      this.router.navigate([userInfo.path]);
    } else {
      this.appRole = "defaultRole";
      this.router.navigate(['/tabs/customer']);
    }
  }
}
