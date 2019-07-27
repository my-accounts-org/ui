import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { GroupModel } from '../models/group.model';
import { CompanyModel } from '../models/company.model';
import { BooleanValue } from '../models/returntypes';
import { ServiceHelper } from '../models/service.helper';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends ServiceHelper {

  private groupURL = '/ac/api/groups';

  constructor(private http: HttpClient) {
    super();
  }

  getAllGroups(companyId: number) {
    const headers = this.getHeaders();
    return this.http.get<GroupModel[]>(this.groupURL + '/' + companyId, {headers}).pipe(timeout(5000));
  }

  create(group: GroupModel) {
    const headers = this.getHeaders();
    return this.http.put<GroupModel>(this.groupURL, group, {headers}).pipe(timeout(2000));
  }

  delete(group: GroupModel) {
    const headers = this.getHeaders();
    return this.http.delete<BooleanValue>(this.groupURL + '/' + group.config + '/' + group.id, {headers});
  }
}
