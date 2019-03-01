import { Component, OnInit, Input, Injectable, Inject } from '@angular/core';
import { Program } from '../program';
import { WINDOW } from '../window.provider';

@Component({
  selector: 'app-recorded-detail',
  templateUrl: './recorded-detail.component.html',
  styleUrls: ['./recorded-detail.component.scss']
})
export class RecordedDetailComponent implements OnInit {
  imageUrl: string;

  @Input() recorded: Program;

  constructor(@Inject(WINDOW) private window: Window) {  }

  ngOnInit() {
    this.imageUrl = 'http://' + this.window.location.hostname + ':8580/api/api.php?Host=localhost&Port=6544&Url=/Content/GetPreviewImage&ChanId='+this.recorded.Channel.ChanId+'&StartTime='+this.recorded.Recording.StartTs+'&Height=200';
  }

}
