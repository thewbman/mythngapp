import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';


import { Program } from '../classes/program';
import { GuideChannel } from '../classes/recordedProgramResponse';
import { MythDataService } from '../mythdata.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {

  dataLoaded: boolean;

  byTimeLayout: boolean;

  time: Date;

  selectedTimeString: string;		//note all times are UTC
  selectedChannel: GuideChannel;
  selectedChanId: string;
  selectedProgram: Program;

  guideChannels: GuideChannel[];
  guidePrograms: Program[];

  constructor(private guideService: MythDataService, private mesService: MessageService) { }

  ngOnInit() {
    this.dataLoaded = false;
    this.byTimeLayout = true;
    
    let d = new Date();
    this.selectedTimeString = d.toISOString();
    this.selectedChanId = null;
    
    this.getGuide(this.selectedTimeString, this.selectedTimeString, this.selectedChanId);
  }

  //Possible bug in MythTV api not taking chanid parameter
  getGuide(startTime: string, endTime: string, chanId: string): void {
    this.mesService.add("getGuide()");
    this.guideService.getGuideUrl(startTime, endTime, chanId).subscribe(
      guideResponse => {
        if( typeof guideResponse.ProgramGuide != "undefined" ) {
          this.guideChannels = guideResponse.ProgramGuide.Channels;
	  this.guidePrograms = null;
	  this.byTimeLayout = true;
	}
	if( typeof guideResponse.ProgramList != "undefined" ) {
	  this.guideChannels = null;
          this.guidePrograms = guideResponse.ProgramList.Programs;
	  this.byTimeLayout = false;
	}
        this.getGuideCompleted(); 
      }
    );
  }

  getGuideCompleted(): void {
    this.dataLoaded = true;
  }






  onSelectChannel(myChan: GuideChannel): void {
    this.mesService.add("onSelectChannel");
    this.selectedChannel = myChan;
    this.selectedChanId = myChan.ChanId;
    this.selectedTimeString = null;

    let d = new Date();
    let d2 = new Date(d.getTime() + 24*60*60*1000);
    this.selectedTimeString = d.toISOString();
    
    this.getGuide(this.selectedTimeString,d2.toISOString(),this.selectedChanId);
  }

  onSelectTime(myTime: string): void {
    this.mesService.add("onSelectTime");
    this.selectedChannel = null;
    this.selectedChanId = null;

    let d = new Date(myTime);
    let d2 = new Date(d.getTime() + 1000);		//add 1 second so we dont get programs ending exactly on time
    this.selectedTimeString = d2.toISOString();

    this.getGuide(this.selectedTimeString,this.selectedTimeString,this.selectedChanId);
  }

  onSelectProgram(myProg: Program, chanId: string): void {
    this.mesService.add("onSelectProgram");
    this.mesService.add("typeof myProg.Channel: "+typeof myProg.Channel);

    if( typeof myProg.Channel === "undefined" ) {
      myProg.Channel = {};
      myProg.Channel.ChanId = chanId;
    }

    this.mesService.add("typeof myProg.Channel: "+typeof myProg.Channel);
    
    this.selectedProgram = myProg;
  }


}
