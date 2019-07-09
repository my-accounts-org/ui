import { Component, OnInit, Inject } from '@angular/core';
import { CompanyModel } from 'src/app/models/company.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/shared/company.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.less']
})
export class CompanyComponent implements OnInit {

  company: CompanyModel = new CompanyModel();
  companyForm: FormGroup;
  error: string;

  constructor(
      private fb: FormBuilder,
      private service: CompanyService,
      private router: Router,
      public dialogRef: MatDialogRef<CompanyComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.company.name = 'Vivek & Company';
    this.company.mailingName = '';
    this.company.mailingAddress = 'Bangalore';
    this.company.financialYear = '2019-04-01';
    this.company.booksBeginingFrom = '2019-04-01';
    this.company.passwordProtected = false;

    this.companyForm = this.fb.group({
      name: [this.company.name, {validators: [Validators.required], updateOn: 'blur'}],
      mailingName: [this.company.mailingName, Validators.required],
      mailingAddress: [this.company.mailingAddress],
      financialYear: [this.company.financialYear, Validators.required],
      booksBeginingFrom: [this.company.booksBeginingFrom, Validators.required],
      isPasswordProtected: [this.company.passwordProtected],
      password: [this.company.password]
    });
  }

  updateMailingName() {
    if (this.company.mailingName === undefined
              || this.company.mailingName === '') {
      this.company.mailingName = this.company.name;
    }
  }

  onCreate() {
    this.service.create(this.company).subscribe(
      (company: CompanyModel) => {
         if (company.id > 0) {
           console.log('Company created successfully');
           this.dialogRef.close(company);
         } else {
           this.error = 'Error while creating company!';
         }
      },
      (error) => {
        this.error = error.message;
      });
  }

}
