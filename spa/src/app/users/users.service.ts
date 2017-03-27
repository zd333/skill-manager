import { User } from './user.model';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class UsersService {
  constructor(private http: Http) { }

  findUsers(streams?: Array<string>, skills?: Array<string>, includeInactive: boolean = false): Observable<Array<User>> {
    const paramGroups = [];
    if (streams && streams.length) {
      paramGroups.push(`streams=${streams.join()}`);
    }
    if (skills && skills.length) {
      paramGroups.push(`skills=${skills.join()}`);
    }
    if (includeInactive) {
      paramGroups.push('include_inactive');
    }

    const options = new RequestOptions({
      search: new URLSearchParams(paramGroups.join('&'))
    });
    return this.http
      .get('/api/v0/users', options)
      .map(responseUsers => responseUsers.json() as Array<User>);
  }

  getUsersList(): Observable<Array<User>> {
    return this.http
      .options('/api/v0/users')
      .map(responseUsers => responseUsers.json() as Array<User>);
  }

  setUserActivity(userId: string, isActive: boolean): Observable<any> {
    return this.http
      .post(`/api/v0/users/${userId}/is_active`, { isActive});
  }
}
