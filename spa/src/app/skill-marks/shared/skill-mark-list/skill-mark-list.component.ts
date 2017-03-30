import { AuthService } from '../../../core/auth.service';
import { Subscription } from 'rxjs/Rx';
import { SkillMarksGroupedBySkill } from '../skill-mark.model';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'skdsm-skill-mark-list',
  templateUrl: './skill-mark-list.component.html',
  styleUrls: ['./skill-mark-list.component.styl']
})
export class SkillMarkListComponent implements OnInit, OnChanges {
  @Input() groupedMarks: SkillMarksGroupedBySkill;
  currentSort = {
    column: 'value', // Default value will be set during init
    order: true
  };
  private permissionSub: Subscription;
  haveApprovePermission = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.permissionSub = this.authService.sessionUserHasPermission('skillApprover')
      .subscribe(hasPermission => {
        this.haveApprovePermission = hasPermission;
      });
  }

  ngOnChanges() {
    // Not good to mutate original (data in general), but ok here
    this.groupedMarks.forEach(group => group.$$expanded = false);
    this.sort(this.currentSort.column, this.currentSort.order);
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
}
