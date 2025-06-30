import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController,
    private toastController: ToastController,
  ) { }

  async showAlert(header: string, message: string, type: 'success' | 'warning' | 'alert') {
    let cssType = '';
    switch (type) {
      case 'success': cssType = 'success'; break;
      case 'warning': cssType = 'warning'; break;
      case 'alert': cssType = 'danger'; break;
    }
  
    const alert = await this.alertController.create({
      cssClass: `custom-alert ${cssType}`,
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'custom-ok-button'
        }
      ]
    });
    await alert.present();
  }
  
  async showAlertWithCancel(
    header: string,
    message: string,
    type: 'success' | 'warning' | 'alert'
  ): Promise<boolean> {
    let cssType = '';
    switch (type) {
      case 'success': cssType = 'success'; break;
      case 'warning': cssType = 'warning'; break;
      case 'alert': cssType = 'danger'; break;
    }
  
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        cssClass: `custom-alert ${cssType}`,
        header: header,
        message: message,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'custom-cancel-button',
            handler: () => resolve(false)
          },
          {
            text: 'OK',
            cssClass: 'custom-ok-button',
            handler: () => resolve(true)
          }
        ]
      });
  
      await alert.present();
    });
  }
  async showAlerCancel(
    header: string,
    message: string,
    type: 'success' | 'warning' | 'alert'
  ): Promise<boolean> {
    let cssType = '';
    switch (type) {
      case 'success': cssType = 'success'; break;
      case 'warning': cssType = 'warning'; break;
      case 'alert': cssType = 'danger'; break;
    }
  
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        cssClass: `custom-alert ${cssType}`,
        header: header,
        message: message,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'custom-cancel-button',
            handler: () => resolve(false)
          },
          // {
          //   text: 'OK',
          //   cssClass: 'custom-ok-button',
          //   handler: () => resolve(true)
          // }
        ]
      });
  
      await alert.present();
    });
  }

  async showToast(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    let cssClass = '';
  
    switch (type) {
      case 'success':
        cssClass = 'toast-success';
        break;
      case 'error':
        cssClass = 'toast-error';
        break;
      case 'warning':
        cssClass = 'toast-warning';
        break;
    }
  
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      cssClass: cssClass
    });
  
    await toast.present();
  }

  async presentAlert(header:string, subHeader:string, message:string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
  
    await alert.present();
  }

}
