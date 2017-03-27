import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagePermissionsComponent } from './manage-permissions/manage-permissions.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ManagePermissionsComponent]
})
export class PermissionsModule { }
