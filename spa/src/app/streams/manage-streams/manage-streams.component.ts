import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { StreamsService } from '../streams.service';
import { Stream } from '../stream.model';

@Component({
  selector: 'skdsm-manage-streams',
  templateUrl: './manage-streams.component.html',
  styleUrls: ['./manage-streams.component.styl']
})
export class ManageStreamsComponent implements OnInit, OnDestroy {
  streams: Array<Stream> = [];
  haveComposePermission: boolean = false;
  private permissionSub: Subscription;

  constructor(private streamsService: StreamsService, private authService: AuthService, private notify: NotificationsService) { }

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

  addStream(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.streamsService.addStream(form.value)
      .subscribe(addedStream => {
        this.streams = this.streams.concat(addedStream);
        form.reset();
      }, error => {
        const errorMsg = error.json().errmsg;
        this.notify.error('Ошибка', errorMsg || 'Не удалось добавить направление');
      })
  }

  ngOnDestroy() {
    this.permissionSub.unsubscribe();
  }
}
