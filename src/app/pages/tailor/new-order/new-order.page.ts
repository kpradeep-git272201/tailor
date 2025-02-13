import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class NewOrderPage implements OnInit {
  orders:any;
  constructor(private apiService: ApiService, private alertService: AlertService) { }

  ngOnInit() {
    this.loadOrders();
  }
  loadOrders() {
    const data = this.apiService.getNewOrders();
    this.orders = data.orders;
  }

  acceptOrder(orderId: number) {
    // this.orderService.updateOrderStatus(orderId, 'accepted').subscribe(() => {
    //   this.orders = this.orders.filter(order => order.id !== orderId);
    //   alert('Order accepted successfully!');
    // });
    this.alertService.showSnackbar("Order accepted successfully!", "success");
  }

  rejectOrder(orderId: number) {
    // this.orderService.updateOrderStatus(orderId, 'rejected').subscribe(() => {
    //   this.orders = this.orders.filter(order => order.id !== orderId);
    //   alert('Order rejected.');
    // });
    this.alertService.showSnackbar("Order rejected.", "danger");
  }
}
