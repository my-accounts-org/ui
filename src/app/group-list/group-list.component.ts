import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupModel } from '../models/group.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { GroupService } from '../shared/group.service';
import { SelectionModel } from '@angular/cdk/collections';
import { CompanyModel } from '../models/company.model';
import { GroupComponent } from '../master/group/group.component';

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

  displayedColumns: string[] = ['select', 'name', 'under', 'actions'];

  selection: SelectionModel<GroupModel>;

  defaultCompany: CompanyModel;

  constructor(
    private dialog: MatDialog,
    private service: GroupService
  ) { }

  ngOnInit() {
    this.defaultCompany = JSON.parse(localStorage.getItem('company'));
    this.service.getAllGroups(this.defaultCompany).subscribe(
      (response) => {
        this.groups = response;
        this.dataSource = new MatTableDataSource<GroupModel>(this.groups);
        this.dataSource.paginator = this.paginator;
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
    config.width = '700px';
    const dialogRef = this.dialog.open(GroupComponent, config);

    dialogRef.afterClosed().subscribe((group: GroupModel) => {
      if (group) {
        this.groups.push(group);
        this.dataSource.data = this.groups;
      }
    });
  }

}
