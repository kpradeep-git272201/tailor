import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
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
  constructor(private apiService: ApiService, private alerService: AlertService) { }

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
    this.alerService.showSnackbar("Profile updated successfully!", "success");
  }

  uploadImage() {
    // alert('Image upload functionality coming soon!');
    this.alerService.showSnackbar("Image upload functionality coming soon!", "warning");
  }

}
