import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggedinGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate() {
    return this.authService.isLoggedIn;
  }
}
