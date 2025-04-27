import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IconService } from 'src/app/services/icon.service';
import { CommonService } from 'src/app/services/common.service';
import { TopRatedFabricPage } from "../top-rated-fabric/top-rated-fabric.page";
import { TopRatedTailorPage } from "../top-rated-tailor/top-rated-tailor.page";
import { FooterPage } from "../../../footer/footer.page";

@Component({
  selector: 'app-default-dashborad',
  templateUrl: './default-dashborad.page.html',
  styleUrls: ['./default-dashborad.page.scss'],
  standalone: true,
  imports: [SharedModule, TopRatedFabricPage, TopRatedTailorPage]
})
export class DefaultDashboradPage implements OnInit {

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
  ourService: any = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private iconService: IconService,
    private commonService: CommonService,
  ) {
    this.iconService.registerIcons();

  }

  ngOnInit() {
    this.ourService = this.commonService.getService();

    this.permotionalBanner = this.commonService.getMasterBrand();

    this.startAutoTyping();
  }

  ionViewDidEnter() {
    this.loadLoggedUser();
  }
  ngAfterViewInit(){
    this.commonService.setCurrentPath();
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

  loadLoggedUser() {
    const loggedUserString = localStorage.getItem('loggedUser');
    if (loggedUserString) {
      const loggedUser: any = JSON.parse(loggedUserString);
      this.appRole = loggedUser.appRole;
      this.isLoggedIn = true;
    } else {
      this.appRole = '';
      this.isLoggedIn = false;
    }
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
    const path = '/main/' + action.subUrl;
    this.router.navigate([path],{
      queryParams: {
        navigatedData: JSON.stringify({
          serviceType: action.serviceType
        })
      }
    });
  }
}
