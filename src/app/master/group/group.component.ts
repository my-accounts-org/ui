import { Component, OnInit } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from 'src/app/shared/group.service';
import { CompanyModel } from 'src/app/models/company.model';

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
  groupNature: string[] = ['Asset', 'Expenses', 'Income', 'Liability'];

  constructor(
    private fb: FormBuilder,
    private service: GroupService
  ) { }

  ngOnInit() {
    this.company = JSON.parse(localStorage.getItem('company'));
    if(this.company.id === 0) return;
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

  onCreate(){
    this.service.create(this.group).subscribe(
      response => {}
    );
  }
}
