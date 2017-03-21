import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Skill } from '../skill.model';
import { Stream } from '../../streams/stream.model';
import { AuthService } from '../../core/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { StreamsService } from '../../streams/streams.service';

@Component({
  selector: 'skdsm-manage-skills',
  templateUrl: './manage-skills.component.html',
  styleUrls: ['./manage-skills.component.styl']
})
export class ManageSkillsComponent implements OnInit {
  skills: Array<Skill> = [];
  streams: Array<Stream>
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

  ngOnDestroy() {
    this.permissionSub.unsubscribe();
  }
}
