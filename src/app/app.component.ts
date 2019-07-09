import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { MatDialog, MatDialogConfig} from '@angular/material';
import { CompanyComponent } from './master/company/company.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(
      private router: Router,
      private auth: AuthService,
      private dialog: MatDialog
      ){}

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  navigateTo(module: string){
    this.router.navigate([module]);
  }

  onCreate() {
    const config: MatDialogConfig = new MatDialogConfig();
    //config.disableClose = true;
    config.autoFocus = true;
    config.width = '900px';
    this.dialog.open(CompanyComponent, config);
  }
}
