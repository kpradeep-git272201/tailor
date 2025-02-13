import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';


@Component({
  selector: 'app-tdashboard',
  templateUrl: './tdashboard.page.html',
  styleUrls: ['./tdashboard.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class TdashboardPage implements OnInit {
  isLoggedIn = false; // Change to true when user logs in
  userName = 'Admin'; // This will be fetched dynamically when the user logs in
  userInitial = this.userName.charAt(0).toUpperCase();
  appRole: any;
  cards = [
    { path: 'accept-reject-orders', title: 'Accept/Reject Orders', icon: 'bag-handle',description: 'Manage incoming orders.' },
    { path: 'earning-dashboard', title: 'Earnings Dashboard', icon: 'cash', description: 'Track your earnings and payments.' },
    { path: 'new-orders', title: 'New Orders', icon: 'document-text', description: 'View and manage new orders.' },
    { path: 'profile-management', title: 'Profile Management', icon: 'person-circle', description: 'Update your personal profile.' },
    { path: 'review-feedback', title: 'Review Feedback', icon: 'chatbubbles', description: 'Manage reviews and feedback.' },
    { path: 'view-bookings', title: 'View Bookings', icon: 'calendar',  description: 'View and manage your bookings.' },
    { path: 'view-bookings', title: 'Test-1', icon: 'calendar',  description: 'View and manage your bookings.' },
    { path: 'view-bookings', title: 'Test-2', icon: 'calendar',  description: 'View and manage your bookings.' }
  ];
  displayedCards: any = [];
  showSeeAll = false;
  constructor(private router: Router, public dialog: MatDialog,
    private route: ActivatedRoute) {

  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo: any = JSON.parse(userInfoString);
      this.appRole = userInfo.appRole;
      this.isLoggedIn = true;
    } else {
      this.appRole = '';
      this.isLoggedIn = false;
    }
    this.updateDisplayedCards();
  }
  updateDisplayedCards() {
    this.displayedCards = this.cards.slice(0, 6);
    this.showSeeAll = this.cards.length > 6;
  }

  viewAllCards() {
    this.displayedCards = this.cards;
    this.showSeeAll = false;
  }

  navigateTo(path: string): void {
    this.router.navigate(['/tabs/tailor/'+path]);
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




}
