import { Injectable } from '@angular/core';
import { ServiceHelper } from '../models/service.helper';
import { HttpClient } from '@angular/common/http';
import { UnitModel } from '../models/unit.model';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnitService extends ServiceHelper{

  private serviceURL = '/ac/api/units';

  constructor(private http: HttpClient) {
    super();
  }

  getAllUnits(companyId: number) {
    const headers = this.getHeaders();
    return this.http.get<UnitModel[]>(this.serviceURL + '/' + companyId, {headers}).pipe(timeout(10000));
  }

}
