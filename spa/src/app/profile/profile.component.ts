import { FormBuilder, Validators } from '@angular/forms';
import { SkillsService } from '../skills/shared/skills.service';
import { Skill } from '../skills/shared/skill.model';
import { NotificationsService } from 'angular2-notifications';
import { BaseSkillMark, SkillMark, SkillMarksGroupedBySkill } from '../skill-marks/shared/skill-mark.model';
import { UsersService } from '../users/shared/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'skdsm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit {
  myGroupedSkillMarks: SkillMarksGroupedBySkill = [];
  groupExpanded: Array<boolean> = [];
  skills: Array<Skill> = [];
  public addMarkForm = this.fb.group({
    newMarkSkillId: ['', Validators.required],
    newMarkValue: ['', Validators.required]
  });

  constructor(
    private usersService: UsersService,
    private notify: NotificationsService,
    private skillsService: SkillsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadMySkillMarks();
    this.loadSkills();
  }

  loadMySkillMarks() {
    this.usersService.getMyProfileData()
      .subscribe(me => {
        this.myGroupedSkillMarks = this.usersService.groupSkillMarksBySkill(me.skillMarks);
      }, error => {
        const errorObj = error.json();
        this.notify.error('Ошибка', errorObj.errmsg || errorObj.message || 'Не удалось загрузить данные профиля');
      });
  }

  loadSkills() {
    this.skillsService.getSkillsList()
      .subscribe(skills => {
        this.skills = skills;
      }, error => {
        const errorObj = error.json();
        this.notify.error('Ошибка', errorObj.errmsg || errorObj.message || 'Не удалось загрузить список умений');
      });
  }

  addMark() {
    this.addMarkForm.get('newMarkSkillId').markAsTouched();
    this.addMarkForm.get('newMarkValue').markAsTouched();
    if (!this.addMarkForm.valid) {
      return;
    }
    const selectedSkillId = this.addMarkForm.get('newMarkSkillId').value;
    let selectedGroup = this.myGroupedSkillMarks.find(group => group.skillId === selectedSkillId);

    this.usersService.addSkillMark({
      skillId: selectedSkillId,
      value: Number(this.addMarkForm.get('newMarkValue').value)
    })
      .subscribe(newMark => {
        if (selectedGroup) {
          selectedGroup.skillMarks = [new BaseSkillMark(newMark._id, newMark.value, newMark.postedAt)]
            .concat(selectedGroup.skillMarks);
        } else {
          // This is new skill for users
          const selectedSkill = this.skills.find(skill => skill._id === selectedSkillId);
          selectedGroup = {
            streamId: selectedSkill.streamId,
            streamName: selectedSkill.streamName,
            skillId: selectedSkill._id,
            skillName: selectedSkill.name,
            skillMarks: [new BaseSkillMark(newMark._id, newMark.value, newMark.postedAt)]
          };
          this.myGroupedSkillMarks.push(selectedGroup);
        }
        this.addMarkForm.reset();
      }, error => {
        const errorObj = error.json();
        this.notify.error('Ошибка', errorObj.errmsg || errorObj.message || 'Не удалось добавить оценку');
      });
  }
}
