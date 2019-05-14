import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as convert from 'xml-js';


import { Program } from '../program';
import { StatusRootObject } from '../statusClass';
import { MythDataService } from '../mythdata.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.less']
})
export class StatusComponent implements OnInit {

  rawStatusText: string;
  parseStatusText: string;

  statusObject: StatusRootObject;

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
    this.parseStatusText = convert.xml2json(this.rawStatusText, {compact: true, spaces: 4});
    this.statusObject = JSON.parse(convert.xml2json(this.rawStatusText, {compact: true, spaces: 4}));
  
    this.dataLoaded = true;
  }

}
