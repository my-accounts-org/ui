import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatSort} from '@angular/material';
import {CompanyComponent} from '../master/company/company.component';
import {CompanyModel} from '../models/company.model';
import {CompanyService} from '../shared/company.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {AccountsConstants} from '../shared/accounts.constants';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';
import { MessageService } from '../shared/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.less']
})
export class CompanyListComponent implements OnInit {

  companies: CompanyModel[];
  dataSource: MatTableDataSource<CompanyModel>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['sno', 'select', 'name', 'address', 'FY', 'BY', 'actions'];

  constructor(
    private dialog: MatDialog,
    private service: CompanyService,
    private spinnerService: Ng4LoadingSpinnerService,
    private accountsConstants: AccountsConstants,
    private snackBar: MatSnackBar,
    private app: AppComponent,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  selection: SelectionModel<CompanyModel>;

  ngOnInit() {
    this.app.setAppTitle();
    this.service.getAllCompanies().subscribe(
      (response) => {
        this.companies = response;
        this.dataSource = new MatTableDataSource<CompanyModel>(this.companies);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.data.forEach(row => {
          if (row.isDefault === 1) {
            this.selection = new SelectionModel<CompanyModel>(false, [row]);
          }
        });
      },
      (error) => {
        this.messageService.showMessage(error.error, error.statusText);
      }
    );

    if (!this.selection) {
      this.selection = new SelectionModel<CompanyModel>(false);
    }
  }

  add() {
    const config: MatDialogConfig = new MatDialogConfig();
    config.autoFocus = true;
    config.width = '700px';
    const dialogRef = this.dialog.open(CompanyComponent, config);

    dialogRef.afterClosed().subscribe((company: CompanyModel) => {
      if (company) {
        this.companies.push(company);
        this.dataSource.data = this.companies;
      }
    });
  }

  delete(element: CompanyModel) {
    this.spinnerService.show();
    this.service.delete(element).subscribe(
      (result) => {
        this.companies = this.companies.filter((value, index, arr) => {
          return value.id !== element.id;
        });
        this.dataSource.data = this.companies;
        this.snackBar.open(this.accountsConstants.COMPANY_DELETED, this.accountsConstants.SUCCESS_MESSAGE, {
          duration: 2000,
        });
      },
      (error) => {
        console.log(error.message);
        this.snackBar.open(this.accountsConstants.COMPANY_DELETED, this.accountsConstants.FAILUR_MESSAGE, {
          duration: 2000,
        });
      },
      () => this.spinnerService.hide()
    );
  }


  selectRow(row: CompanyModel) {
    if (!this.selection.isSelected(row)) {
      this.selection.select(row);
      this.setDefaultCompany();
    } else {
      this.selection.clear();
    }

  }

  setDefaultCompany() {
    const numSelected = this.selection.selected.length;
    if (numSelected > 0) {
      this.service.setDefaultCompany(this.selection.selected[0]).subscribe(
        (flag) => {
          localStorage.setItem('company', JSON.stringify(this.selection.selected[0]));
          this.app.setAppTitle();
          this.messageService.showMessage(this.selection.selected[0].name + ' is ' + this.accountsConstants.SET_AS_DEFAULT);
        }
      );
    }
  }

  loadDashboard(data: CompanyModel) {
    localStorage.setItem('company', JSON.stringify(data));
    this.router.navigate(['dashboard']);
  }

}
