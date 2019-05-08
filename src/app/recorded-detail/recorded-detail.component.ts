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
    if (this.recorded.showImage) {
      this.imageUrl = this.dataService.getPreviewImageUrlWidth(this.recorded, 400);
    }
  }

}
