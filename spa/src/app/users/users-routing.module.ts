import { UsersComponent } from './users.component';
import { LoggedinGuard } from '../core/loggedin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const usersRoutes: Routes = [
  { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule { }
