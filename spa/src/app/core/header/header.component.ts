import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'skdsm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {

  isLoggedIn;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getSessionUser.subscribe(user => {
      this.isLoggedIn = Boolean(user);
    });
  }

  logout() {
    this.authService.logout();
  }

}
