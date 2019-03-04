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

  tabIndex: number;
  dateTabEnabled: boolean;
  programTabEnabled: boolean;

  selectedUpcomingGroup: string;
  selectedDate: string;
  selectedUpcoming: Program;

  upcomingPrograms: Program[];
  upcomingGroupList: string[];
  dateList: string[];
  filteredUpcomings: Program[];

  constructor(private dataService: MythDataService, private mesService: MessageService) { }

  ngOnInit() {
    this.dataLoaded = false;

    this.tabIndex = 0;
    this.dateTabEnabled = false;
    this.programTabEnabled = false;

    this.allDatesString = '-- All --';

    this.selectedUpcomingGroup = 'Upcoming';

    this.upcomingGroupList = ['All', 'Conflicting', 'Overrides', 'Upcoming'];

    this.getUpcoming();
  }

  getUpcoming(): void {
    this.dataService.getUpcomingUrl().subscribe(resp => {this.upcomingPrograms = resp.ProgramList.Programs; this.getUpcomingCompleted(); });
  }

  getUpcomingCompleted(): void {
    this.dataLoaded = true;
    this.onSelectGroup(this.selectedUpcomingGroup);
  }

  filterDatesByGroup(): void {
    this.dateList = [];

    if (this.upcomingPrograms != null) {
      for (const u of this.upcomingPrograms) {
        // need to do status filtering too
        if (u.StartTime != null) {
          // this.mesService.add('Adding date: '+u.StartTime);
          this.dateList.push(u.StartTime.substring(0, 10));
        } else {
          this.mesService.add('StartTime was null for ' + u);
        }
      }
    }

    this.dateList = Array.from(new Set(this.dateList)).sort();
    this.dateList.unshift(this.allDatesString);
  }

  filterProgramsByDate(): void {
    this.filteredUpcomings = [];
    this.filteredUpcomings = this.upcomingPrograms;
  }







  onSelectGroup(myGroup: string): void {
    this.mesService.add('Selected upcoming Group: ' + myGroup);
    this.selectedUpcomingGroup = myGroup;
    this.filterDatesByGroup();
    this.dateTabEnabled = true;
    this.tabIndex = 1;
  }

  onSelectDate(myDate: string): void {
    this.mesService.add('Selected date: ' + myDate);
    this.selectedDate = myDate;
    this.filterProgramsByDate();
    this.programTabEnabled = true;
    this.tabIndex = 2;
  }

  onSelectProgram(myProgram: Program): void {
    this.mesService.add('select program: ' + myProgram.Title);
    this.selectedUpcoming = myProgram;
    this.tabIndex = 3;
  }

  onTabChanged(tabChangeEvent: any): void {
    this.mesService.add('onTabChanged: ' + tabChangeEvent.index.toString());
    if (tabChangeEvent.index !== this.tabIndex) {
      this.tabIndex = tabChangeEvent.index;
    }
  }

}
