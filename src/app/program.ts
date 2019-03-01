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
