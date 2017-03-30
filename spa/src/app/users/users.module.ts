import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './shared/users.service';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UsersService
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
