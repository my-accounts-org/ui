import {Injectable} from '@angular/core';
import {CompanyModel} from '../models/company.model';
import {HttpClient} from '@angular/common/http';
import {timeout} from 'rxjs/operators';
import {BooleanValue} from '../models/returntypes';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyURL = '/ac/api/company';

  constructor(private http: HttpClient) {
  }

  getAllCompanies() {
    return this.http.get<CompanyModel[]>(this.companyURL).pipe(timeout(5000));
  }

  create(company: CompanyModel) {
    return this.http.post<CompanyModel>(this.companyURL, company).pipe(
      timeout(60 * 1000)
    );
  }

  delete(company: CompanyModel) {
    return this.http.delete<BooleanValue>(this.companyURL + '/' + company.id);
  }

  update(id: number) {
    throw new Error('Method not implemented.');
  }

  setDefaultCompany(company: CompanyModel) {
    return this.http.post<BooleanValue>(this.companyURL + '/selected', company).pipe(timeout(5000));
  }
}
