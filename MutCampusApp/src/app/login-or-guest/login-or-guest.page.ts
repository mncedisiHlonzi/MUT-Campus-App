import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login-or-guest',
  templateUrl: './login-or-guest.page.html',
  styleUrls: ['./login-or-guest.page.scss'],
})
export class LoginOrGuestPage implements OnInit {

  email: string = '';
  password: string = '';
  isStudentFormVisible: boolean = true;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  toggleForm() {
    this.isStudentFormVisible = !this.isStudentFormVisible;
  }

  login() {
    this.http.post('http://10.3.0.237:3000/login', { email: this.email, password: this.password }).subscribe(
      (response: any) => {
        console.log('Student login successful');
        localStorage.setItem('token', response.token);
        localStorage.setItem('student', JSON.stringify(response.student));
        
        this.sendOTP(this.email);

        this.navCtrl.navigateForward('/tabs');
        this.dismissModal();
      },
      (error) => {
        console.error('Student login failed', error);
        alert('Login failed: ' + (error.error || 'Unknown error'));
      }
    );
  }

  sendOTP(email: string) {
    this.http.post('http://10.3.0.237:3000/send-otp', { email }).subscribe(
      (response: any) => {
        console.log('OTP sent to email:', email);
      },
      (error) => {
        console.error('Error sending OTP:', error);
        alert('Error sending OTP: ' + (error.error || 'Unknown error'));
      }
    );
  }

  adminLogin() {
    // Assuming a separate endpoint for admin login
    this.http.post('http://10.3.0.237:3000/admin-login', { password: this.password }).subscribe(
      (response: any) => {
        console.log('Admin login successful');
        // Determine where to navigate based on adminId
        switch (response.adminId) {
          case 1:
            this.navCtrl.navigateForward('/src-admin');
            break;
          case 2:
            this.navCtrl.navigateForward('/transport-admnin');
            break;
          case 3:
            this.navCtrl.navigateForward('/sport-admin');
            break;
          default:
            console.error('Unknown adminId:', response.adminId);
            alert('Unknown adminId');
            break;
        }
        this.dismissModal();
      },
      (error) => {
        console.error('Admin login failed', error);
        alert('Admin login failed: ' + (error.error || 'Unknown error'));
      }
    );
  }

  guestLogin() {
    // Assuming a guest account with pre-defined email and password
    const guestCredentials = {
      email: 'guest@mut.ac.za',  // Hardcoded guest email
      password: 'guestpassword'  // Hardcoded guest password
    };
  
    this.http.post('http://10.3.0.237:3000/login', guestCredentials).subscribe(
      (response: any) => {
        console.log('Guest login successful');
        localStorage.setItem('token', response.token);
        localStorage.setItem('student', JSON.stringify(response.student));
        this.navCtrl.navigateForward('/tabs');
      },
      (error) => {
        console.error('Guest login failed', error);
        alert('Guest login failed: ' + (error.error || 'Unknown error'));
      }
    );
  }
  

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }
}
