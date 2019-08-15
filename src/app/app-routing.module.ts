import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './user/login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CompanyListComponent} from './company-list/company-list.component';
import { GroupListComponent } from './group-list/group-list.component';
import {LedgerListComponent} from './ledger-list/ledger-list.component';
import {StockGroupListComponent} from './stock-group-list/stock-group-list.component'
import { StockItemListComponent } from './stock-item-list/stock-item-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'company-list', component: CompanyListComponent, canActivate: [AuthGuard]},
  {path: 'group-list', component: GroupListComponent, canActivate: [AuthGuard]},
  {path: 'ledger-list', component: LedgerListComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'stock-group-list', component: StockGroupListComponent, canActivate: [AuthGuard]},
  {path: 'stock-item-list', component: StockItemListComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
