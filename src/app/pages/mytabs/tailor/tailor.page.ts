import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-tailor',
  templateUrl: './tailor.page.html',
  styleUrls: ['./tailor.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class TailorPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
