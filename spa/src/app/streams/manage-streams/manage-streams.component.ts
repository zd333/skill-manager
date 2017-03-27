import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.model';
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
  streamsLeftForSearch: Array<Stream> = [];
  streamsSelectedForSearch: Array<Stream> = [];
  selectedStream: string;
  foundUsers: Array<User> = [];
  includeInactiveUsers = false;
  haveComposePermission = false;
  streamListIsExpanded = false;
  private permissionSub: Subscription;

  constructor(private streamsService: StreamsService, private authService: AuthService,
    private notify: NotificationsService, private usersService: UsersService) { }

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
        this.streamsLeftForSearch = streams;
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
        const errorObj = error.json();
        this.notify.error('Ошибка', errorObj.errmsg || errorObj.message || 'Не удалось добавить направление');
      });
  }

  filterStreamSelected(selectedStream) {
    this.streamsSelectedForSearch = this.streamsSelectedForSearch.concat(selectedStream);
    this.streamsLeftForSearch = this.streamsLeftForSearch
      .filter(stream => stream !== selectedStream);
    this.selectedStream = '';
    this.searchUsers();
  }

  filterStreamClosed(closedStream) {
    this.streamsSelectedForSearch = this.streamsSelectedForSearch
      .filter(stream => stream !== closedStream);
    this.streamsLeftForSearch = this.streamsLeftForSearch.concat(closedStream);
    this.searchUsers();
  }

  searchUsers() {
    if (!this.streamsSelectedForSearch.length) {
      this.foundUsers = [];
      return;
    }
    this.usersService.findUsers(this.streamsSelectedForSearch.map(stream => stream._id), [], this.includeInactiveUsers)
      .subscribe(users => {
        this.foundUsers = users;
      }, error => {
        const errorObj = error.json();
        this.notify.error('Ошибка', errorObj.errmsg || errorObj.message || 'Сбой при поиске');
      });
  }

  inactiveFilterChanged(event) {
    this.includeInactiveUsers = event.target.checked;
    this.searchUsers();
  }

  ngOnDestroy() {
    this.permissionSub.unsubscribe();
  }
}
