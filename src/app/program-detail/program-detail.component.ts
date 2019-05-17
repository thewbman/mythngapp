import { Component, OnInit, Input, Injectable, Inject } from '@angular/core';
import { Program } from '../classes/program';
import { MythDataService } from '../mythdata.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.scss']
})
export class ProgramDetailComponent implements OnInit {

  dataLoaded: boolean;

  imageUrl: string;

  @Input() program: Program;

  constructor(private dataService: MythDataService, private mesService: MessageService) {  }

  ngOnInit() {
    this.dataLoaded = false;
    
    if (this.program.showImage) {
      this.imageUrl = this.dataService.getPreviewImageUrlWidth(this.program, 400);
    }

    this.getProgramDetails();
  }

  getProgramDetails(): void {
    this.dataService.getProgramDetailsUrl(this.program.Channel.ChanId,this.program.StartTime).subscribe(response => {this.program = response.Program; this.getProgramDetailsCompleted(); });
  }

  getProgramDetailsCompleted(): void {
    this.dataLoaded = true;
  }

}
