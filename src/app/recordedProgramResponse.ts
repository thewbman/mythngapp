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