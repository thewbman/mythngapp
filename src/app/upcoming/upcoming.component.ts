import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
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
  selectedDateFormatted: string;
  selectedUpcoming: Program;

  allPrograms: Program[];
  groupFilteredPrograms: Program[];
  dateFilteredPrograms: Program[];

  upcomingGroupList: string[];
  dateList: string[];

  constructor(private dataService: MythDataService, private mesService: MessageService) { }

  ngOnInit() {
    this.dataLoaded = false;

    this.tabIndex = 0;
    this.dateTabEnabled = false;
    this.programTabEnabled = false;

    this.allDatesString = '-- All Dates --';

    this.selectedUpcomingGroup = 'Upcoming';
    this.selectedDate = '';
    this.selectedDateFormatted = '';
    this.selectedUpcoming = null;

    this.upcomingGroupList = ['All', 'Conflicting', 'Overrides', 'Upcoming'];

    this.getUpcoming();
  }

  getUpcoming(): void {
    this.dataService.getUpcomingUrl().subscribe(resp => {this.allPrograms = resp.ProgramList.Programs; this.getUpcomingCompleted(); });
  }

  getUpcomingCompleted(): void {
    this.dataLoaded = true;
    this.onSelectGroup(this.selectedUpcomingGroup);
  }

  filterDatesByGroup(): void {
    this.dateList = [];
    this.groupFilteredPrograms = [];

    if ((this.allPrograms != null) && (this.selectedUpcomingGroup != null)) {

      switch (this.selectedUpcomingGroup) {
        case 'All': {
	  this.groupFilteredPrograms = Array.from(new Set(this.allPrograms));
	  break;
	}
	case 'Conflicting': {
          for (const p of this.allPrograms) {
	    if (p.Recording.Status === '7') {
	      this.groupFilteredPrograms.push(p);
	    }
	  }
          break;
	}
	case 'Overrides': {
          for (const p of this.allPrograms) {
            if (p.Recording.Status === '1') {
              this.groupFilteredPrograms.push(p);
            }
          }
          break;
        }
	case 'Upcoming': {
          for (const p of this.allPrograms) {
            if ((p.Recording.Status === '7') || (p.Recording.Status === '-2') || (p.Recording.Status === '-1')) {
              this.groupFilteredPrograms.push(p);
            }
          }
          break;
        }
	default: {
	  this.groupFilteredPrograms = Array.from(new Set(this.allPrograms));
	  break;
	}
      }

      if (this.groupFilteredPrograms != null) {
      for (const u of this.groupFilteredPrograms) {
        // need to do status filtering too
        if (u.StartTime != null) {
          // this.mesService.add('Adding date: '+u.StartTime);
          this.dateList.push(formatDate(u.StartTime, 'yyyy-MM-dd', 'en-US'));
        } else {
          this.mesService.add('StartTime was null for ' + u);
        }
      }
      } else {
        this.mesService.add('groupFilteredPrograms was null');
      }
    }

    this.dateList = Array.from(new Set(this.dateList)).sort();
    this.dateList.unshift(this.allDatesString);
  }

  filterProgramsByDate(): void {
    this.dateFilteredPrograms = [];

    if ((this.selectedDate == null) || (this.selectedDate === '')) {
      // do nothing
    } else if (this.selectedDate === this.allDatesString ) {
      this.dateFilteredPrograms = this.groupFilteredPrograms;
    } else {
      for (const u of this.groupFilteredPrograms) {
        if (formatDate(u.StartTime, 'yyyy-MM-dd', 'en-US') === formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US')) {
          this.dateFilteredPrograms.push(u);
        }
      }
    }
  
  }







  onSelectGroup(myGroup: string) : void {
    this.mesService.add('Selected upcoming Group: ' + myGroup);
    this.selectedUpcomingGroup = myGroup;
    this.filterDatesByGroup();
    this.dateTabEnabled = true;
    this.tabIndex = 1;
  };

  onSelectDate(myDate: string) : void {
    this.mesService.add('Selected date: ' + myDate);
    this.selectedDate = myDate;
    this.selectedDateFormatted = (this.selectedDate === this.allDatesString ? this.selectedDate : formatDate(this.selectedDate,'fullDate','en-US'));
    this.filterProgramsByDate();
    this.programTabEnabled = true;
    this.tabIndex = 2;
  };

  onSelectProgram(myProgram: Program) : void {
    this.mesService.add('select program: ' + myProgram.Title);
    this.selectedUpcoming = myProgram;
    this.tabIndex = 3;
  };

  onTabChanged(tabChangeEvent: any) : void {
    this.mesService.add('onTabChanged: ' + tabChangeEvent.index.toString());
    if (tabChangeEvent.index !== this.tabIndex) {
      this.tabIndex = tabChangeEvent.index;
    }

    switch (this.tabIndex) {
      case 0: {
        // Group
        this.selectedUpcomingGroup = '';
        this.selectedDate = '';
        this.selectedUpcoming = null;

        this.dateTabEnabled = false;
        this.programTabEnabled = false;

        this.filterDatesByGroup();
        this.filterProgramsByDate();

        break;
      }
      case 1: {
        // Date
        this.selectedDate = '';
        this.selectedUpcoming = null;

        this.programTabEnabled = false;

        this.filterProgramsByDate();

        break;
      }
      case 2: {
        // Programs
        this.selectedUpcoming = null;

        break;
      }
      case 3: {
        // Details
        break;
      }
    }

  }

}
