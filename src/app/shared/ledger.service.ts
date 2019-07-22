import {Injectable} from '@angular/core';
import {CompanyModel} from '../models/company.model';
import {HttpClient} from '@angular/common/http';
import {timeout} from 'rxjs/operators';
import { GroupModel } from '../models/group.model';
import {LedgerModel} from "../models/ledger.model";

@Injectable({
  providedIn: 'root'
})
export class LedgerService {

  private ledgerURL = '/ac/api/ledgers';
  private groupURL = '/ac/api/groups';

  constructor(private http: HttpClient) {
  }

  getAllGroups(company: CompanyModel) {
    return this.http.post<GroupModel[]>(this.groupURL, company).pipe(timeout(5000));
  }

  getAllLedgers(company: CompanyModel) {
    return this.http.post<LedgerModel[]>(this.ledgerURL, company).pipe(timeout(5000));
  }

  create(ledger: LedgerModel) {
    return this.http.put<LedgerModel>(this.ledgerURL, ledger).pipe(timeout(2000));
  }
}
