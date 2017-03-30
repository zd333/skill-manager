import { TooltipModule } from 'ng2-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    ReactiveFormsModule,
    TooltipModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
