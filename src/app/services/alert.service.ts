import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  test:string = "Test";
  constructor(private alertCtrl: AlertController,
    private toastCtrl: ToastController) { 
   
  }

  async showSnackbar(message: string, status?: 'success' | 'warning' | 'danger') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000, // Show for 3 seconds
      position: 'bottom', // Display at the bottom
      color: status, // Change color based on status
      buttons: [{ text: 'OK', role: 'cancel' }]
    });
    await toast.present();
  }

}
