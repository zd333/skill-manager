import { NotificationsService } from 'angular2-notifications';
import { UsersService } from '../shared/users.service';
import { User } from '../shared/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'skdsm-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.styl']
})
export class UserListComponent implements OnInit {
  users: Array<User> = [];
  isActiveModel: boolean;

  constructor(private userService: UsersService, private notify: NotificationsService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsersList()
      .subscribe(users => {
        this.users = users;
      }, error => {
        const errorObj = error.json();
        this.notify.error('Ошибка', errorObj.errmsg || errorObj.message || 'Не удалось загрузить пользователей');
      });
  }
}
