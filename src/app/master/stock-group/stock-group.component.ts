import { Component, OnInit, Inject } from '@angular/core';
import { StockGroupModel } from 'src/app/models/stockgroup.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyModel } from 'src/app/models/company.model';
import { StockGroupService } from 'src/app/shared/stock-group.service';
import { AppComponent } from 'src/app/app.component';
import { GroupHelper } from 'src/app/utils/group.helper';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-stock-group',
  templateUrl: './stock-group.component.html',
  styleUrls: ['./stock-group.component.less']
})
export class StockGroupComponent extends GroupHelper implements OnInit {

  stockGroups: StockGroupModel[];
  stockGroupForm: FormGroup;
  stockGroup: StockGroupModel = new StockGroupModel();
  company: CompanyModel;

  constructor(
    private fb: FormBuilder,
    private service: StockGroupService,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<StockGroupComponent>) {
    super();
    this.stockGroup.under = 0;
  }

  ngOnInit() {
    this.company = JSON.parse(localStorage.getItem('company'));
    this.service.getAllStockGroups(this.company.id).subscribe(
      (response) => {
        this.stockGroups = response;
      }
    );

    this.stockGroupForm = this.fb.group({
      name: [this.stockGroup.name, {validators: [Validators.required]}],
      under: [this.stockGroup.under],
      addQuantityItems: [this.stockGroup.addQuantityItems]
    });
  }

  onCreate() {
    this.stockGroup.config = this.company.id;
    this.service.create(this.stockGroup).subscribe(
      response => {
        this.dialogRef.close(response);
        this.messageService.showMessage('Group ' + response.name + ' created successfully');
      }
    );
  }

}
