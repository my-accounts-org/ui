import { Component, OnInit, ViewChild } from '@angular/core';
import { UnitModel } from '../models/unit.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AppComponent } from '../app.component';
import { MessageService } from '../shared/message.service';
import { UnitService } from '../shared/unit.service';
import { UnitComponent } from '../master/unit/unit.component';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.less']
})
export class UnitListComponent implements OnInit {

  units: UnitModel[];
  dataSource: MatTableDataSource<UnitModel>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['sno', 'type', 'symbol', 'actions'];

  selection: SelectionModel<UnitModel>;



  constructor(
    private dialog: MatDialog,
    private app: AppComponent,
    private service: UnitService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.app.setAppTitle();
    this.service.getAllUnits(this.app.currentCompany.id).subscribe(
      response => {
        this.units = response;
        this.dataSource = new MatTableDataSource<UnitModel>(this.units);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.selection = new SelectionModel<UnitModel>(false);
      }
    );
  }

  selectRow(row: UnitModel) {
    if (!this.selection.isSelected(row)) {
      this.selection.select(row);
    } else {
      this.selection.clear();
    }
  }

  add() {
    const config: MatDialogConfig = new MatDialogConfig();
    config.autoFocus = true;
    config.minWidth = '350px';
    const dialogRef = this.dialog.open(UnitComponent, config);

    dialogRef.afterClosed().subscribe((unit: UnitModel) => {
      if (unit) {
        this.units.push(unit);
        this.dataSource.data = this.units;
      }
    });
  }

  delete(unit: UnitModel) {

  }

}
