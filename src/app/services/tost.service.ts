import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class TostService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string, status?: 'success' | 'warning' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Show for 3 seconds
      position: 'middle', // Change position to middle
      color: status, // Change color based on status
      buttons: [{ text: 'OK', role: 'cancel' }]
    });
    await toast.present();
  }
}
