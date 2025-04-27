import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tailor-details',
  templateUrl: './tailor-details.page.html',
  styleUrls: ['./tailor-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TailorDetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
