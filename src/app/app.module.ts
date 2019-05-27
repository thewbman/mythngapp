import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

import { WINDOW_PROVIDERS } from './window.provider';
import { UniquePipe } from './pipes/unique.pipe';
import { UniqueTitlePipe } from './pipes/unique-title.pipe';
import { RecstatusPipe } from './pipes/recstatus.pipe';

import { CookieService } from './cookie.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordedComponent } from './recorded/recorded.component';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { StatusComponent } from './status/status.component';
import { GuideComponent } from './guide/guide.component';
import { SettingsComponent } from './settings/settings.component';




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule
  ],
  // exports: [
  //  MaterialModule
  // ],
  providers: [
    WINDOW_PROVIDERS,
    CookieService
  ],
  declarations: [
    AppComponent,
    RecordedComponent,
    ProgramDetailComponent,
    MessagesComponent,
    DashboardComponent,
    UpcomingComponent,
    StatusComponent,
    GuideComponent,
    SettingsComponent,
    UniquePipe,
    UniqueTitlePipe,
    RecstatusPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
