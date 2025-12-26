import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-stiching-price',
  templateUrl: './stiching-price.page.html',
  styleUrls: ['./stiching-price.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class StichingPricePage implements OnInit {
  @Input() stichingPrice:any;
  constructor() { }

  ngOnInit() {
  }

}
