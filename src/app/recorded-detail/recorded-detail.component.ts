import { Component, OnInit, Input } from '@angular/core';
import { Program } from '../program';

@Component({
  selector: 'app-recorded-detail',
  templateUrl: './recorded-detail.component.html',
  styleUrls: ['./recorded-detail.component.less']
})
export class RecordedDetailComponent implements OnInit {

  @Input() recorded: Program;

  constructor() { }

  ngOnInit() {
  }

}
