import { UsersRoutingModule, usersRoutes } from './users-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './shared/users.service';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    RouterModule.forChild(usersRoutes)
  ],
  providers: [
    UsersService
  ],
  declarations: [UsersComponent, UserListComponent]
})
export class UsersModule { }
