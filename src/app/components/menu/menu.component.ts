import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { ToastController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports:[SharedModule]
})
export class MenuComponent  implements OnInit {

  constructor(private router: Router,
    private alertService: AlertService,
    private toastCtrl: ToastController,
    public dialogRef: MatDialogRef<MenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; id: number }

  ) {

  }

  ngOnInit() {}


  navigateTo(route: string) {
    this.dialogRef.close();// Close modal
    // this.router.navigate([route]); // Navigate to page
    this.alertService.showSnackbar("Coming soon!", "warning");
  }
  logout() {
    this.dialogRef.close();
    // Add logout logic here
    localStorage.removeItem("userInfo");
    this.router.navigate(['/auth']);
  }
  closeMenu(): void {
    this.dialogRef.close('Closed with response');
  }

}
