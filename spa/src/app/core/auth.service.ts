import { filter } from 'rxjs/operator/filter';
import { Router } from '@angular/router';
import { ReplaySubject, Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import {AuthService as Ng2UiAuthService} from 'ng2-ui-auth';

import { User } from './user.model';

@Injectable()
export class AuthService {

  private _loggedInUser: ReplaySubject<User> = new ReplaySubject(null);

  constructor(private http: Http, private ng2AuthService: Ng2UiAuthService, private router: Router) {
    this.http
      .get('/api/v0/user_session')
      .map(responseUser => responseUser.json())
      .subscribe(user => this._loggedInUser.next(user), () => this._loggedInUser.next(null));
  }

  get sessionUser(): Observable<User> {
    return this._loggedInUser.asObservable();
  }

  sessionUserHasPermission(permissionString): Observable<boolean> {
    return this._loggedInUser
      .asObservable()
      .map(user => {
        if (!user || !Array.isArray(user.permissions)) {
          return false;
        }
        const found = user.permissions
          .find(permission => permission === 'admin' || permission === permissionString);
        return Boolean(found);
      });
  }

  login(): void {
    this.ng2AuthService
      .authenticate('google')
      .map(responseUser => responseUser.json())
      .subscribe(user => this._loggedInUser.next(user), () => this._loggedInUser.next(null));
  }

  logout(): void {
    this.http
      .post('/api/v0/logout', {})
      .subscribe(() => {
        this.router.navigate(['/']);
        return this._loggedInUser.next(null);
      });
  }

}
