import {Component, OnInit} from '@angular/core';
import {LoginModel} from '../../models/login.model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '.././../shared/auth.service';
import {AppComponent} from 'src/app/app.component';
import {Router} from '@angular/router';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  user: LoginModel = new LoginModel();
  loginForm: FormGroup;
  hide = true;
  error: string;
  logging = false;

  constructor(private fb: FormBuilder,
              private service: AuthService,
              private app: AppComponent,
              private router: Router,
              private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }

  onLogin() {
    this.logging = true;
    this.spinnerService.show();
    this.service.login(this.user)
      .subscribe(
        (data: any) => {
          if (data) {
            localStorage.setItem('user', JSON.stringify(data));
            this.router.navigate(['dashboard']);
          } else {
            this.error = 'Invalid login/password. Please try again!';
          }
          this.logging = false;
        },
        (error) => {
          if (error.status === 504) {
            this.error = error.statusText + ': Server is down! Please try later';
          }
          this.logging = false;
        },
        () => this.spinnerService.hide()
      );
  }
}
