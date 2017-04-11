import { UsersModule } from '../users/users.module';
import { SharedModule } from '../shared/shared.module';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsService } from './shared/skills.service';
import { ManageSkillsComponent } from './manage-skills/manage-skills.component';
import { AccordionModule } from 'ng2-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2AutoCompleteModule,
    SharedModule,
    UsersModule
  ],
  declarations: [ManageSkillsComponent],
  providers: [SkillsService]
})
export class SkillsModule { }
