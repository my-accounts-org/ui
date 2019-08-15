import { Component, OnInit } from '@angular/core';
import { StockItemModel } from 'src/app/models/stockitem.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyModel } from 'src/app/models/company.model';
import { StockItemService } from 'src/app/shared/stock-item.service';
import { MessageService } from 'src/app/shared/message.service';
import { MatDialogRef } from '@angular/material';
import { GroupHelper } from 'src/app/utils/group.helper';
import { StockGroupService } from 'src/app/shared/stock-group.service';
import { StockGroupModel } from 'src/app/models/stockgroup.model';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.less']
})
export class StockItemComponent extends GroupHelper implements OnInit {

  stockGroups: StockGroupModel[];
  stockItemForm: FormGroup;
  stockItem: StockItemModel = new StockItemModel();
  company: CompanyModel;

  constructor(
    private fb: FormBuilder,
    private service: StockItemService,
    private stockGroupService: StockGroupService,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<StockItemComponent>
  ) {
    super();
  }

  ngOnInit() {
    this.company = JSON.parse(localStorage.getItem('company'));
    this.stockGroupService.getAllStockGroups(this.company.id).subscribe(
      (response) => {
        this.stockGroups = response;
      }
    );

    this.stockItemForm = this.fb.group({
      name: [this.stockItem.name, {validators: [Validators.required]}],
      under: [this.stockItem.under],
      unit: [this.stockItem.unit],
      openingBalance: [this.stockItem.openingBalance],
      quantity:[this.stockItem.quantity],
      ratePerUnit: [this.stockItem.ratePerUnit]
    });
  }


  onCreate() {

  }

}
