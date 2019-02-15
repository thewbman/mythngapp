import { Component, OnInit } from '@angular/core';
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
  selectedTitle: Program;
  selectedRecorded: Program;

  recordeds: Program[];
  filteredRecordeds: Program[];

  constructor(private recService: RecordedService, private mesService: MessageService) { }

  ngOnInit() {
	this.tabIndex = 0;
	this.getRecordeds();
	// this.filterRecordedsByTitle();
  }

  onSelectTitle(myRecTitle: Program): void {
    this.mesService.add('Selected title: ' + myRecTitle.Title);
    this.selectedTitle = myRecTitle;
    this.filterRecordedsByTitle();
    this.tabIndex = 1;
  }

  onSelectRecorded(myRec: Program): void {
    this.mesService.add('Select program: ' + myRec.StartTime);
    this.selectedRecorded = myRec;
    this.tabIndex = 2;
  }

  getRecordeds(): void {
	// this.recService.getRecordeds().subscribe(recordeds => this.recordeds = recordeds);
	this.recService.getRecordedsUrl().subscribe(recordedResponse => this.recordeds = recordedResponse.ProgramList.Programs);
  }

  filterRecordedsByTitle(): void {
	this.filteredRecordeds = [];

	for ( const r of this.recordeds ) {
		if (r.Title === this.selectedTitle.Title) {
		  this.filteredRecordeds.push(r);
		}
	}
  }

}
