import { TooltipModule } from 'ng2-bootstrap';
import { ProfileModule } from './profile/profile.module';
import { PermissionsModule } from './permissions/permissions.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CoreModule, MyAuthConfig } from './core/core.module';
import { AppRoutingModule, rootRoutes } from './app-routing.module';
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { HomeModule } from './home/home.module';
import { StreamsModule } from './streams/streams.module';
import { SkillsModule } from './skills/skills.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    AppRoutingModule,
    RouterModule.forRoot(rootRoutes),
    Ng2UiAuthModule.forRoot(MyAuthConfig),
    SimpleNotificationsModule.forRoot(),
    TooltipModule.forRoot(),
    HomeModule,
    StreamsModule,
    SkillsModule,
    ProfileModule,
    PermissionsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
