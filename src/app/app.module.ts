import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecordedComponent } from './recorded/recorded.component';
import { RecordedDetailComponent } from './recorded-detail/recorded-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { StatusComponent } from './status/status.component';
import { GuideComponent } from './guide/guide.component';

@NgModule({
  declarations: [
    AppComponent,
    RecordedComponent,
    RecordedDetailComponent,
    MessagesComponent,
    DashboardComponent,
    UpcomingComponent,
    StatusComponent,
    GuideComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
