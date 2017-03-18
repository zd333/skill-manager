import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {Ng2UiAuthModule, CustomConfig} from 'ng2-ui-auth';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';

// TODO: move this out of here
// TODO: add mechanism to replace this for production
const GOOGLE_CLIENT_ID = '625633771047-vbmhvssf8l3o48ib77n87irou3krj6cg.apps.googleusercontent.com';
export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    providers = {google: {
      clientId: GOOGLE_CLIENT_ID,
      url: '/api/v0/login/google/callback',
      hd: 'steelkiwi.com',
      prompt: 'select_account'
    }};
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2UiAuthModule.forRoot(MyAuthConfig),
    CoreModule,
    AppRoutingModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
