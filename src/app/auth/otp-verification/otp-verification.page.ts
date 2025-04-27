import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/sharedmodule/sharedmodule.module';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.page.html',
  styleUrls: ['./otp-verification.page.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class OtpVerificationPage implements OnInit {
  @ViewChildren('otp0, otp1, otp2, otp3') otpInputs!: QueryList<ElementRef>;
  otp: string[] = ['', '', '', ''];
  timer: number = 120; // 2 minutes in seconds
  timerDisplay: string = '02:00';
  resendAvailable: boolean = false;

  private countdownInterval: any;
  phoneNumber: any;
  countryCode: any;
  selectedRole: any;
  user_table: any = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.phoneNumber = params['phone'] || '';
      this.selectedRole = params['selectedRole'] || '';
    });
    this.startCountdown();
  }
  startCountdown() {
    this.resendAvailable = false;
    this.timer = 120; // Reset timer to 2 minutes
    this.countdownInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        this.updateTimerDisplay();
      } else {
        this.stopCountdown();
        this.resendAvailable = true; // Enable "Resend OTP" option
      }
    }, 1000);
  }
  stopCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timer / 60);
    const seconds = this.timer % 60;
    this.timerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  resendOtp() {
    this.otp = [];
    // resend otp logic here on  server side
    this.startCountdown();
  }

  isOtpComplete(): boolean {
    return this.otp.every((digit) => digit !== '');
  }

  verifyOtp() {
    const enteredOtp = this.otp.join('');
    console.log('Entered OTP:', enteredOtp);
    const loggedUser = {
      appRole: 'defaultRole',
      phoneNumber: this.phoneNumber,
      path: '',
    };
    let url = '/auth';
    if (this.phoneNumber == '9999999999') {
      // This is for Customer login mobile number
      url = '/main';
      loggedUser.appRole = 'Customer';
      loggedUser.path = url;
    } else if (this.phoneNumber == '8888888888') {
      // This is for Tailor login mobile number
      url = '/main';
      loggedUser.appRole = 'Tailor';
      loggedUser.path = url;
    }

    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    this.insertUser(loggedUser);
    const redirectUrl = localStorage.getItem('redirectUrl');
    if (redirectUrl) {
      const navigatedData = localStorage.getItem('navigatedData');
      if (navigatedData) {
        this.router.navigate([decodeURIComponent(redirectUrl)], {
          queryParams: {
            navigatedData: navigatedData,
          },
        });
        localStorage.removeItem('redirectUrl');
        localStorage.removeItem('navigatedData');
      } else {
        this.router.navigate([decodeURIComponent(redirectUrl)]);
      }
    } else {
      this.router.navigate([url]);
    }

    this.otp = [];
  }

  moveToNext(event: any, index: number) {
    const input = event.target;
    if (input.value.length === 1 && index < this.otp.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  handleBackspace(event: any, index: number) {
    if (event.key === 'Backspace' && index > 0 && !this.otp[index]) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  insertUser(user: any) {
    const user_table: any = localStorage.getItem('user_table');
    if (user_table) {
      const users: any = JSON.parse(user_table);
      const isExistUser = users.find((num: any) => {
        num === '9792869123';
      });
      if (!isExistUser) {
        users.push(user);
        localStorage.setItem('user_table', JSON.stringify(users));
      }
    } else {
      this.user_table.push(user);
      localStorage.setItem('user_table', JSON.stringify(this.user_table));
    }
  }
}
