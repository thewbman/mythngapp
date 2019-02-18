import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';


import { Program } from '../program';
import { RecordedService } from '../recorded.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-recorded',
  templateUrl: './recorded.component.html',
  styleUrls: ['./recorded.component.scss']
})
export class RecordedComponent implements OnInit {

  dataLoaded: boolean;

  tabIndex: number;
  titleTabDisabled: boolean;
  recordingTabDisabled: boolean;
  detailTabDisabled: boolean;

  selectedRecGroup: string;
  selectedTitle: string;
  selectedRecorded: Program;

  recordeds: Program[];
  recGroupList: string[];
  titleList: string[];
  filteredRecordeds: Program[];

  constructor(private recService: RecordedService, private mesService: MessageService) { }

  ngOnInit() {
    this.dataLoaded = false;

    this.tabIndex = 0;
    this.titleTabDisabled = true;
    this.recordingTabDisabled = true;
    this.detailTabDisabled = true;

    this.selectedRecGroup = 'Default';

    this.getRecordeds();

  }

  getRecordeds(): void {
    // this.recService.getRecordeds().subscribe(recordeds => this.recordeds = recordeds);
    this.recService.getRecordedsUrl().subscribe(recordedResponse => {this.recordeds = recordedResponse.ProgramList.Programs; this.getRecordedsCompleted(); });
  }

  getRecordedsCompleted(): void {
    this.dataLoaded = true;
    this.filterRecGroupList();
  }

  filterRecGroupList(): void {
    this.recGroupList = [];

    if (this.recordeds != null) {
      for (const r of this.recordeds) {
        if (r.Recording != null) {
          // this.mesService.add('Adding rec group: ' + r.Recording.RecGroup.toString());
          this.recGroupList.push(r.Recording.RecGroup.toString());
        }
      }
    }

    this.recGroupList = Array.from(new Set(this.recGroupList)).sort();

    this.onSelectRecGroup(this.selectedRecGroup);

  }

  filterTitlesByRecGroup(): void {
    this.titleList = [];

    if (this.recordeds != null) {
      for (const r of this.recordeds) {
        if (r.Recording != null) {
          if (r.Recording.RecGroup === this.selectedRecGroup) {
            // this.mesService.add('Adding title: ' + r.Title);
            this.titleList.push(r.Title);
          }
        }
      }
    }

    this.titleList = Array.from(new Set(this.titleList)).sort();
  }

  filterRecordedsByTitle(): void {
    this.filteredRecordeds = [];

    for ( const r of this.recordeds ) {
      if (r.Title === this.selectedTitle) {
        if (r.Recording.RecGroup === this.selectedRecGroup) {
          this.filteredRecordeds.push(r);
        }
      }
    }
  }

  onSelectRecGroup(myRecGroup: string): void {
    this.mesService.add('Selected recGroup: ' + myRecGroup);
    this.selectedRecGroup = myRecGroup;
    this.filterTitlesByRecGroup();
    this.titleTabDisabled = false;
    this.tabIndex = 1;
  }

  onSelectTitle(myRecTitle: string): void {
    this.mesService.add('Selected title: ' + myRecTitle);
    this.selectedTitle = myRecTitle;
    this.filterRecordedsByTitle();
    this.recordingTabDisabled = false;
    this.tabIndex = 2;
  }

  onSelectRecorded(myRec: Program): void {
    this.mesService.add('Select program: ' + myRec.StartTime);
    this.selectedRecorded = myRec;
    this.detailTabDisabled = false;
    this.tabIndex = 3;
  }

  onTabChanged(tabChangeEvent: any): void {
    this.mesService.add('onTabChanged: ' + tabChangeEvent.index.toString());
    if (tabChangeEvent.index !== this.tabIndex) {
      this.tabIndex = tabChangeEvent.index;
    }

    switch (this.tabIndex) {
      case 0: {
        // RecGroup
        this.selectedRecGroup = '';
        this.selectedTitle = '';
        this.selectedRecorded = null;

        this.titleTabDisabled = true;
        this.recordingTabDisabled = true;
        this.detailTabDisabled = true;

        this.filterTitlesByRecGroup();
        this.filterRecordedsByTitle();

        break;
      }
      case 1: {
        // Title
        this.selectedTitle = '';
        this.selectedRecorded = null;

        this.recordingTabDisabled = true;
        this.detailTabDisabled = true;

        this.filterRecordedsByTitle();

        break;
      }
      case 2: {
        // Recordings
        this.selectedRecorded = null;

        this.detailTabDisabled = true;

        break;
      }
      case 3: {
        // Details
        break;
      }

    }
  }

}
