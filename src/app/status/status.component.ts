import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';


import { Program } from '../program';
import { MythDataService } from '../mythdata.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less']
})
export class StatusComponent implements OnInit {

  rawStatusText: string;

  dataLoaded: boolean;

  constructor(private dataService: MythDataService, private mesService: MessageService) { }

  ngOnInit() {
    this.dataLoaded = false;

    this.getStatus();
  }

  getStatus(): void {
    this.dataService.getStatusUrl().subscribe(resp => {this.rawStatusText = resp; this.getStatusCompleted(); });
  }

  getStatusCompleted(): void {
    this.dataLoaded = true;
  }

}
