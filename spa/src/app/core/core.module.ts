import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [AuthService],
  exports: [
    CommonModule,
    HeaderComponent
  ],
  declarations: [HeaderComponent]
})
export class CoreModule { }
