import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-accept-reject-orders',
  templateUrl: './accept-reject-orders.page.html',
  styleUrls: ['./accept-reject-orders.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AcceptRejectOrdersPage implements OnInit {

  orders: any[] = [];

  constructor(private apiService: ApiService, private alertService:AlertService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orders=this.apiService.orderList();
  }

  updateOrderStatus(orderId: string, status: string) {
    if(status=="accepted"){
      this.alertService.showSnackbar(`Order ${status}`, "success");
    }else{
      this.alertService.showSnackbar(`Order ${status}`, "danger");
    }
    // Need this code
    // this.apiService.post(`orders/${orderId}/update-status`, { status }).subscribe(async () => {
    //   this.orders = this.orders.filter(order => order.id !== orderId);
    //   const toast = await this.toastController.create({
    //     message: `Order ${status}`,
    //     duration: 2000,
    //     color: status === 'accepted' ? 'success' : 'danger'
    //   });
    //   toast.present();
    // });
  }
}
