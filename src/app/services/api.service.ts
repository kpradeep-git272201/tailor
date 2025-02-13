import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private mockEarningsData = {
    totalEarnings: 25000,
    payments: [
      { customerName: 'John Doe', service: 'Suit Stitching', amount: 5000, date: '10-Feb-2025' },
      { customerName: 'Jane Smith', service: 'Alteration', amount: 2000, date: '08-Feb-2025' },
      { customerName: 'Michael Lee', service: 'Custom Dress', amount: 7000, date: '09-Feb-2025' },
    ],
  };

  constructor() { 

  }

  getNewOrders() {
    return {
      orders: [
        { id: 1, customerName: 'John Doe', service: 'Suit Stitching', price: 5000, date: '2025-02-11' },
        { id: 2, customerName: 'Jane Smith', service: 'Pant Alteration', price: 1000, date: '2025-02-10' },
        { id: 3, customerName: 'Michael Lee', service: 'Custom Dress', price: 7000, date: '2025-02-09' },
      ],
    };
  }
  updateOrderStatus(orderId: number, status: string) {
    console.log(`Order ${orderId} updated to ${status}`);
    return { success: true };
  }
  getEarnings() {
    return this.mockEarningsData;
  }

  requestWithdrawal() {
    return { success: true, message: 'Withdrawal request submitted' };
  }

  orderList() {
    return [
      {
        id: '1',
        customerName: 'John Doe',
        service: 'Cloth Alteration',
        status: 'pending',
        orderDate: '2025-02-10T10:30:00',
        address: '123 Main Street, City, Country'
      },
      {
        id: '2',
        customerName: 'Jane Smith',
        service: 'Custom Suit Stitching',
        status: 'pending',
        orderDate: '2025-02-10T12:00:00',
        address: '456 Park Avenue, City, Country'
      },
      {
        id: '3',
        customerName: 'David Johnson',
        service: 'Wedding Dress Tailoring',
        status: 'pending',
        orderDate: '2025-02-10T14:15:00',
        address: '789 Elm Street, City, Country'
      }
    ]
  }

  getTailors(){
    const tailors = [
      { 
        id: 1, 
        name: 'John Doe', 
        specialization: 'Bridal Wear', 
        rating: 4.9, 
        experience: 10, 
        image: '/assets/tailorImg/tailor1.jpg',
        portfolio: ['assets/portfolio/portfolio1.png', 'assets/portfolio/portfolio2.png'],
        services: [
          { name: 'Bridal Dress Stitching', price: 150 },
          { name: 'Alterations', price: 50 },
        ],
        reviews: [
          { customer: 'Emma Watson', comment: 'Great service!', rating: 5 },
          { customer: 'John Smith', comment: 'Perfect fit, highly recommended!', rating: 4.8 }
        ]
      },
      { 
        id: 2, 
        name: 'Emma Smith', 
        specialization: 'Casual Wear', 
        rating: 4.7, 
        experience: 8, 
        image: '/assets/tailorImg/tailor2.png',
        portfolio: ['assets/portfolio/portfolio1.png', 'assets/portfolio/portfolio2.png'],
        services: [
          { name: 'Bridal Dress Stitching', price: 150 },
          { name: 'Alterations', price: 50 },
        ],
        reviews: [
          { customer: 'Emma Watson', comment: 'Great service!', rating: 5 },
          { customer: 'John Smith', comment: 'Perfect fit, highly recommended!', rating: 4.8 }
        ] 
      },
      { 
        id: 3, 
        name: 'Michael Brown', 
        specialization: 'Formal Wear', 
        rating: 4.8, 
        experience: 5, 
        image: '/assets/tailorImg/tailor1.jpg',
        portfolio: ['assets/portfolio/portfolio1.png', 'assets/portfolio/portfolio2.png'],
        services: [
          { name: 'Bridal Dress Stitching', price: 150 },
          { name: 'Alterations', price: 50 },
        ],
        reviews: [
          { customer: 'Emma Watson', comment: 'Great service!', rating: 5 },
          { customer: 'John Smith', comment: 'Perfect fit, highly recommended!', rating: 4.8 }
        ]
      },
      { 
        id: 4, 
        name: 'Sophia Johnson', 
        specialization: 'Custom Designs', 
        rating: 5.0, 
        experience: 12, 
        image: '/assets/tailorImg/tailor2.png',
        portfolio: ['assets/portfolio/portfolio1.png', 'assets/portfolio/portfolio2.png'],
        services: [
          { name: 'Bridal Dress Stitching', price: 150 },
          { name: 'Alterations', price: 50 },
        ],
        reviews: [
          { customer: 'Emma Watson', comment: 'Great service!', rating: 5 },
          { customer: 'John Smith', comment: 'Perfect fit, highly recommended!', rating: 4.8 }
        ] 
      }
    ];
    return tailors;
  }

  
  // Tailor Profile management

  getProfile() {
    return  {
      fullName: 'Raj Kumar',
      email: 'raj.kumar@example.com',
      phone: '9876543210',
      experience: 5,
      skills: 'Suit Stitching, Alteration, Custom Dress Making',
      profilePicture: 'https://via.placeholder.com/100', // Placeholder image
    };
  }

  updateProfile(updatedProfile: any) {
    return { success: true };
  }

  // Review & Feedback
  getReviews() {
    return {
      reviews: [
        { customerName: 'John Doe', rating: 5, feedback: 'Great stitching and perfect fit!', date: '2025-02-10' },
        { customerName: 'Jane Smith', rating: 4, feedback: 'Good work but slight delay in delivery.', date: '2025-02-09' },
        { customerName: 'Michael Lee', rating: 5, feedback: 'Absolutely fantastic tailoring!', date: '2025-02-08' },
      ],
    };
  }

  addReview(review: any) {
    console.log('New review added:', review);
    return { success: true };
  }


  // view booking in tailor end

  getBookings(){
    return {
      bookings: [
        { id: 1, customerName: 'John Doe', service: 'Suit Stitching', price: 5000, bookingDate: '2025-02-11', deliveryDate: '2025-02-20', status: 'Pending' },
        { id: 2, customerName: 'Jane Smith', service: 'Pant Alteration', price: 1000, bookingDate: '2025-02-10', deliveryDate: '2025-02-18', status: 'Completed' },
        { id: 3, customerName: 'Michael Lee', service: 'Custom Dress', price: 7000, bookingDate: '2025-02-09', deliveryDate: '2025-02-19', status: 'Pending' },
      ],
    };
  }

  updateBookingStatus(bookingId: number, status: string) {
    console.log(`Booking ${bookingId} updated to ${status}`);
    return { success: true };
  }
}
