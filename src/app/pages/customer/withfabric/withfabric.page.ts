import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-withfabric',
  templateUrl: './withfabric.page.html',
  styleUrls: ['./withfabric.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class WithfabricPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
