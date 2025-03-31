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

      const lastPage = localStorage.getItem('lastVisitedPage');
      console.log('Last Visited Page:', lastPage); // Debugging ke liye

      if (lastPage) {
        this.zone.run(() => {
          this.router.navigateByUrl(lastPage);
        });
      } else {
        this.zone.run(() => {
          this.router.navigateByUrl('/tabs/customer/dashboard');
        });
      }
    });
  }
}
