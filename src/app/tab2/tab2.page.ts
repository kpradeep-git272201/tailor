import { Component } from '@angular/core';
import { SharedModule } from '../sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [SharedModule],
})
export class Tab2Page {

  constructor() {}

}
