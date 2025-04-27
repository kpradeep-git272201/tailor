import { Platform } from '@ionic/angular';
import { Component, NgZone } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private zone: NgZone // NgZone Inject Karo
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isNativePlatform()) {
        StatusBar.setOverlaysWebView({ overlay: false });
        StatusBar.setBackgroundColor({ color: '#009688' });
      }

      // const redirectUrl = localStorage.getItem('redirectUrl');
      // if (redirectUrl) {
      //   const navigatedData = localStorage.getItem('navigatedData');
      //   if(navigatedData){
      //     this.router.navigate([decodeURIComponent(redirectUrl)],{
      //       queryParams: {
      //         navigatedData: navigatedData
      //       }
      //     });
      //   }else{
      //     this.router.navigate([decodeURIComponent(redirectUrl)]);
      //   }
      // } else {
      //   this.router.navigateByUrl('/tabs/customer/dashboard');
      // }
    });
  }
}
