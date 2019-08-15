import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockItemModel } from '../models/stockitem.model';
import { timeout } from 'rxjs/operators';
import { ServiceHelper } from '../models/service.helper';

@Injectable({
  providedIn: 'root'
})
export class StockItemService  extends ServiceHelper{

  private stockItemURL = '/ac/api/stockitems';

  constructor(private http: HttpClient) {
    super();
  }

  getAllStockItems(companyId: number) {
    const headers = this.getHeaders();
    return this.http.get<StockItemModel[]>(this.stockItemURL + '/' + companyId, {headers}).pipe(timeout(10000));
  }
}
