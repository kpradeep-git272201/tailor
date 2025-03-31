import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';
import { TailorService } from 'src/app/services/tailor.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChartModelPage } from 'src/app/model/chart-model/chart-model.page';

@Component({
  selector: 'app-tailor',
  templateUrl: './tailor.page.html',
  styleUrls: ['./tailor.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class TailorPage implements OnInit {
  allTailors: any[] = [];
  displayedTailors: any[] = [];
  initialDisplayCount = 5;
  loadMoreCount = 10;

  constructor(
    private tailorService: TailorService,
    private iconService: IconService,
    private router: Router,
    private modalController: ModalController,
  ) {}

  ngOnInit() {
    this.allTailors = this.tailorService.getTopRatedTailor();
    this.displayedTailors = this.allTailors.slice(0, this.initialDisplayCount);
  }

  loadMore() {
    const currentCount = this.displayedTailors.length;
    const newCount = currentCount + this.loadMoreCount;
    this.displayedTailors = this.allTailors.slice(0, newCount);
  }

  get showLoadMoreButton(): boolean {
    return this.displayedTailors.length < this.allTailors.length;
  }

  viewTailor(tailor: any) {
    console.log(JSON.stringify(tailor));
    this.router.navigate(['/tabs/tailor', tailor.tailorId], {
      queryParams: { tailor: JSON.stringify(tailor) },
    });
  }

  async openSortOptions(title:any) {
    const modal = await this.modalController.create({
      component: ChartModelPage,
      cssClass: 'bottom-modal', // Apply custom styles (optional)
      breakpoints: [0, 0.5, 1], // Allows collapse effect
      initialBreakpoint: 0.7, // Opens at half screen
      handle: true,
      componentProps: { title: title }
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirmed' && data) {
      console.log('Data received from modal:', data);
      // this.handleModalData(data);
    }
  }

  async openFilterOptions(title:any) {
    const modal = await this.modalController.create({
      component: ChartModelPage,
      cssClass: 'bottom-modal',
      breakpoints: [0, 0.5, 1],
      initialBreakpoint: 0.7,
      handle: true,
      componentProps: { title: title }
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirmed' && data) {
      console.log('Data received from modal:', data);
    }
  }

  openPriceOptions(title:any) {
    this.genericModal(title);
  }
  openRatingOptions(title:any) {
    this.genericModal(title);
  }
  openGenderOptions(title:any) {
    this.genericModal(title);
  }
  async genericModal(title:any) {
    const modal = await this.modalController.create({
      component: ChartModelPage,
      cssClass: 'bottom-modal',
      breakpoints: [0, 0.5, 1], 
      initialBreakpoint: 0.7, 
      handle: true, 
      componentProps: { title: title }
    });

    await modal.present();
    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirmed' && data) {
      console.log('Data received from modal:', data);
      this.handleModalData(data);
    }
  }
  handleModalData(data: any) {
    console.log('Processing received data:', data);
  }
}
