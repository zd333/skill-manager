import { UsersModule } from '../users/users.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsService } from './shared/streams.service';
import { ManageStreamsComponent } from './manage-streams/manage-streams.component';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    Ng2AutoCompleteModule,
    UsersModule
  ],
  declarations: [
    ManageStreamsComponent
  ],
  providers: [
    StreamsService
  ]
})
export class StreamsModule { }
