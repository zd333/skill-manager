import { AdminGuardService } from './core/admin-guard.service';
import { LoggedinGuardService } from './core/loggedin-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageStreamsComponent } from './streams/manage-streams/manage-streams.component';
import { ManageSkillsComponent } from './skills/manage-skills/manage-skills.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { ManagePermissionsComponent } from './permissions/manage-permissions/manage-permissions.component';

export const rootRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'streams',
    component: ManageStreamsComponent,
    canActivate: [LoggedinGuardService]
  },
  {
    path: 'skills',
    component: ManageSkillsComponent,
    canActivate: [LoggedinGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoggedinGuardService]
  },
  {
    path: 'permissions',
    component: ManagePermissionsComponent,
    canActivate: [AdminGuardService]
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
