import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  NgbCarousel,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/services/common.service';
import { WithfabricService } from 'src/app/services/withfabric.service';
import { TailorService } from 'src/app/services/tailor.service';
import { IconService } from 'src/app/services/icon.service';
import { TopRatedFabricPage } from "../top-rated-fabric/top-rated-fabric.page";
import { TopRatedTailorPage } from "../top-rated-tailor/top-rated-tailor.page";

@Component({
  selector: 'app-cdashboard',
  templateUrl: './cdashboard.page.html',
  styleUrls: ['./cdashboard.page.scss'],
  standalone: true,
  imports: [SharedModule, TopRatedFabricPage, TopRatedTailorPage],
})
export class CdashboardPage implements OnInit {
  isLoggedIn = false;
  userName = 'Customer';
  userInitial = this.userName.charAt(0).toUpperCase();
  appRole: any;

  /*** Permotional Banner use by carosel */
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel | any;
  permotionalBanner: any = [];
  interval: any;
  searchQuery: any = '';
  searchQueryAuto: string = 'Search for ';
  items: any[] = [
    { name: 'Shirts' },
    { name: 'Jeans' },
    { name: 'T-Shirts' },
    { name: 'Casual Shoes' },
    { name: 'Sports Shoes' },
    { name: 'Kurta Sets' },
    { name: 'Tops' },
    { name: 'Hydrating Serum' },
  ];
  filteredItems: any[] = [];
  autoSearchTexts: string[] = ['Shirts', 'Jeans', 'T-Shirts', 'Casual Shoes'];
  searchIndex: number = 0;
  masterMenu: any[] | any;
  isTyping: boolean = false;
  



  // tailors = [
  //   {
  //     id: 1,
  //     name: 'John Doe',
  //     specialization: 'Bridal Wear',
  //     rating: '4.9',
  //     image: '/assets/tailorImg/tailor1.jpg',
  //     experience: 10,
  //     portfolio: [
  //       'assets/portfolio/portfolio1.png',
  //       'assets/portfolio/portfolio2.png',
  //     ],
  //     services: [
  //       { name: 'Bridal Dress Stitching', price: 150 },
  //       { name: 'Alterations', price: 50 },
  //     ],
  //     reviews: [
  //       { customer: 'Emma Watson', comment: 'Great service!', rating: 5 },
  //       {
  //         customer: 'John Smith',
  //         comment: 'Perfect fit, highly recommended!',
  //         rating: 4.8,
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: 'Emma Smith',
  //     specialization: 'Casual Wear',
  //     rating: '4.7',
  //     image: '/assets/tailorImg/tailor2.png',
  //     experience: 10,
  //     portfolio: [
  //       'assets/portfolio/portfolio1.png',
  //       'assets/portfolio/portfolio2.png',
  //     ],
  //     services: [
  //       { name: 'Bridal Dress Stitching', price: 150 },
  //       { name: 'Alterations', price: 50 },
  //     ],
  //     reviews: [
  //       { customer: 'Emma Watson', comment: 'Great service!', rating: 5 },
  //       {
  //         customer: 'John Smith',
  //         comment: 'Perfect fit, highly recommended!',
  //         rating: 4.8,
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: 'Michael Brown',
  //     specialization: 'Formal Wear',
  //     rating: '4.8',
  //     image: '/assets/tailorImg/tailor1.jpg',
  //     experience: 10,
  //     portfolio: [
  //       'assets/portfolio/portfolio1.png',
  //       'assets/portfolio/portfolio2.png',
  //     ],
  //     services: [
  //       { name: 'Bridal Dress Stitching', price: 150 },
  //       { name: 'Alterations', price: 50 },
  //     ],
  //     reviews: [
  //       { customer: 'Emma Watson', comment: 'Great service!', rating: 5 },
  //       {
  //         customer: 'John Smith',
  //         comment: 'Perfect fit, highly recommended!',
  //         rating: 4.8,
  //       },
  //     ],
  //   },
  // ];

  ourService: any = [];


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private iconService: IconService,
    private wfService: WithfabricService,
    private commonService: CommonService,
  ) {
    this.iconService.registerIcons();

  }

  ngOnInit() {
    this.ourService = this.wfService.getService();

    this.permotionalBanner = this.commonService.getMasterBrand();

    this.startAutoTyping();
  }

  ionViewDidEnter() {
    this.loadUserInfo();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  
  startAutoTyping() {
    if (this.isTyping) return;
    this.interval = setInterval(() => {
      this.typeText('Search for ' + this.autoSearchTexts[this.searchIndex]);
      this.searchIndex = (this.searchIndex + 1) % this.autoSearchTexts.length;
    }, 5000);
  }

  stopAutoTyping() {
    this.isTyping = true;
    clearInterval(this.interval);
  }

  restartAutoTyping() {
    if (!this.searchQuery) {
      this.isTyping = false;
      this.startAutoTyping();
    }
  }

  typeText(text: string) {
    let index = 0;
    this.searchQueryAuto = '';
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        this.searchQueryAuto += text.charAt(index);
        index++;
      } else {
        clearInterval(typingInterval);
        /** this.filterItems({ target: { value: this.searchQueryAuto } }); */
      }
    }, 200);
  }


  filterItems(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredItems = this.masterMenu.filter((item: any) =>
        item.articleName.toLowerCase().includes(searchTerm),
      );
    } else {
      this.filteredItems = this.masterMenu;
    }
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }

  loadUserInfo() {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo: any = JSON.parse(userInfoString);
      this.appRole = userInfo.appRole;
      this.isLoggedIn = true;
    } else {
      this.appRole = '';
      this.isLoggedIn = false;
    }
  }
  openMenu(
    event: any,
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ) {
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
        top: isMobile ? '50px' : '55px', // Adjust for mobile
        left: isMobile ? `${screenWidth - menuWidth - padding}px` : 'auto', // Align to right
        right: isMobile ? 'auto' : `${padding}px`, // Maintain right position for desktop
      },
      data: {
        title: 'My Modal Title',
        id: 123,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed', result);
    });
  }

  navigateTo() {
    this.router.navigate(['/auth']);
  }

  getExpTailors() {
    this.router.navigate(['/tabs/customer/tailors']);
  }

  viewProfile(tailor: any) {
    this.router.navigate(['/tabs/customer/tailor-profile', tailor.id], {
      queryParams: {
        tailor: JSON.stringify(tailor),
      },
    });
  }

  getService(action: any) {
    const path = '/tabs/customer/' + action.subUrl;
    localStorage.setItem('lastVisitedPage', path);
    this.router.navigate([path],{
      queryParams: {
        navigatedData: JSON.stringify({
          serviceType: action.serviceType
        })
      }
    });
  }
}
