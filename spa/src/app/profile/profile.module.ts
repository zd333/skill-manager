import { SkillMarksModule } from '../skill-marks/skill-marks.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SkillMarksModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
