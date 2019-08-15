import { Component, OnInit, ViewChild } from '@angular/core';
import { StockItemModel } from '../models/stockitem.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AppComponent } from '../app.component';
import { StockItemService } from '../shared/stock-item.service';
import { MessageService } from '../shared/message.service';
import { StockItemComponent } from '../master/stock-item/stock-item.component';

@Component({
  selector: 'app-stock-item-list',
  templateUrl: './stock-item-list.component.html',
  styleUrls: ['./stock-item-list.component.less']
})
export class StockItemListComponent implements OnInit {

  stockItems: StockItemModel[];
  dataSource: MatTableDataSource<StockItemModel>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['sno', 'name', 'under', 'actions'];

  selection: SelectionModel<StockItemModel>;

  constructor(
    private dialog: MatDialog,
    private app: AppComponent,
    private service: StockItemService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.app.setAppTitle();
    this.service.getAllStockItems(this.app.currentCompany.id).subscribe(
      response => {
        this.stockItems = response;
        this.dataSource = new MatTableDataSource<StockItemModel>(this.stockItems);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.selection = new SelectionModel<StockItemModel>(false);
      }
    );
  }

  selectRow(row: StockItemModel) {
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
    const dialogRef = this.dialog.open(StockItemComponent, config);

    dialogRef.afterClosed().subscribe((group: StockItemModel) => {
      if (group) {
        this.stockItems.push(group);
        this.dataSource.data = this.stockItems;
      }
    });
  }

  delete(stockGroup: StockItemModel) {

  }

}
