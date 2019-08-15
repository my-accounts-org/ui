import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './user/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { CompanyComponent } from './master/company/company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { GroupComponent } from './master/group/group.component';
import { GroupListComponent } from './group-list/group-list.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LedgerListComponent } from './ledger-list/ledger-list.component';
import { LedgerComponent } from './master/ledger/ledger.component';
import { StockGroupListComponent } from './stock-group-list/stock-group-list.component';
import { StockGroupComponent } from './master/stock-group/stock-group.component';
import { StockItemListComponent } from './stock-item-list/stock-item-list.component';
import { StockItemComponent } from './master/stock-item/stock-item.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    CompanyComponent,
    CompanyListComponent,
    GroupComponent,
    GroupListComponent,
    LedgerListComponent,
    LedgerComponent,
    StockGroupListComponent,
    StockGroupComponent,
    StockItemListComponent,
    StockItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [CompanyComponent, GroupComponent, LedgerComponent, StockGroupComponent, StockItemComponent]
})
export class AppModule { }
