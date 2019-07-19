import {Component, OnInit} from '@angular/core';
import {LoginModel} from '../../models/login.model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '.././../shared/auth.service';
import {AppComponent} from 'src/app/app.component';
import {Router} from '@angular/router';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {MessageService} from "../../shared/message.service";



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
    this.service.login(this.user)
      .subscribe(
        (data: any) => {
          if (data) {
            localStorage.setItem('user', JSON.stringify(data));
            if(data.company){
              this.app.setAppTitle();
              this.app.currentCompany = data.company;
            }
            this.app.setDefaultCompany(this.app.currentCompany);
            this.router.navigate(['dashboard']);
          }
        },
        (error) => {
          this.spinnerService.hide();
          if(error.status){
            switch (error.status) {
              case 401: this.messageService.showMessage(error.error.errorMessage, 'EC:'+error.status); break;
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
