import { User } from '../user.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'skdsm-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.styl']
})
export class UsersTableComponent {
  @Input() users: Array<User> = [];
}
