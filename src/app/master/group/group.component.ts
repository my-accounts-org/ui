import { Component, OnInit } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from 'src/app/shared/group.service';
import { CompanyModel } from 'src/app/models/company.model';
import { MessageService } from 'src/app/shared/message.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CompanyComponent } from '../company/company.component';
import { group } from '@angular/animations';


export interface GroupNature {
    id: number;
    name: string;
}

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.less']
})
export class GroupComponent implements OnInit {

  group: GroupModel = new GroupModel();
  groups: GroupModel[];
  company: CompanyModel;
  groupForm: FormGroup;
  groupNature: GroupNature[] = [
      {id: 1, name: 'Asset'},
      {id: 2, name: 'Expense'},
      {id: 3, name: 'Income'},
      {id: 4, name: 'Liability'}];

  constructor(
    private fb: FormBuilder,
    private service: GroupService,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<CompanyComponent>
  ) {
    this.group.under = -1;
  }

  ngOnInit() {
    this.company = JSON.parse(localStorage.getItem('company'));
    if (this.company.id === 0) {
      this.messageService.showMessage('Default company not set! Please set it in company master');
      return;
    }
    this.service.getAllGroups(this.company).subscribe(
      response => {
        this.groups = response;
        this.groups.sort((a, b) => a.name > b.name ? 1 : -1 );
      }
    );
    this.groupForm = this.fb.group({
      name: [this.group.name, {validators: [Validators.required]}],
      under: [this.group.under],
      nature: [this.group.nature],
      grossAffected: [this.group.grossAffected]
    });
  }

  onCreate() {
    this.group.config = this.company.id;
    this.service.create(this.group).subscribe(
      response => {
        this.dialogRef.close(response);
        this.messageService.showMessage('Group ' + response.name + ' created successfully');
      }
    );
  }
}
