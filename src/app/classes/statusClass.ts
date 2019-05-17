// Generated from https://www.jsonutils.com/

export class Attributes {
    version: string;
    encoding: string;
}

export class Declaration {
    _attributes: Attributes;
}

export class EncoderAttributes {
    sleepstatus: string;
    id: string;
    state: string;
    connected: string;
    devlabel: string;
    hostname: string;
    local: string;
}

export class Encoder {
    _attributes: EncoderAttributes;
}

export class Encoders {
    _attributes: any;
    Encoder: Encoder[];
}

export class Channel {
    _attributes: any;
}

export class Recording {
    _attributes: any;
}

export class StatusProgram {
    _attributes: any;
    Channel: Channel;
    Recording: Recording;
    _text: string;
}

export class Scheduled {
    _attributes: any;
    Program: StatusProgram[];
}

export class Frontends {
}

export class Backends {
    _attributes: any;
}

export class Program {
    _attributes: any;
    Channel: any;
    Recording: any;
    _text: string;
}

export class Job {
    _attributes: any;
    _text: string;
    Program: Program;
}

export class JobQueue {
    _attributes: any;
    Job: Job[];
}

export class Group {
    _attributes: any;
}

export class Storage {
    Group: Group[];
}

export class Load {
    _attributes: any;
}

export class Guide {
    _attributes: any;
    _text: string;
}

export class MachineInfo {
    Storage: Storage;
    Load: Load;
    Guide: Guide;
}

export class Status {
    _attributes: any;
    Encoders: Encoders;
    Scheduled: Scheduled;
    Frontends: Frontends;
    Backends: Backends;
    JobQueue: JobQueue;
    MachineInfo: MachineInfo;
}

export class StatusRootObject {
    _declaration: Declaration;
    _doctype: string;
    Status: Status;
}

export enum CardTVStateEnum {
    kState_Error = -1,
    kState_None = 0,
    kState_WatchingLiveTV = 1,
    kState_WatchingPreRecorded = 2,
    kState_WatchingVideo = 3,
    kState_WatchingDVD = 4,
    kState_WatchingBD = 5,
    kState_WatchingRecording = 6,
    kState_RecordingOnly = 7,
    kState_ChangingState = 8
}
