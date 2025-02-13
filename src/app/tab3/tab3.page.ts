import { Component } from '@angular/core';
import { SharedModule } from '../sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [SharedModule],
})
export class Tab3Page {
  constructor() {}
}
