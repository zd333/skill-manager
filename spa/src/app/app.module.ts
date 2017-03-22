import { UsersService } from './users/users.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
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
    HomeModule,
    StreamsModule,
    SkillsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    UsersService
  ]
})
export class AppModule { }
