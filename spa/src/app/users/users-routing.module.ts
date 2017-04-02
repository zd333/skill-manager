import { UsersComponent } from './users.component';
import { LoggedinGuard } from '../core/loggedin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const usersRoutes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: UserListComponent },
      { path: ':id', component: UserDetailsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule { }
