import {Injectable} from '@angular/core';
import {CompanyModel} from '../models/company.model';
import {HttpClient} from '@angular/common/http';
import {timeout} from 'rxjs/operators';
import {BooleanValue} from '../models/returntypes';
import {LedgerModel} from "../models/ledger.model";

@Injectable({
  providedIn: 'root'
})
export class LedgerService {

  private ledgerURL = '/ac/api/ledgers';

  constructor(private http: HttpClient) {
  }

  getAllLedgers(company: CompanyModel) {
    return this.http.post<LedgerModel[]>(this.ledgerURL, company).pipe(timeout(5000));
  }

}
