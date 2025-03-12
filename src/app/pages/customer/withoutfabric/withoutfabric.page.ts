import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-withoutfabric',
  templateUrl: './withoutfabric.page.html',
  styleUrls: ['./withoutfabric.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class WithoutfabricPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
