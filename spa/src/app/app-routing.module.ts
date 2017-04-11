import { AdminGuard } from './core/admin.guard';
import { LoggedinGuard } from './core/loggedin.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageStreamsComponent } from './streams/manage-streams/manage-streams.component';
import { ManageSkillsComponent } from './skills/manage-skills/manage-skills.component';
import { ProfileComponent } from './profile/profile.component';
import { PermissionsComponent } from './permissions/permissions.component';

export const rootRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'streams',
    component: ManageStreamsComponent,
    canActivate: [LoggedinGuard]
  },
  {
    path: 'skills',
    component: ManageSkillsComponent,
    canActivate: [LoggedinGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoggedinGuard]
  },
  {
    path: 'permissions',
    component: PermissionsComponent,
    canActivate: [AdminGuard]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
