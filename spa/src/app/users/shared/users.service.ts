import { RawSkillMark, BaseSkillMark, SkillMarksGroupedBySkill } from '../../skill-marks/shared/skill-mark.model';
import { AuthService } from '../../core/auth.service';
import { User } from './user.model';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class UsersService {
  constructor(private http: Http, private authService: AuthService) { }

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
      .get('/api/v0/users_with_marks', options)
      .map(responseUsers => responseUsers.json() as Array<User>);
  }

  getUsersList(searchQuery?: string, includeInactive?: boolean): Observable<Array<User>> {
    const paramGroups = [];
    if (searchQuery && searchQuery.length) {
      paramGroups.push(`q=${searchQuery}`);
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

  setUserActivity(userId: string, isActive: boolean): Observable<any> {
    return this.http
      .post(`/api/v0/users/${userId}/is_active`, { isActive });
  }

  getUserDetails(id: string): Observable<User> {
    return this.http
      .get(`/api/v0/users/${id}`)
      .map(responseUser => responseUser.json() as User);
  }

  getMyProfileData(): Observable<User> {
    return this.authService.sessionUser
      .flatMap(user => user ? this.getUserDetails(user._id) : Observable.empty());
  }

  addSkillMark(newMark: { skillId: string, value: number }): Observable<RawSkillMark> {
    return this.http
      .post('/api/v0/my_skill_marks', newMark)
      .map(responseMark => responseMark.json() as RawSkillMark);
  }

  groupSkillMarksBySkill(skillMarks: Array<RawSkillMark>): SkillMarksGroupedBySkill {
    const groupedSkillMarks = [];
    let skillMarksClone = skillMarks;
    while (skillMarksClone.length) {
      const { streamId, streamName, skillId, skillName } = skillMarksClone[0];
      groupedSkillMarks.push({
        streamId,
        streamName,
        skillId,
        skillName,
        skillMarks: skillMarksClone
          .filter(skillMark => skillMark.skillId === skillId)
          .map(mark => new BaseSkillMark(
            mark._id,
            mark.value,
            mark.postedAt,
            mark.approvement
          ))
          .sort((markA, markB) => markB.postedAtMoment.unix() - markA.postedAtMoment.unix())
      });
      skillMarksClone = skillMarksClone.filter(skillMark => skillMark.skillId !== skillId);
    }
    return groupedSkillMarks;
  }

  setUserPermissions(userId: string, permissions: Array<string>): Observable<any> {
    return this.http
      .put(`/api/v0/users/${userId}/permissions`, { permissions });
  }
}
