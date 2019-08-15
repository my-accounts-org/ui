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

    this.unitForm = this.fb.group({
        name: [this.unit.name, Validators.required],
        type: [],
        symbol: [],
        firstUnit: [],
        secondUnit: [],
        conversion: [],
        decimalPlaces: []
    });
  }

  onCreate() {

  }

}
