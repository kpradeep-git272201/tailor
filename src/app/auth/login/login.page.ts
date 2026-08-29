import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class LoginPage implements OnInit {
  loginForm: any;
  isInvalidUser: string | undefined;

  constructor(private fb: FormBuilder, private router: Router, private commomService: CommonService) {
    this.loginForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit() {
  }

  getVerificationCode() {
    const phone = this.loginForm.get('phoneNumber')?.value;
    if (!phone || phone.length !== 10) {
      console.log('Please enter a valid 10-digit mobile number.');
      return;
    }
    const payload = {
      "mobile": phone
    }
    this.commomService.sendOtp(payload).subscribe(
      (resp: any) => {

        if (resp?.status == 200) {
          this.router.navigate(['/auth/otp-verification'], {
            queryParams: { phone: `${phone}` }
          });
          this.loginForm.controls['phoneNumber'].setValue("");
        } else {
          this.isInvalidUser = 'Incorrect username or password.';
        }
      },
      (error) => {
        this.isInvalidUser = 'Incorrect username or password.';
      },
    );

  }

  skip() {
    localStorage.removeItem("loggedUser");
    this.router.navigate(["/main"]);
  }
}
