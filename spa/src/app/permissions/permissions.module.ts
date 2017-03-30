import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsComponent } from './permissions.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],

  declarations: [PermissionsComponent]
})
export class PermissionsModule { }
