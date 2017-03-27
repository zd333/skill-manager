import { NotificationsService } from 'angular2-notifications';
import { SkillMark, SkillMarksGroupedBySkill } from '../../users/skill-mark.model';
import { UsersService } from '../../users/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'skdsm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit {
  myGroupedSkillMarks: SkillMarksGroupedBySkill = [];

  constructor(private usersService: UsersService, private notify: NotificationsService) { }

  ngOnInit() {
    this.loadMySkillMarks();
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
}
