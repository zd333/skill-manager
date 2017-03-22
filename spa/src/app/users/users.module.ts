import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './users.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    UsersService
  ],
  declarations: [
    UsersService
  ]
})
export class UsersModule { }
