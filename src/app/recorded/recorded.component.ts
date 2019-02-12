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

  selectedRecorded: Program;
  recordeds: Program[];

  constructor(private recService: RecordedService, private mesService: MessageService) { }
  
  ngOnInit() {
	this.getRecordeds();
  }

  onSelect(myRec: Program): void {
    this.mesService.add('Selected: '+myRec.Title);
    this.selectedRecorded = myRec;
  }

  getRecordeds(): void {
	this.recService.getRecordeds().subscribe(recordeds => this.recordeds = recordeds);
  }

}
