import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyModel} from "../models/company.model";
import {MatTableDataSource} from "@angular/material/table";
import {LedgerModel} from "../models/ledger.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog, MatSort} from "@angular/material";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AccountsConstants} from "../shared/accounts.constants";
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {LedgerService} from "../shared/ledger.service";

@Component({
  selector: 'app-ledger-list',
  templateUrl: './ledger-list.component.html',
  styleUrls: ['./ledger-list.component.less']
})
export class LedgerListComponent implements OnInit {

  ledgers: LedgerModel[];
  dataSource: MatTableDataSource<LedgerModel>;

  displayedColumns: string[] = ['name', 'under', 'o_bal'];

  defaultCompany: CompanyModel;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog,
              private service: LedgerService,
              private spinnerService: Ng4LoadingSpinnerService,
              private accountsConstants: AccountsConstants,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.defaultCompany = JSON.parse(localStorage.getItem('company'));
    this.service.getAllLedgers(this.defaultCompany).subscribe(
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
}
