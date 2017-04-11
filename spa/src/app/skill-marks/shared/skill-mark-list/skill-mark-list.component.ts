import { NotificationsService } from 'angular2-notifications';
import { SkillMarksService } from '../skill-marks.service';
import { AuthService } from '../../../core/auth.service';
import { Subscription } from 'rxjs/Rx';
import { BaseSkillMark, SkillMarksGroupedBySkill } from '../skill-mark.model';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'skdsm-skill-mark-list',
  templateUrl: './skill-mark-list.component.html',
  styleUrls: ['./skill-mark-list.component.styl']
})
export class SkillMarkListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() groupedMarks: SkillMarksGroupedBySkill;
  currentSort = {
    column: 'value', // Default value will be set during init
    order: true
  };
  private permissionSub: Subscription;
  haveApprovePermission = false;

  constructor(private authService: AuthService, private skillMarksService: SkillMarksService,
    private notify: NotificationsService) { }

  ngOnInit() {
    this.permissionSub = this.authService.sessionUserHasPermission('skillApprover')
      .subscribe(hasPermission => {
        this.haveApprovePermission = hasPermission;
      });
  }

  ngOnChanges() {
    // Not good to mutate original data (in general), but ok here
    this.groupedMarks.forEach(group => group.$$expanded = false);
    this.sort(this.currentSort.column, this.currentSort.order);
  }

  approve(groupIndex, markIndex) {
    const mark = this.groupedMarks[groupIndex].skillMarks[markIndex];
    this.skillMarksService.approveSkillMark(mark._id)
      .subscribe(approvement => {
        this.groupedMarks[groupIndex].skillMarks[markIndex] = new BaseSkillMark(
          mark._id,
          mark.value,
          mark.postedAtMoment.toISOString(),
          approvement);
      }, error => {
        const errorObj = error.json();
        this.notify.error('Ошибка', errorObj.errmsg || errorObj.message || 'Не удалось подтвердить');
      });
  }

  setSort(pressedColumn: string) {
    if (this.currentSort.column === pressedColumn) {
      this.sort(pressedColumn, !this.currentSort.order);
    } else {
      this.sort(pressedColumn, true);
    }
  }

  sort(column: string, order: boolean) {
    this.currentSort = {
      column,
      order
    };
    switch (this.currentSort.column) {
      default:
      case 'skillName':
        if (order) {
          this.groupedMarks = this.groupedMarks
            .sort((groupA, groupB) => groupB.skillName.toLowerCase() > groupA.skillName.toLowerCase() ? -1 : 1);
        } else {
          this.groupedMarks = this.groupedMarks
            .sort((groupA, groupB) => groupA.skillName.toLowerCase() > groupB.skillName.toLowerCase() ? -1 : 1);
        }
        break;
      case 'streamName':
        if (order) {
          this.groupedMarks = this.groupedMarks
            .sort((groupA, groupB) => groupB.streamName.toLowerCase() > groupA.streamName.toLowerCase() ? -1 : 1);
        } else {
          this.groupedMarks = this.groupedMarks
            .sort((groupA, groupB) => groupA.streamName.toLowerCase() > groupB.streamName.toLowerCase() ? -1 : 1);
        }
        break;
      case 'value':
        if (order) {
          this.groupedMarks = this.groupedMarks
            .sort((groupA, groupB) => groupB.skillMarks[0].value - groupA.skillMarks[0].value);
        } else {
          this.groupedMarks = this.groupedMarks
            .sort((groupA, groupB) => groupA.skillMarks[0].value - groupB.skillMarks[0].value);
        }
        break;
      case 'postedAtMoment':
        if (order) {
          this.groupedMarks = this.groupedMarks
            .sort((groupA, groupB) => groupB.skillMarks[0].postedAtMoment.unix() - groupA.skillMarks[0].postedAtMoment.unix());
        } else {
          this.groupedMarks = this.groupedMarks
            .sort((groupA, groupB) => groupA.skillMarks[0].postedAtMoment.unix() - groupB.skillMarks[0].postedAtMoment.unix());
        }
        break;
    }
  }

  ngOnDestroy() {
    this.permissionSub.unsubscribe();
  }
}
