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
    this.iconService.registerIcons();
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
}
