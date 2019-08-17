import { Component, OnInit } from '@angular/core';
import { UnitModel } from 'src/app/models/unit.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyModel } from 'src/app/models/company.model';
import { UnitService } from 'src/app/shared/unit.service';
import { MessageService } from 'src/app/shared/message.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.less']
})
export class UnitComponent implements OnInit {

  units: UnitModel[];
  unitForm: FormGroup;
  unit: UnitModel = new UnitModel();
  company: CompanyModel;

  constructor(
    private fb: FormBuilder,
    private service: UnitService,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<UnitComponent>
  ) { }

  ngOnInit() {
    this.company = JSON.parse(localStorage.getItem('company'));

    this.service.getAllUnits(this.company.id).subscribe(
      response => {
        this.units = response;
        this.units = this.units.filter((item, index) => {
          return item.symbol;
        });
      }
    );

    this.unit.type = 0;
    this.unit.name = 'Kilogram';
    this.unit.symbol = 'Kg';
    this.unit.decimalPlaces = 2;

    this.unitForm = this.fb.group({
        name: [this.unit.name],
        type: [this.unit.type],
        symbol: [this.unit.symbol, Validators.required],
        firstUnit: [this.unit.firstUnit],
        secondUnit: [this.unit.secondUnit],
        conversion: [this.unit.conversion],
        decimalPlaces: [this.unit.decimalPlaces]
    });


  }

  onCreate() {
    this.unit.config = this.company.id;
    this.service.create(this.unit).subscribe(
      (unit: UnitModel) => {
          if (unit.id > 0) {
            this.dialogRef.close(unit);
            this.messageService.showMessage('Unit ' + unit.name + ' is created successfully!');
          }
      },
      (error) => {
        this.messageService.showMessage('Unit not created ' + error.error , 'Failed');
      }
    );
  }

}
