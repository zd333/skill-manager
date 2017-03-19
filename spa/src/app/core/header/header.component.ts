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
    this.authService.sessionUser
      .subscribe(user => {
        this.isLoggedIn = Boolean(user);
        this.userName = user ? user.name : '';
      });
  }

  login(event) {
    event.preventDefault();
    this.authService.login();
  }

  logout(event) {
    event.preventDefault();
    this.authService.logout();
  }

}
