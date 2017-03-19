import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2UiAuthModule, CustomConfig } from 'ng2-ui-auth';

import { environment } from '../../environments/environment';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './auth.service';

export class MyAuthConfig extends CustomConfig {
  defaultHeaders = { 'Content-Type': 'application/json' };
  providers = {
    google: {
      clientId: environment.googleClientId,
      url: '/api/v0/login/google',
      hd: 'steelkiwi.com',
      prompt: 'select_account'
    }
  };
}

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    Ng2UiAuthModule.forRoot(MyAuthConfig),
  ],
  providers: [AuthService],
  exports: [
    RouterModule,
    CommonModule,
    HeaderComponent
  ],
  declarations: [HeaderComponent]
})
export class CoreModule { }
