import { ReplaySubject, Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import {AuthService as Ng2UiAuthService} from 'ng2-ui-auth';

import { User } from './user.model';

@Injectable()
export class AuthService {

  private _loggedInUser: ReplaySubject<User> = new ReplaySubject(null);

  constructor(private http: Http, private ng2AuthService: Ng2UiAuthService) {
    this.http
      .get('/api/v0/user_session')
      .map(responseUser => responseUser.json())
      .subscribe(user => this._loggedInUser.next(user), () => this._loggedInUser.next(null));
  }

  get getSessionUser(): Observable<User> {
    return this._loggedInUser.asObservable();
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
      .subscribe(() => this._loggedInUser.next(null));
  }

}
