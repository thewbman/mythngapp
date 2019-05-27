import { Program } from './program';

export class ProgramListClass {
      StartIndex: string;
      Count: string;
      TotalAvailable: string;
      AsOf: string;
      Version: string;
      ProtoVer: string;
      Programs: Program[];
}

export class RecordedProgramResponse {
 ProgramList: ProgramListClass;
}

export class UpcomingProgramResponse {
  ProgramList: ProgramListClass;
}

export class ConflictProgramResponse {
  ProgramList: ProgramListClass;
}

export class UpcomingDateProgramClass {
  DateString: string;
  DateDisplayString: string;
  Programs: Program[];
}



export class ProgramGuideResponse {
  // Using this for both /Guide/GetProgramList and /Guide/GetProgramGuide
  ProgramGuide?: ChannelListClass;
  ProgramList?: ProgramListClass;
}

export class ChannelListClass {
  StartTime: string;
  EndTime: string;
  Details: string;
  StartIndex: string;
  Count: string;
  TotalAvailable: string;
  AsOf: string;
  Version: string;
  ProtoVer: string;
  Channels: GuideChannel[];
}

export class GuideChannel {
  ChanId: string;
  ChanNum: string;
  CallSign: string;
  IconURL: string;
  ChannelName: string;
  Programs: Program[];
}
