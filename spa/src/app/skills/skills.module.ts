import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsService } from './skills.service';
import { ManageSkillsComponent } from './manage-skills/manage-skills.component';
import { AccordionModule } from 'ng2-bootstrap';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [ManageSkillsComponent],
  providers: [SkillsService]
})
export class SkillsModule { }
