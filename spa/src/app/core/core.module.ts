import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule
  ],
  declarations: [HeaderComponent]
})
export class CoreModule { }