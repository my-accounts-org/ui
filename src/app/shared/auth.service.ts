import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {timeout} from 'rxjs/operators';
import { AuthorizedUserModel } from '../models/authorizeduser.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL = '/ac/api/login';

  constructor(private http: HttpClient) {
  }

  login(user: UserModel) {
    return this.http.post<AuthorizedUserModel>(this.loginURL, user).pipe(timeout(3000));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

}
