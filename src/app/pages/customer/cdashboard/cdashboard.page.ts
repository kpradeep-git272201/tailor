import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { addIcons } from 'ionicons';
import { person, personOutline, settingsOutline, logOutOutline, cut, shirt, search, calendar, checkmarkCircle } from 'ionicons/icons';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cdashboard',
  templateUrl: './cdashboard.page.html',
  styleUrls: ['./cdashboard.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class CdashboardPage implements OnInit {
  isLoggedIn = false; // Change to true when user logs in
  userName = 'Customer'; // This will be fetched dynamically when the user logs in
  userInitial = this.userName.charAt(0).toUpperCase();
  appRole: any;

  tailors = [
    { 
      id: 1, 
      name: 'John Doe', 
      specialization: 'Bridal Wear', 
      rating: '4.9', 
      image: '/assets/tailorImg/tailor1.jpg',
      experience: 10,
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
      rating: '4.7', 
      image: '/assets/tailorImg/tailor2.png',
      experience: 10,
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
      rating: '4.8', 
      image: '/assets/tailorImg/tailor1.jpg',
      experience: 10,
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
  
  constructor(public dialog: MatDialog, private router: Router  ) {
    addIcons({cut, shirt,search,calendar,checkmarkCircle,personOutline,settingsOutline,logOutOutline,person});
  }

  ngOnInit() {
  
  }
  ionViewDidEnter() {
    this.loadUserInfo();
  }
  loadUserInfo() {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo: any = JSON.parse(userInfoString);
      this.appRole = userInfo.appRole;
      this.isLoggedIn = true;
    } else {
      this.appRole = '';
      this.isLoggedIn = false;
    }
  }
  openMenu(event: any, enterAnimationDuration: string, exitAnimationDuration: string) {
    const screenWidth = window.innerWidth;
    const menuWidth = 275; // Adjust based on your menu width
    const padding = 10; // Space from the right side
    const isMobile = screenWidth <= 768; // Adjust breakpoint if needed
  
    const dialogRef = this.dialog.open(MenuComponent, {
      height: '200px', 
      width: `${menuWidth}px`, 
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      position: {
        top: isMobile ? '50px' : '55px',  // Adjust for mobile
        left: isMobile ? `${screenWidth - menuWidth - padding}px` : 'auto', // Align to right
        right: isMobile ? 'auto' : `${padding}px` // Maintain right position for desktop
      },
      data: {
        title: 'My Modal Title',
        id: 123
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
    });
  }
  
  navigateTo() {
    this.router.navigate(['/auth']);
  }

  getExpTailors(){
    this.router.navigate(['/tabs/customer/tailors']);
  }

  viewProfile(tailor: any) {
    this.router.navigate(['/tabs/customer/tailor-profile', tailor.id],{
      queryParams:{
        tailor: JSON.stringify(tailor)
      }
    });
  }
}
