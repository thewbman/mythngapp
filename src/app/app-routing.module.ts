import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RecordedComponent } from './recorded/recorded.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { StatusComponent } from './status/status.component';
import { GuideComponent } from './guide/guide.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'recorded', component: RecordedComponent },
  { path: 'upcoming', component: UpcomingComponent },
  { path: 'guide', component: GuideComponent },
  { path: 'status', component: StatusComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
