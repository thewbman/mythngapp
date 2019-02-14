import { Program } from './program';

export class ProgramListClass {
      StartIndex: number;
      Count: number;
      TotalAvailable: number;
      AsOf: string;
      Version: string;
      ProtoVer: number;
      Programs: Program[];
}

export class RecordedProgramResponse {
	ProgramList: ProgramListClass;
}