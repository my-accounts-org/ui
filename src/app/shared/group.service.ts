import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { GroupModel } from '../models/group.model';
import { CompanyModel } from '../models/company.model';
import { BooleanValue } from '../models/returntypes';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupURL = '/ac/api/groups';

  constructor(private http: HttpClient) { }

  getAllGroups(company: CompanyModel) {
    return this.http.post<GroupModel[]>(this.groupURL, company).pipe(timeout(5000));
  }

  create(group: GroupModel) {
    return this.http.put<GroupModel>(this.groupURL, group).pipe(timeout(2000));
  }

  delete(group: GroupModel) {
    return this.http.delete<BooleanValue>(this.groupURL + '/' + group.config + '/' + group.id);
  }
}
