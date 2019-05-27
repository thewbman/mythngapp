import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import * as convert from 'xml-js';


import { Program } from '../classes/program';
import { StatusRootObject } from '../classes/statusClass';
import { MythDataService } from '../mythdata.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  regexOpenBody: string;
  regexCloseBody: string;

  rawStatusText: string;
  parseStatusText: string;

  statusHtml: string;

  statusObject: StatusRootObject;

  dataLoaded: boolean;

  constructor(private dataService: MythDataService, private mesService: MessageService) { }

  ngOnInit() {
    this.dataLoaded = false;
    this.regexCloseBody = '#[\s\n]*</body>[\s\n]*</html>[\s\n]*$#s';
    this.regexOpenBody = '/.*<//head>/';

    this.getStatus();
  }

  getStatus(): void {
    this.dataService.getStatusUrl().subscribe(resp => {
      if( typeof resp !== 'undefined') {
        this.rawStatusText = resp; this.getStatusCompleted(); 
      }
    });  
  }

  getStatusCompleted(): void {
    this.parseStatusText = convert.xml2json(this.rawStatusText, {compact: true, spaces: 4});
    this.statusObject = JSON.parse(convert.xml2json(this.rawStatusText, {compact: true, spaces: 4}));

    this.dataLoaded = true;
  }

}
