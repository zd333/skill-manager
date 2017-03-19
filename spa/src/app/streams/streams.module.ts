import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamsService } from './streams.service';

import { ManageStreamsComponent } from './manage-streams/manage-streams.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ManageStreamsComponent],
  providers: [StreamsService]
})
export class StreamsModule { }
