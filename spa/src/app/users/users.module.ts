import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './shared/users.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
