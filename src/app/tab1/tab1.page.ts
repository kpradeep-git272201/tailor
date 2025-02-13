import { Component } from '@angular/core';
import { SharedModule } from '../sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [SharedModule],
})
export class Tab1Page {
  constructor() {}
}
