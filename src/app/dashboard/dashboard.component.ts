import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { Program } from '../classes/program';
import { MythDataService } from '../mythdata.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataLoaded: boolean;

  conflicts: Program[];
  conflictCount: number;

  constructor(private conflictService: MythDataService, private mesService: MessageService) { }

  ngOnInit() {
    this.dataLoaded = false;
    this.conflictCount = 0;

    this.getConflicts();
  }

  getConflicts(): void {
    this.conflictService.getConflictsUrl().subscribe(conflictResponse => {this.conflicts = conflictResponse.ProgramList.Programs; this.getConflictsCompleted(); });
  }

  getConflictsCompleted(): void {
    this.conflictCount = this.conflicts.length;
    this.dataLoaded = true;
  }

}
