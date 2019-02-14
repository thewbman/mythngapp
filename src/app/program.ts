export class Program {
	StartTime: string;
	EndTime?: string;
	Title: string;
	SubTitle?: string;
	Category?: string;
	Description?: string;
	Airdate?: string;
	Season?: number;
	Episode?: number;
	Recording?: ProgramRecording;
	Channel?: ProgramChannel;
}

export class ProgramRecording {
	RecordedId?: number;
	Status?: number;
	FileName?: string;
}

export class ProgramChannel {
	ChanId?: number;
	ChannelName?: string;
}