import {Injectable} from '@angular/core';
import {CompanyModel} from '../models/company.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {timeout} from 'rxjs/operators';
import {BooleanValue} from '../models/returntypes';
import { ServiceHelper } from '../models/service.helper';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends ServiceHelper{

  private companyURL = '/ac/api/company';


  constructor(private http: HttpClient) {
    super();
  }

  getAllCompanies() {
    const headers = this.getHeaders();
    return this.http.get<CompanyModel[]>(this.companyURL, {headers}).pipe(timeout(5000));
  }

  create(company: CompanyModel) {
    const headers = this.getHeaders();
    return this.http.post<CompanyModel>(this.companyURL, company, {headers}).pipe(
      timeout(60 * 1000)
    );
  }

  delete(company: CompanyModel) {
    const headers = this.getHeaders();
    return this.http.delete<BooleanValue>(this.companyURL + '/' + company.id, {headers});
  }

  update(id: number) {
    throw new Error('Method not implemented.');
  }

  setDefaultCompany(company: CompanyModel) {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Authorization : 'Bearer ' +  localStorage.getItem('token')
    });
    return this.http.post<BooleanValue>(this.companyURL + '/selected', company, {headers}).pipe(timeout(5000));
  }
}
