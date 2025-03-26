import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  mailOutline,
  appsOutline,
  homeOutline,
  personCircleOutline,
  albumsOutline,
  logOutOutline,
  schoolOutline,
  createOutline,
  paperPlaneOutline,
  paperPlaneSharp,
  heartOutline,
  heartSharp,
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  bookmarkOutline,
  bookmarkSharp,
  bookOutline,
  cardOutline,
  cutOutline,
  personOutline,
  menuOutline,
  shirtOutline,
  cartOutline
} from 'ionicons/icons';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor() {
    this.registerIcons();
  }

  private registerIcons() {
    addIcons({
      cartOutline,
      mailOutline,
      appsOutline,
      homeOutline,
      personCircleOutline,
      albumsOutline,
      logOutOutline,
      schoolOutline,
      createOutline,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      heartSharp,
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      bookmarkOutline,
      bookmarkSharp,
      bookOutline,
      cardOutline,
      cutOutline,
      personOutline,
      menuOutline,
      shirtOutline,
    });
  }
}
