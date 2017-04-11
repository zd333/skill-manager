import { PdpsService } from '../pdps.service';
import { BasePdp } from '../pdp.model';
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
  finishDate: any;
  havePdpPermission = false;
  private permissionSub: Subscription;
  skills: Array<Skill> = [];
  selectedSkill: Skill;
  selectedGoalValue: string;
  selectedSkillName: '';
  goals: Array<{ skill: Skill, value: string }> = [];

  constructor(
    private authService: AuthService,
    private skillsService: SkillsService,
    private notify: NotificationsService,
    private pdpsService: PdpsService) { }

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
      skill: this.selectedSkill,
      value: this.selectedGoalValue
    });
    this.skills = this.skills.filter(skill => skill !== this.selectedSkill)
    this.selectedGoalValue = '';
    this.selectedSkillName = '';
  }

  filterSkillClosed(deletedGoal) {
    this.goals = this.goals.filter(goal => goal !== deletedGoal);
    this.skills.push(deletedGoal.skill);
  }

  addPdp() {
    const pdpToSave: BasePdp = {
      plannedFinishAt: moment(this.finishDate).toISOString(),
      userId: this.userId,
      goals: this.goals.map(goal => ({
        skillId: goal.skill._id,
        value: Number(goal.value)
      }))
    };
    this.pdpsService.addPdp(pdpToSave)
      .subscribe(createdPdp => {
        // TODO: add new pdp to list
        console.log(createdPdp);
        // Restore Skills list
        this.skills.push(...this.goals.map(goal => goal.skill));
        this.goals = [];
      }, error => {
        const errorObj = error.json();
        this.notify.error('Ошибка', errorObj.errmsg || errorObj.message || 'Не удалось добавить план');
      });
  }

  ngOnDestroy() {
    this.permissionSub.unsubscribe();
  }
}
