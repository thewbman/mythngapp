import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';


import { Program } from '../classes/program';
import { MythDataService } from '../services/mythdata.service';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-recorded',
  templateUrl: './recorded.component.html',
  styleUrls: ['./recorded.component.scss']
})
export class RecordedComponent implements OnInit {

  allTextString: string;

  dataLoaded: boolean;

  tabIndex: number;
  titleTabEnabled: boolean;
  recordingTabEnabled: boolean;

  selectedRecGroup: string;
  selectedTitle: string;
  selectedRecorded: Program;

  recordeds: Program[];
  recGroupList: string[];
  titleList: string[];
  filteredRecordeds: Program[];

  constructor(private recService: MythDataService, private mesService: MessageService) { }

  ngOnInit() {
    this.dataLoaded = false;

    this.tabIndex = 0;
    this.titleTabEnabled = false;
    this.recordingTabEnabled = false;

    this.selectedRecGroup = 'Default';

    this.getRecordeds();

    this.allTextString = '-- All --';

  }

  getRecordeds(): void {
    // this.recService.getRecordeds().subscribe(recordeds => this.recordeds = recordeds);
    this.recService.getRecordedsUrl().subscribe(recordedResponse => {
      if ( typeof recordedResponse !== 'undefined') {
        this.recordeds = recordedResponse.ProgramList.Programs; this.getRecordedsCompleted();
      }
    });
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
          //this.mesService.add('Adding rec group: ' + r.Recording.RecGroup.toString());
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
    this.titleList.unshift(this.allTextString);
  }

  filterRecordedsByTitle(): void {
    this.filteredRecordeds = [];

    this.mesService.add('starting filterRecordedByTitle');

    for ( const r of this.recordeds ) {
      if ((r.Title === this.selectedTitle) || (this.allTextString === this.selectedTitle)) {
        if (r.Recording.RecGroup === this.selectedRecGroup) {
          if (r.smallPreviewImageUrl == null) {
            r.smallPreviewImageUrl = this.recService.getPreviewImageUrlWidth(r, 150);
          }
          if (r.showImage == null) {
            r.showImage = true;
          }

          this.filteredRecordeds.push(r);
        }
      }
    }

    this.mesService.add('finished list of programs');

    // this.filteredRecordeds = Array.from(new Set(this.filteredRecordeds));
    // this.mesService.add('Array.from complete')

    if (this.allTextString === this.selectedTitle) {
      // this.filteredRecordeds.sort((val1, val2)=> { return +new Date(val2.StartTime) - +new Date(val1.StartTime)});
      this.filteredRecordeds.sort((val1, val2) => ((val2.StartTime < val1.StartTime) ? -1 : 0));
    } else {
      this.filteredRecordeds.sort((val1, val2) => ((val2.Airdate < val1.Airdate) ? 1 : 0));
    }

    this.mesService.add('sorting done');
  }

  onSelectRecGroup(myRecGroup: string): void {
    this.mesService.add('Selected recGroup: ' + myRecGroup);
    this.selectedRecGroup = myRecGroup;
    this.titleTabEnabled = true;
    this.selectedTitle = '';
    this.tabIndex = 1;
    this.filterTitlesByRecGroup();
  }

  onSelectTitle(myRecTitle: string): void {
    this.mesService.add('Selected title: ' + myRecTitle);
    this.selectedTitle = myRecTitle;
    // this.filterRecordedsByTitle();
    this.recordingTabEnabled = true;
    this.tabIndex = 2;
  }

  onSelectRecorded(myRec: Program): void {
    this.mesService.add('Select program: ' + myRec.StartTime);
    this.selectedRecorded = myRec;
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

        this.titleTabEnabled = false;
        this.recordingTabEnabled = false;

        // this.filterTitlesByRecGroup();
        // this.filterRecordedsByTitle();

        break;
      }
      case 1: {
        // Title
        this.selectedTitle = '';
        this.selectedRecorded = null;

        this.recordingTabEnabled = false;

        this.filterTitlesByRecGroup();

        // this.filterRecordedsByTitle();

        break;
      }
      case 2: {
        // Recordings
        this.selectedRecorded = null;

        this.filterRecordedsByTitle();

        break;
      }
      case 3: {
        // Details
        break;
      }

    }
  }

}
