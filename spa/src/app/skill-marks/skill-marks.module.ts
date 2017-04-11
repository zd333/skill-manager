import { SkillMarksService } from './shared/skill-marks.service';
import { TooltipModule } from 'ng2-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillMarkListComponent } from './shared/skill-mark-list/skill-mark-list.component';
import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule,
    MomentModule
  ],
  exports: [
    SkillMarkListComponent
  ],
  declarations: [
    SkillMarkListComponent
  ],
  providers: [
    SkillMarksService
  ]
})
export class SkillMarksModule { }
