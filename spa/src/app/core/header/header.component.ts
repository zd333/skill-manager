import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'skdsm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  userName: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getSessionUser.subscribe(user => {
      this.isLoggedIn = Boolean(user);
      this.userName = user ? user.name : '';
    });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
