import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPdpComponent } from './shared/add-pdp/add-pdp.component';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    Ng2AutoCompleteModule,
    FormsModule
  ],
  declarations: [
    AddPdpComponent
  ],
  exports: [
    AddPdpComponent
  ]
})
export class PdpsModule { }
