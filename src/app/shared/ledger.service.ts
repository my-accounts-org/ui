import {Injectable} from '@angular/core';
import {CompanyModel} from '../models/company.model';
import {HttpClient} from '@angular/common/http';
import {timeout} from 'rxjs/operators';
import { GroupModel } from '../models/group.model';
import {LedgerModel} from '../models/ledger.model';
import { ServiceHelper } from '../models/service.helper';
import { BooleanValue } from '../models/returntypes';

@Injectable({
  providedIn: 'root'
})
export class LedgerService extends ServiceHelper {

  private ledgerURL = '/ac/api/ledgers';
  private groupURL = '/ac/api/groups';

  constructor(private http: HttpClient) {
    super();
  }

  getAllLedgers(companyId: number) {
    const headers = this.getHeaders();
    return this.http.get<LedgerModel[]>(this.ledgerURL + '/' + companyId, {headers} ).pipe(timeout(5000));
  }

  create(ledger: LedgerModel) {
    const headers = this.getHeaders();
    return this.http.put<LedgerModel>(this.ledgerURL, ledger, {headers}).pipe(timeout(2000));
  }

  delete(ledger: LedgerModel) {
    const headers = this.getHeaders();
    return this.http.delete<BooleanValue>(this.ledgerURL + '/' + ledger.config + '/' + ledger.id, {headers}).pipe(timeout(2000));
  }
}
