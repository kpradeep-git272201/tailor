import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { AlertController } from '@ionic/angular';




@Component({
  selector: 'app-book-tailor',
  templateUrl: './book-tailor.page.html',
  styleUrls: ['./book-tailor.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class BookTailorPage implements OnInit {
  tailorId: number | undefined;
  bookingForm: FormGroup;
  tailor = {
    id: 1,
    name: 'John Doe',
    specialization: 'Bridal Wear',
    image: '/assets/tailorImg/tailor1.jpg',
    services: [
      { name: 'Bridal Dress Stitching', price: 150 },
      { name: 'Alterations', price: 50 }
    ],
    availableTimeSlots: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM']
  };
  
  availableTimeSlots: string[] = [];

  constructor(private alertCtrl: AlertController, 
    private route: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      selectedService: ['', Validators.required],
      selectedDate: ['', Validators.required],
      selectedTime: ['', Validators.required],
      instructions: ['']
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tailorId = params['id'];
      console.log('Tailor ID:', this.tailorId);
      this.availableTimeSlots = this.tailor.availableTimeSlots;
    });
  }

  confirmBooking() {
    if (this.bookingForm.invalid) {
      alert('Please select all required fields.');
      return;
    }

    const bookingDetails = {
      tailorId: this.tailorId,
      ...this.bookingForm.value
    };
    
    this.submitBooking().then((res:any)=>{
      if(res){
        this.router.navigate(['/tabs/customer']);
      }
    });
    
  }

  setDate(event: any) {
    this.bookingForm.patchValue({ date: event.detail.value });
  }

  async submitBooking(): Promise<boolean> {
    if (this.bookingForm.valid) {
      const alert = await this.alertCtrl.create({
        header: 'Booking Confirmed!',
        message: `Your booking is confirmed for ${this.bookingForm.value.date}`,
        buttons: ['OK'],
        backdropDismiss: false,
      });
  
      await alert.present();
      await alert.onDidDismiss();
      this.bookingForm.reset();
      
      return true;
    }
  
    return false;
  }
}