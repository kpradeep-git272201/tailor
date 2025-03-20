import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TostService } from 'src/app/services/tost.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-profile-mngt',
  templateUrl: './profile-mngt.page.html',
  styleUrls: ['./profile-mngt.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ProfileMngtPage implements OnInit {
  profile: any = {};
  constructor(private apiService: ApiService, private tostService: TostService) { }

  ngOnInit() {
    this.loadProfile();
  }
  loadProfile() {
    const data = this.apiService.getProfile();
    this.profile = data;
  }
  updateProfile() {
    // this.profileService.updateProfile(this.profile).subscribe(() => {
    //   alert('Profile updated successfully!');
    // });
    this.tostService.presentToast("Profile updated successfully!", "success");
  }

  uploadImage() {
    // alert('Image upload functionality coming soon!');
    this.tostService.presentToast("Image upload functionality coming soon!", "warning");
  }

}
