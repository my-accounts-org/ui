import {Component, Inject, OnInit} from '@angular/core';
import {CompanyModel} from '../../models/company.model';
import {LedgerModel} from '../../models/ledger.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CompanyComponent} from '../company/company.component';
import {AccountsConstants} from '../../shared/accounts.constants';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {Router} from '@angular/router';
import {CompanyService} from '../../shared/company.service';
import {LedgerService} from '../../shared/ledger.service';
import {GroupModel} from '../../models/group.model';
import {MessageService} from '../../shared/message.service';
import { GroupService } from 'src/app/shared/group.service';
import { AppComponent } from 'src/app/app.component';

export interface Types {
  name: string;
  id: string;
}

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.less']
})
export class LedgerComponent implements OnInit {

  ledger: LedgerModel = new LedgerModel();
  ledgerForm: FormGroup;
  groups: GroupModel[];
  company: CompanyModel;

  constructor(
    private fb: FormBuilder,
    private service: LedgerService,
    private groupService: GroupService,
    private messageService: MessageService,
    public dialogRef: MatDialogRef<CompanyComponent>,
    private spinnerService: Ng4LoadingSpinnerService,
    private accountsConstants: AccountsConstants,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  updateMailingName() {
    if (this.ledger.mailingName === undefined
      || this.ledger.mailingName === '') {
      this.ledger.mailingName = this.ledger.name;
    }
  }

  ngOnInit() {
    this.ledger.name = 'Ledger A/c';
    this.ledger.mailingName = '';
    this.ledger.mailingAddress = 'Bangalore';

    this.company = JSON.parse(localStorage.getItem('company'));
    this.groupService.getAllGroups(this.company.id).subscribe(
      response => {
        this.groups = response;
        this.groups.sort((a, b) => a.name > b.name ? 1 : -1);
      }
    );
    this.ledgerForm = this.fb.group({
      name: [this.ledger.name, {validators: [Validators.required]}],
      mailingName : [this.ledger.mailingName],
      mailingAddress : [this.ledger.mailingAddress],
      openingBalance : [this.ledger.openingBalance],
      under: [this.ledger.under, Validators.required],
      crDr: [this.ledger.crDr]
    });
  }

  onCreate() {
    this.ledger.config = this.company.id;
    this.spinnerService.show();
    this.service.create(this.ledger).subscribe(
      (ledger: LedgerModel) => {
        if (ledger.id > 0) {
          this.dialogRef.close(ledger);
          this.messageService.showMessage(this.accountsConstants.LEDGER_CREATED, this.accountsConstants.SUCCESS_MESSAGE);
        } else {
          this.messageService.showMessage(this.accountsConstants.LEDGER_CREATED, this.accountsConstants.FAILUR_MESSAGE);
        }
      },
      (error) => {
        this.messageService.showMessage(this.accountsConstants.LEDGER_CREATED, this.accountsConstants.FAILUR_MESSAGE);
      },
      () => this.spinnerService.hide()
    );
  }
}
