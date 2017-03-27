import { MomentModule } from 'angular2-moment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    MomentModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
