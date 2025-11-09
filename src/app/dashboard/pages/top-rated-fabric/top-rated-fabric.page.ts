import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/icon/icon.service';
import { WithfabricService } from 'src/app/services/withfabric/withfabric.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-top-rated-fabric',
  templateUrl: './top-rated-fabric.page.html',
  styleUrls: ['./top-rated-fabric.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class TopRatedFabricPage implements OnInit {
  displayedFabrics: any = [];
  showAllFabric = false;
  allFabricsLoaded = false;
  fabricMaster: any = [];
  initialDisplayCount = 6;
  loadMoreCount = 20;


  constructor(  private iconService: IconService,
      private wfService: WithfabricService,) { 
        this.iconService.registerIcons();
      }

  ngOnInit() {
    this.fabricMaster = this.wfService.getFabricMasterData();
    this.updateDisplayedFabrics();
  }


  updateDisplayedFabrics() {
    const currentDisplayCount = this.displayedFabrics.length;
    const nextDisplayCount = currentDisplayCount + (currentDisplayCount === 0 ? this.initialDisplayCount : this.loadMoreCount);
    this.displayedFabrics = this.fabricMaster.slice(0, nextDisplayCount);
    this.allFabricsLoaded = this.displayedFabrics.length >= this.fabricMaster.length;
  }

  loadMoreFabrics() {
    this.updateDisplayedFabrics();
  }
}
