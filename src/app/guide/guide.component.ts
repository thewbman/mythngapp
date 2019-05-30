import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';


import { Program } from '../classes/program';
import { ProgramGuideResponse, GuideChannel } from '../classes/api-responses';
import { MythDataService } from '../services/mythdata.service';
import { MessageService } from '../services/message.service';
import { RecstatusPipe } from '../pipes/recstatus.pipe';


@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
  providers: [ RecstatusPipe]
})
export class GuideComponent implements OnInit {

  dataLoaded: boolean;

  tabIndex: number;
  guideTabEnabled: boolean;

  byTimeLayout: boolean;

  time: Date;

  selectedTimeString: string;		// note all times are UTC
  selectedChannel: GuideChannel;
  selectedChanId: string;
  selectedProgram: Program;

  guideChannels: GuideChannel[];
  guidePrograms: Program[];

  startTimeInput: string;
  endTimeInput: string;
  chanIdInput: string;

  byTimeColumns: string[];
  byChannelColumns: string[];

  constructor(private guideService: MythDataService, private mesService: MessageService, private recstatus: RecstatusPipe) { }

  ngOnInit() {
    this.dataLoaded = false;

    this.byTimeColumns = ['channelIcon', 'channel', 'program'];
    this.byChannelColumns = ['time', 'program'];


    this.tabIndex = 0;
    this.guideTabEnabled = false;
    this.byTimeLayout = true;

    this.getGuideNow();
  }

  getGuideNow(): void {
    this.guideTabEnabled = true;
    this.tabIndex = 1;

    const d = new Date();
    this.selectedTimeString = d.toISOString();
    this.selectedChanId = null;

    this.startTimeInput = this.selectedTimeString;
    this.endTimeInput = '';
    this.chanIdInput = '';

    this.getGuide(this.selectedTimeString, this.selectedTimeString, this.selectedChanId);
  }

  // Possible bug in MythTV api not taking chanid parameter
  getGuide(startTime: string, endTime: string, chanId: string): void {
    this.mesService.add('getGuide()');
    this.dataLoaded = false;

    this.guideService.getGuideUrl(startTime, endTime, chanId).subscribe(
      guideResponse => {
        if ((typeof guideResponse !== 'undefined') && ( typeof guideResponse.ProgramGuide !== 'undefined' )) {
          this.guideChannels = [];
          for (const ch of guideResponse.ProgramGuide.Channels) {
            if (ch.Programs.length > 0) {
              this.guideChannels.push(ch);
            }
          }
          this.guidePrograms = null;
          this.byTimeLayout = true;
        } else if ((typeof guideResponse !== 'undefined') && ( typeof guideResponse.ProgramList !== 'undefined' )) {
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
    this.guideTabEnabled = true;
    this.tabIndex = 1;
  }

  getChannelIconUrl(iconUrl: string) {
    return "url('"+this.guideService.getChannelIcon(iconUrl)+"')";
  }




  onClickNow(): void {
    this.getGuideNow();
  }

  onClickGo(): void {
    this.mesService.add('onClickGo');
    let d = new Date();
    let d2 = new Date();

    if (this.chanIdInput === '') {
      this.selectedChanId = null;
    } else {
      this.selectedChanId = this.chanIdInput;
    }

    if (this.startTimeInput === '') {
      // let d2 = new Date(d.getTime() + 24*60*60*1000);
      this.selectedTimeString = d.toISOString();
      this.startTimeInput = d.toISOString();
    } else {
      d = new Date(this.startTimeInput);
      this.selectedTimeString = this.startTimeInput;
    }

    if (this.endTimeInput === '') {
      if (this.chanIdInput !== '') {
        // Use 24 hours if have channel and no end time
        d2 = new Date(d.getTime() + 24 * 60 * 60 * 1000);
      } else {
        // If no channel, use same time
        d2 = new Date(d.getTime());
      }
    } else {
      d2 = new Date(this.endTimeInput);
    }


    this.getGuide(this.selectedTimeString, d2.toISOString(), this.selectedChanId);
  }

  onSelectChannel(myChan: GuideChannel): void {
    this.mesService.add('onSelectChannel');
    this.selectedChannel = myChan;
    this.selectedChanId = myChan.ChanId;
    this.selectedTimeString = null;
    this.selectedProgram = null;

    const d = new Date();
    const d2 = new Date(d.getTime() + 24 * 60 * 60 * 1000);
    this.selectedTimeString = d.toISOString();

    this.chanIdInput = this.selectedChanId;

    this.getGuide(this.selectedTimeString, d2.toISOString(), this.selectedChanId);
  }

  onSelectTime(myTime: string): void {
    this.mesService.add('onSelectTime');
    this.selectedChannel = null;
    this.selectedChanId = null;
    this.selectedProgram = null;

    const d = new Date(myTime);
    const d2 = new Date(d.getTime() + 1000);		// add 1 second so we dont get programs ending exactly on time
    this.selectedTimeString = d2.toISOString();

    this.chanIdInput = '';

    this.getGuide(this.selectedTimeString, this.selectedTimeString, this.selectedChanId);
  }

  onSelectProgram(myProg: Program, chanId: string): void {
    this.mesService.add('onSelectProgram');

    if ( typeof myProg.Channel === 'undefined' ) {
      myProg.Channel = {};
      myProg.Channel.ChanId = chanId;
    }

    this.selectedProgram = myProg;
    this.tabIndex = 2;
  }


  onTabChanged(tabChangeEvent: any): void {
    this.mesService.add('onTabChanged: ' + tabChangeEvent.index.toString());
    if (tabChangeEvent.index !== this.tabIndex) {
      this.tabIndex = tabChangeEvent.index;
    }

    switch (this.tabIndex) {
      case 0: {
        // Inputs
        this.selectedProgram = null;

        this.guidePrograms = null;
        this.guideChannels = null;

        this.guideTabEnabled = false;

        break;
      }
      case 1: {
        // Guide
        this.selectedProgram = null;

        break;
      }
      case 2: {
        // Details
        break;
      }

    }
  }

}
