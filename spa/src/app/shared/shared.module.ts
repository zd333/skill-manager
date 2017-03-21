import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from './chip/chip.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ChipComponent
  ],
  declarations: [ChipComponent]
})
export class SharedModule { }
