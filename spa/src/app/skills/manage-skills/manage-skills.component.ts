import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.model';
import { SkillsService } from '../skills.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Skill, SkillsGroupedByStream } from '../skill.model';
import { Stream } from '../../streams/stream.model';
import { AuthService } from '../../core/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { StreamsService } from '../../streams/streams.service';

@Component({
  selector: 'skdsm-manage-skills',
  templateUrl: './manage-skills.component.html',
  styleUrls: ['./manage-skills.component.styl']
})
export class ManageSkillsComponent implements OnInit, OnDestroy {
  streams: Array<Stream>;
  groupedSkills: SkillsGroupedByStream = [];
  skillsLeftForSearch: Array<Skill> = [];
  skillsSelectedForSearch: Array<Skill> = [];
  selectedSkillName = '';
  foundUsers: Array<User> = [];
  includeInactiveUsers = false;
  haveComposePermission = false;
  private permissionSub: Subscription;
  public addSkillForm = this.fb.group({
    name: ['', Validators.required],
    streamId: ['', Validators.required]
  });

  constructor(private streamsService: StreamsService, private authService: AuthService, private notify: NotificationsService,
    private fb: FormBuilder, private skillsService: SkillsService, private usersService: UsersService) { }

  ngOnInit() {
    this.loadStreamsList();
    this.loadSkills();

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

  loadSkills() {
    this.skillsService.getSkillsList()
      .subscribe(skills => {
        this.skillsLeftForSearch = skills;
        this.groupedSkills = this.skillsService.groupSkillsByStream(skills);
      }, error => {
        const errorObj = error.json();
        this.notify.error('Ошибка', errorObj.errmsg || errorObj.message || 'Не удалось загрузить список умений');
      });
  }

  addSkill() {
    this.addSkillForm.get('name').markAsTouched();
    this.addSkillForm.get('streamId').markAsTouched();
    if (!this.addSkillForm.valid) {
      return;
    }
    this.skillsService.addSkill({
      name: this.addSkillForm.get('name').value,
      streamId: this.addSkillForm.get('streamId').value
    })
      .subscribe(addedSkill => {
        // TODO: push added skill
        this.groupedSkills
          .find(skillGroup => skillGroup.streamId === addedSkill.streamId)
          .skills.push({
            _id: addedSkill._id,
            name: addedSkill.name
          });
        this.addSkillForm.reset();
      }, error => {
        const errorObj = error.json();
        this.notify.error('Ошибка', errorObj.errmsg || errorObj.message || 'Не удалось добавить умение');
      });
  }

  filterSkillSelected(selectedSkill) {
    this.skillsSelectedForSearch = this.skillsSelectedForSearch.concat(selectedSkill);
    this.skillsLeftForSearch = this.skillsLeftForSearch
      .filter(skill => skill !== selectedSkill);
    this.selectedSkillName = '';
    this.searchUsers();
  }

  filterSkillClosed(closedSkill) {
    this.skillsSelectedForSearch = this.skillsSelectedForSearch
      .filter(skill => skill !== closedSkill);
    this.skillsLeftForSearch = this.skillsLeftForSearch.concat(closedSkill);
    this.searchUsers();
  }

  searchUsers() {
    if (!this.skillsSelectedForSearch.length) {
      this.foundUsers = [];
      return;
    }
    this.usersService.findUsers([], this.skillsSelectedForSearch.map(skill => skill._id), this.includeInactiveUsers)
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
