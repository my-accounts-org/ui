import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupModel } from '../models/group.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { GroupService } from '../shared/group.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CompanyModel } from '../models/company.model';
import { GroupComponent } from '../master/group/group.component';
import { MessageService } from '../shared/message.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.less']
})
export class GroupListComponent implements OnInit {

   groups: GroupModel[];
   dataSource: MatTableDataSource<GroupModel>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['sno', 'name', 'under', 'actions'];

  selection: SelectionModel<GroupModel>;

  constructor(
    private dialog: MatDialog,
    private app: AppComponent,
    private service: GroupService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.app.setAppTitle();
    this.service.getAllGroups(this.app.currentCompany.id).subscribe(
      (response) => {
        this.groups = response;
        this.dataSource = new MatTableDataSource<GroupModel>(this.groups);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.selection = new SelectionModel<GroupModel>(false);
      }
    );
  }

  selectRow(row: GroupModel) {
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
    const dialogRef = this.dialog.open(GroupComponent, config);

    dialogRef.afterClosed().subscribe((group: GroupModel) => {
      if (group) {
        this.groups.push(group);
        this.dataSource.data = this.groups;
      }
    });
  }

  delete(group: GroupModel) {
    if (group.default) {
      this.messageService.showMessage('You cannot delete the systen created groups!');
      return;
    }
    this.service.delete(group).subscribe(response => {
      this.groups = this.groups.filter((value, index, arr) => {
        return value.id !== group.id;
      });
      this.dataSource.data = this.groups;
    });
  }

}
