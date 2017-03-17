import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { User } from './user.model';

@Injectable()
export class AuthService {

  public loggedInUser: Observable<User> = null;

  constructor(private http: Http) {
    console.log('auth service constructor fired');
    this.http
      // TODO: refactor with post
      .get('/api/v0/user_session')
      // .map(response => response.json());
      .map(response => {
        console.log(response);
        response.json();
        console.log(response.json());
      })
      .subscribe(value => {
        console.log(value);
      });
  }

}
