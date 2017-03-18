import { ReplaySubject, Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { User } from './user.model';

@Injectable()
export class AuthService {

  private _loggedInUser: ReplaySubject<User> = new ReplaySubject(null);

  constructor(private http: Http) {
    this.http
      .get('/api/v0/user_session')
      .map(responseUser => responseUser.json())
      .subscribe(user => this._loggedInUser.next(user), () => this._loggedInUser.next(null));
  }

  get getSessionUser(): Observable<User> {
    return this._loggedInUser.asObservable();
  }

  logout(): void {
    this.http
      .post('/api/v0/logout', {})
      .subscribe(() => this._loggedInUser.next(null));
  }

}
