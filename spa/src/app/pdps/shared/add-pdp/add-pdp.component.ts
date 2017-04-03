import { Skill } from '../../../skills/shared/skill.model';
import { NotificationsService } from 'angular2-notifications';
import { SkillsService } from '../../../skills/shared/skills.service';
import { AuthService } from '../../../core/auth.service';
import { Subscription } from 'rxjs/Rx';
import * as moment from 'moment';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'skdsm-add-pdp',
  templateUrl: './add-pdp.component.html',
  styleUrls: ['./add-pdp.component.styl']
})
export class AddPdpComponent implements OnInit {
  @Input() userId: string;
  finishDate: any; // Moment object
  havePdpPermission = false;
  private permissionSub: Subscription;
  skills: Array<Skill> = [];
  selectedSkill: Skill;
  selectedGoalValue: string;
  selectedSkillName: '';
  goals: Array<{ skillId: string, skillName: string, value: number }> = [];

  constructor(
    private authService: AuthService,
    private skillsService: SkillsService,
    private notify: NotificationsService) { }

  ngOnInit() {
    this.loadSkills();

    this.permissionSub = this.authService.sessionUserHasPermission('pdpCreator')
      .subscribe(hasPermission => {
        this.havePdpPermission = hasPermission;
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
  addGoal() {
    this.goals.push({
      skillId: this.selectedSkill._id,
      skillName: this.selectedSkill.name,
      value: Number(this.selectedGoalValue)
    });
    this.selectedGoalValue = '';
    this.selectedSkillName = '';
  }

  ngOnDestroy() {
    this.permissionSub.unsubscribe();
  }
}
