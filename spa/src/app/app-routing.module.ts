import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageStreamsComponent } from './streams/manage-streams/manage-streams.component';
import { ManageSkillsComponent } from './skills/manage-skills/manage-skills.component';

export const rootRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'streams', component: ManageStreamsComponent },
  { path: 'skills', component: ManageSkillsComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
