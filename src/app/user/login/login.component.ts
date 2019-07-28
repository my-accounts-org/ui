import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '.././../shared/auth.service';
import {AppComponent} from 'src/app/app.component';
import {Router} from '@angular/router';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {MessageService} from '../../shared/message.service';
import { UserModel } from 'src/app/models/user.model';
import { AuthorizedUserModel } from 'src/app/models/authorizeduser.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  loginForm: FormGroup;
  hide = true;
  error: string;

  constructor(private fb: FormBuilder,
              private service: AuthService,
              private app: AppComponent,
              private router: Router,
              private messageService: MessageService,
              private spinnerService: Ng4LoadingSpinnerService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }

  onLogin() {
    this.spinnerService.show();
    this.service.login(this.user).subscribe(
      (authUser: AuthorizedUserModel) => {
        localStorage.setItem('token', authUser.token);
        localStorage.setItem('company', JSON.stringify(authUser.user.company));
        this.messageService.showMessage('Loggin Successfull');
        this.spinnerService.hide();
        this.router.navigate(['dashboard']);
      },
      (error) => {
        this.spinnerService.hide();
        if (error.status) {
            switch (error.status) {
              case 401: this.messageService.showMessage(error.error.errorMessage, 'EC:' + error.status); break;
              case 404: this.messageService.showMessage(error.statusText, ''); break;
              case 504: this.messageService.showMessage(error.statusText + ' Server is down!', '');
            }
          } else {
            this.messageService.showMessage(error, '');
          }
      },
      () => {this.spinnerService.hide(); }
    );
  }
}
