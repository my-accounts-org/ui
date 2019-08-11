import { Component, OnInit, ViewChild } from '@angular/core';
import { StockGroupModel } from '../models/stockgroup.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AppComponent } from '../app.component';
import { MessageService } from '../shared/message.service';
import { StockGroupService } from '../shared/stock-group.service';
import { StockGroupComponent } from '../master/stock-group/stock-group.component';
import { GroupComponent } from '../master/group/group.component';


@Component({
  selector: 'app-stock-group-list',
  templateUrl: './stock-group-list.component.html',
  styleUrls: ['./stock-group-list.component.less']
})
export class StockGroupListComponent implements OnInit {

  stockGroups: StockGroupModel[];
  dataSource: MatTableDataSource<StockGroupModel>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['sno', 'name', 'under', 'actions'];

  selection: SelectionModel<StockGroupModel>;

  constructor(
    private dialog: MatDialog,
    private app: AppComponent,
    private service: StockGroupService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.app.setAppTitle();
    this.service.getAllStockGroups(this.app.currentCompany.id).subscribe(
      (response) => {
        this.stockGroups = response;
        this.dataSource = new MatTableDataSource<StockGroupModel>(this.stockGroups);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.selection = new SelectionModel<StockGroupModel>(false);
      }
    );
  }

  selectRow(row: StockGroupModel) {
    if (!this.selection.isSelected(row)) {
      this.selection.select(row);
    } else {
      this.selection.clear();
    }
  }

  add() {
    const config: MatDialogConfig = new MatDialogConfig();
    config.autoFocus = true;
    config.width = '350px';
    const dialogRef = this.dialog.open(StockGroupComponent, config);

    dialogRef.afterClosed().subscribe((group: StockGroupModel) => {
      if (group) {
        this.stockGroups.push(group);
        this.dataSource.data = this.stockGroups;
      }
    });
  }

  delete(stockGroup: StockGroupModel) {
    stockGroup.config = this.app.currentCompany.id;
    this.service.delete(stockGroup).subscribe(
    data => {
      if(data) {
        this.stockGroups = this.stockGroups.filter((value, index, arr) => {
          return value.id !== stockGroup.id;
        });
        this.dataSource.data = this.stockGroups;
        this.messageService.showMessage(stockGroup.name + ' deleted successfully!');
      }
    });
  }

}
