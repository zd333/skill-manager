import { NotificationsService } from 'angular2-notifications';
import { UsersService } from '../users/shared/users.service';
import { User } from '../users/shared/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'skdsm-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.styl']
})
export class PermissionsComponent implements OnInit {
  users: Array<User> = [];
  selectedUser: User;
  checkboxesModel: Object = {};
  isActiveModel: boolean;
  saveInProgress = false;

  constructor(private userService: UsersService, private notify: NotificationsService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsersList('', true)
      .subscribe(users => {
        this.users = users;
        // There are always must be more then 0 users
        this.setSelectedUser({ target: { value: users[0]._id } });
      }, error => {
        const errorObj = error.json();
        this.notify.error('Ошибка', errorObj.errmsg || errorObj.message || 'Не удалось загрузить пользователей');
      });
  }

  setSelectedUser(event) {
    this.selectedUser = this.users.find(user => user._id === event.target.value);
    this.isActiveModel = this.selectedUser.isActive;
    const model = {
      admin: false,
      skillComposer: false,
      skillApprover: false,
      pdpCreator: false
    };
    this.selectedUser.permissions
      .forEach(permissionName => {
        model[permissionName] = true;
      });
    this.checkboxesModel = model;
  }

  setActivity(event) {
    this.saveInProgress = true;
    this.userService.setUserActivity(this.selectedUser._id, event.target.checked)
      .subscribe( () => {}, error => {
        const errorObj = error.json();
        this.notify.error('Ошибка', errorObj.errmsg || errorObj.message || 'Не удалось изменить активность пользователя');
      }, () => {
        this.saveInProgress = false;
      });
  }

  setPermissions() {
    const newPermissions = [];
    Object.getOwnPropertyNames(this.checkboxesModel)
      .forEach(permissionName => {
        if (this.checkboxesModel[permissionName]) {
          newPermissions.push(permissionName);
        }
      });
    this.saveInProgress = true;
    this.userService.setUserPermissions(this.selectedUser._id, newPermissions)
      .subscribe( () => {}, error => {
        const errorObj = error.json();
        this.notify.error('Ошибка', errorObj.errmsg || errorObj.message || 'Не удалось изменить права');
      }, () => {
        this.saveInProgress = false;
      });
  }
}
