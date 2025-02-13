import { Component, EnvironmentInjector, inject } from '@angular/core';
import { addIcons } from 'ionicons';
import { settings, home, help, person } from 'ionicons/icons';
import { SharedModule } from '../sharedmodule/sharedmodule.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [SharedModule],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  appRole: any;

  constructor(private router: Router,) {
    addIcons({ settings, home, help, person });
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
