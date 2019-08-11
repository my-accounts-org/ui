import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyModel } from '../models/company.model';
import { ServiceHelper } from '../models/service.helper';
import { timeout } from 'rxjs/operators';
import { StockGroupModel } from '../models/stockgroup.model';
import { BooleanValue } from '../models/returntypes';

@Injectable({
  providedIn: 'root'
})
export class StockGroupService extends ServiceHelper{

  private stockGroupURL = '/ac/api/stockgroups';

  constructor(private http: HttpClient) {
    super();
  }

  getAllStockGroups(companyId: number) {
    const headers = this.getHeaders();
    return this.http.get<StockGroupModel[]>(this.stockGroupURL + '/' + companyId, {headers}).pipe(timeout(10* this.seconds));
  }

  create(stockgroup: StockGroupModel) {
    const headers = this.getHeaders();
    return this.http.put<StockGroupModel>(this.stockGroupURL, stockgroup, {headers}).pipe(timeout(10 * this.seconds));
  }

  delete(group: StockGroupModel) {
    const headers = this.getHeaders();
    return this.http.delete<BooleanValue>(this.stockGroupURL + '/' + group.config + '/' + group.id, {headers}).pipe(timeout(10 * this.seconds));
  }
}
