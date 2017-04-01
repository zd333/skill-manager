import { Approvement } from './skill-mark.model';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SkillMarksService {
  constructor(private http: Http) { }

  approveSkillMark(id: string): Observable<Approvement> {
    return this.http
      .post(`/api/v0/user_skill_marks/${id}/approve`, {})
      .map(responseApprovement => responseApprovement.json() as Approvement);
  }
}
