import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyModel} from '../models/company.model';
import {MatTableDataSource} from '@angular/material/table';
import {LedgerModel} from '../models/ledger.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig, MatSort} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AccountsConstants} from '../shared/accounts.constants';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {LedgerService} from '../shared/ledger.service';
import {CompanyComponent} from '../master/company/company.component';
import {LedgerComponent} from '../master/ledger/ledger.component';
import { AppComponent } from '../app.component';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-ledger-list',
  templateUrl: './ledger-list.component.html',
  styleUrls: ['./ledger-list.component.less']
})
export class LedgerListComponent implements OnInit {

  ledgers: LedgerModel[];
  dataSource: MatTableDataSource<LedgerModel>;

  displayedColumns: string[] = ['sno', 'name', 'under', 'o_bal', 'cr_dr', 'actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog,
              private service: LedgerService,
              private app: AppComponent,
              private messageService: MessageService,
              private spinnerService: Ng4LoadingSpinnerService,
              private accountsConstants: AccountsConstants,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.app.setAppTitle();
    this.service.getAllLedgers(this.app.currentCompany.id).subscribe(
      (response) => {
        this.ledgers = response;
        this.dataSource = new MatTableDataSource<LedgerModel>(this.ledgers);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  add() {
    const config: MatDialogConfig = new MatDialogConfig();
    config.autoFocus = true;
    const dialogRef = this.dialog.open(LedgerComponent, config);

    dialogRef.afterClosed().subscribe((ledger: LedgerModel) => {
      if (ledger) {
        this.ledgers.push(ledger);
        this.dataSource.data = this.ledgers;
      }
    });
  }

  delete(ledger: LedgerModel) {
    if (ledger.under && ledger.name !== 'Cash') {

    } else {
      this.messageService.showMessage('You cannot delete or modify system generated ledgers!');
    }
  }
}
