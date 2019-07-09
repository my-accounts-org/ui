import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSort} from '@angular/material';
import { CompanyComponent } from '../master/company/company.component';
import { CompanyModel } from '../models/company.model';
import { CompanyService } from '../shared/company.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.less']
})
export class CompanyListComponent implements OnInit {

  companies: CompanyModel[];
  dataSource: MatTableDataSource<CompanyModel>;

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  displayedColumns: string[] = ['name', 'address', 'FY', 'BY', 'actions'];

  constructor(
      private dialog: MatDialog,
      private service: CompanyService,
      ) { }

  ngOnInit() {
    this.service.getAllCompanies().subscribe(
      (response) => {
        this.companies = response;
        this.dataSource = new MatTableDataSource<CompanyModel>(this.companies);
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log(error.message);
      }
    );
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
  }n

  delete(element: CompanyModel) {

     this.service.delete(element).subscribe(
       (result) => {
        this.companies = this.companies.filter((value, index, arr) => {
          return value.id !== element.id;
        });
        this.dataSource.data = this.companies;

       }
     );
  }

}
