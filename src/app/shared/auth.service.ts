import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL = '/ac/api/login';

  constructor(private http: HttpClient) { }

  login(user: LoginModel){
     return this.http.post<LoginModel>(this.loginURL, user).pipe(
       timeout(5000)
     );
  }

  isLoggedIn(): boolean {
    return !!JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.removeItem('user');
  }

}
