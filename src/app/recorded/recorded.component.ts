import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';


import { Program } from '../program';
import { RecordedService } from '../recorded.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-recorded',
  templateUrl: './recorded.component.html',
  styleUrls: ['./recorded.component.less']
})
export class RecordedComponent implements OnInit {

  tabIndex: number;

  selectedRecGroup: string;
  selectedTitle: string;
  selectedRecorded: Program;

  recordeds: Program[];
  recGroupList: string[];
  titleList: string[];
  filteredRecordeds: Program[];

  constructor(private recService: RecordedService, private mesService: MessageService) { }

  ngOnInit() {
    this.tabIndex = 0;
    this.selectedRecGroup = "Default";
    this.getRecordeds();
    // this.filterRecordedsByTitle();

  }

  getRecordeds(): void {
    // this.recService.getRecordeds().subscribe(recordeds => this.recordeds = recordeds);
    this.recService.getRecordedsUrl().subscribe(recordedResponse => {this.recordeds = recordedResponse.ProgramList.Programs; this.filterRecGroupList()});
  }

  filterRecGroupList(): void {
    this.recGroupList = [];

    if(this.recordeds != null)
    {
      for(const r of this.recordeds)
      {
        if(r.Recording != null){
          //this.mesService.add('Adding rec group: ' + r.Recording.RecGroup.toString());
          this.recGroupList.push(r.Recording.RecGroup.toString());
        }
      }
    }

    this.recGroupList = Array.from(new Set(this.recGroupList)).sort();

    this.onSelectRecGroup(this.selectedRecGroup);

  }

  filteTitlesByRecGroup(): void {
    this.titleList = [];

    if(this.recordeds != null)
    {
      for(const r of this.recordeds)
      {
        if(r.Recording != null) {
          if(r.Recording.RecGroup === this.selectedRecGroup){
            //this.mesService.add('Adding title: ' + r.Title);
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
        if(r.Recording.RecGroup === this.selectedRecGroup)
        {
          this.filteredRecordeds.push(r);
        }
      }
    }
  }

  onSelectRecGroup(myRecGroup: string): void {
    this.mesService.add('Selected recGroup: ' + myRecGroup);
    this.selectedRecGroup = myRecGroup;
    this.filteTitlesByRecGroup();
    this.tabIndex = 1;
  }

  onSelectTitle(myRecTitle: string): void {
    this.mesService.add('Selected title: ' + myRecTitle);
    this.selectedTitle = myRecTitle;
    this.filterRecordedsByTitle();
    this.tabIndex = 2;
  }

  onSelectRecorded(myRec: Program): void {
    this.mesService.add('Select program: ' + myRec.StartTime);
    this.selectedRecorded = myRec;
    this.tabIndex = 3;
  }



}
