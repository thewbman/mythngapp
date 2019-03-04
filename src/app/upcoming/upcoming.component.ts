import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { Program } from '../program';
import { MythDataService } from '../mythdata.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {

  allDatesString: string;

  dataLoaded: boolean;

  upcomings: Program[]

  constructor(private dataService: MythDataService, private mesService: MessageService) { }

  ngOnInit() {
    this.dataLoaded = false;
    this.allDatesString = "-- All --";

    this.getUpcoming();
  }

  getUpcoming(): void {
    this.dataService.getUpcomingUrl().subscribe(resp => {this.upcomings = resp.ProgramList.Programs; this.getUpcomingCompleted(); });
  }

  getUpcomingCompleted(): void {
    this.dataLoaded = true;
  }

}
