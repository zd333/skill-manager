import { Stream } from '../streams/stream.model';
import * as stream from 'stream';
import { Skill, SkillsGroupedByStream } from './skill.model';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SkillsService {

  constructor(private http: Http) { }

  getSkillsList(): Observable<Array<Skill>> {
    return this.http
      .get('/api/v0/skills')
      .map(responseSkills => responseSkills.json() as Array<Skill>);
  }

  groupSkillsByStream(skills: Array<Skill>): SkillsGroupedByStream {
    const groupedSkills = [];
    let rawSkills = skills;
    while (rawSkills.length) {
      const { streamId, streamName } = rawSkills[0];
      groupedSkills.push({
        streamId,
        streamName,
        skills: rawSkills
          .filter(skill => skill.streamId === streamId)
          .map(skill => ({
            _id: skill._id,
            name: skill.name
          }))
      });
      rawSkills = rawSkills.filter(skill => skill.streamId !== streamId);
    }
    return groupedSkills;
  }


  addSkill(newSkill: { name: string, streamId: string }): Observable<Skill> {
    return this.http
      .post('/api/v0/skills', newSkill)
      .map(responseSkill => responseSkill.json() as Skill);
  }
}
