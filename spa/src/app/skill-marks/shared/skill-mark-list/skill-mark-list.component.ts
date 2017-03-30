import { SkillMarksGroupedBySkill } from '../skill-mark.model';
import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'skdsm-skill-mark-list',
  templateUrl: './skill-mark-list.component.html',
  styleUrls: ['./skill-mark-list.component.styl']
})
export class SkillMarkListComponent implements OnInit {
  @Input() groupedMarks: SkillMarksGroupedBySkill;
  groupExpanded: Array<boolean>;
  constructor() { }

  ngOnInit() {
    this.groupExpanded = this.groupedMarks.map(() => false);
  }
}
