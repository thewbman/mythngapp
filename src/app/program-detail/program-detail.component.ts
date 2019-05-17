import { Component, OnInit, Input, Injectable, Inject } from '@angular/core';
import { Program } from '../classes/program';
import { MythDataService } from '../mythdata.service';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.scss']
})
export class ProgramDetailComponent implements OnInit {
  imageUrl: string;

  @Input() program: Program;

  constructor(private dataService: MythDataService) {  }

  ngOnInit() {
    if (this.program.showImage) {
      this.imageUrl = this.dataService.getPreviewImageUrlWidth(this.program, 400);
    }
  }

}
