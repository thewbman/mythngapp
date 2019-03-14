export class Program {
  StartTime: string;
  EndTime?: string;
  Title: string;
  SubTitle?: string;
  Category?: string;
  Description?: string;
  Airdate?: string;
  Season?: string;
  Episode?: string;
  Recording?: ProgramRecording;
  Channel?: ProgramChannel;
  [key: string]: any;

  showImage: bool;
  show: bool;

  smallPreviewImageUrl?: string;
}

export class ProgramRecording {
  RecordedId?: string;
  Status?: string;
  FileName?: string;
  RecGroup?: string;
  StartTs?: string;
  [key: string]: any;
}

export class ProgramChannel {
  ChanId?: string;
  ChannelName?: string;
  [key: string]: any;
}

export enum RecStatusEnum {
TunerBusy = -8,
LowDiskSpace = -7,
Cancelled = -6,
Deleted = -5,
Aborted = -4,
Recorded = -3,
Recording = -2,
WillRecord = -1,
Unknown = 0,
DontRecord = 1,
PreviousRecording = 2,
CurrentRecording = 3,
EarlierShowing = 4,
TooManyRecordings = 5,
NotListed = 6,
Conflict = 7,
LaterShowing = 8,
Repeat = 9,
Inactive = 10,
NeverRecord = 11
}
