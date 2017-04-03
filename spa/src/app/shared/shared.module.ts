import { FormsModule } from '@angular/forms';
import { BsDropdownModule, DatepickerModule } from 'ng2-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from './chip/chip.component';
import { DropdownDatepickerComponent } from './dropdown-datepicker/dropdown-datepicker.component';
import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    MomentModule,
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot({ autoClose: false }),
    DatepickerModule.forRoot()
  ],
  exports: [
    ChipComponent,
    DropdownDatepickerComponent
  ],
  declarations: [
    ChipComponent,
    DropdownDatepickerComponent
  ]
})
export class SharedModule { }
