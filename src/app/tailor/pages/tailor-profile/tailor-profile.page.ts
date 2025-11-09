import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tailor-profile',
  templateUrl: './tailor-profile.page.html',
  styleUrls: ['./tailor-profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TailorProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
