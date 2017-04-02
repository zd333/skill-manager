import { SkillMarksModule } from '../skill-marks/skill-marks.module';
import { UsersRoutingModule, usersRoutes } from './users-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './shared/users.service';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersTableComponent } from './shared/users-table/users-table.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    RouterModule.forChild(usersRoutes),
    SkillMarksModule
  ],
  exports: [
    UsersTableComponent
  ],
  providers: [
    UsersService
  ],
  declarations: [UsersComponent, UserListComponent, UserDetailsComponent, UsersTableComponent]
})
export class UsersModule { }
