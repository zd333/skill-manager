import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { StreamsService } from '../streams.service';
import { AuthService } from '../../core/auth.service';

import { Stream } from '../stream.model';

@Component({
  selector: 'app-manage-streams',
  templateUrl: './manage-streams.component.html',
  styleUrls: ['./manage-streams.component.styl']
})
export class ManageStreamsComponent implements OnInit, OnDestroy {

  streams: Array<Stream> = [];
  haveComposePermission: boolean = false;

  private permissionSub: Subscription;

  constructor(private streamsService: StreamsService, private authService: AuthService) { }

  ngOnInit() {
    this.loadStreamsList();

    this.permissionSub = this.authService.sessionUserHasPermission('skillComposer')
      .subscribe(hasPermission => {
        this.haveComposePermission = hasPermission;
      });
  }

  private loadStreamsList() {
    this.streamsService.getStreamsList()
      .subscribe(streams => {
        this.streams = streams;
      });
  }

  addName(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.streamsService.addStream(form.value)
      .subscribe(addedStream => {
        this.streams = this.streams.concat(addedStream);
        form.reset();
      }, error => {
        console.log('error', error);
      })
  }

  ngOnDestroy() {
    this.permissionSub.unsubscribe();
  }

}
