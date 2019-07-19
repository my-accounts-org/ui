import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './shared/auth.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CompanyComponent} from './master/company/company.component';
import {CompanyModel} from "./models/company.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  defaultCompany: CompanyModel = new CompanyModel();
  currentCompany: CompanyModel;

  constructor(
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog
  ) {
    this.defaultCompany.booksBeginingFrom = '4/1/2019';
    this.defaultCompany.financialYear = '4/1/2019';
    this.defaultCompany.id = 0;
    this.defaultCompany.isDefault = 1;
    this.defaultCompany.name = 'Default Company Account';
    this.currentCompany = this.defaultCompany;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
    this.currentCompany = this.defaultCompany;
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  navigateTo(module: string) {
    this.router.navigate([module]);
  }

  onCreate() {
    const config: MatDialogConfig = new MatDialogConfig();
    config.autoFocus = true;
    config.width = '900px';
    this.dialog.open(CompanyComponent, config);
  }

  setAppTitle() {
    this.currentCompany = JSON.parse(localStorage.getItem('company'));
  }

  setDefaultCompany(company) {
    localStorage.setItem('company', JSON.stringify(company));
  }

}
