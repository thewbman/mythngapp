import { Component, OnInit, Input, Injectable, Inject } from '@angular/core';
import { Program } from '../program';
import { MythDataService } from '../mythdata.service';

@Component({
  selector: 'app-recorded-detail',
  templateUrl: './recorded-detail.component.html',
  styleUrls: ['./recorded-detail.component.scss']
})
export class RecordedDetailComponent implements OnInit {
  imageUrl: string;

  @Input() recorded: Program;

  constructor(private dataService: MythDataService) {  }

  ngOnInit() {
    this.imageUrl = this.dataService.getPreviewImageUrlHeight(this.recorded,200);
  }

}
