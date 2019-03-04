import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recstatus'
})
export class RecstatusPipe implements PipeTransform {

  transform(value: any ): string {
// https://github.com/MythTV/mythweb/blob/master/modules/tv/includes/programs.php

    if (value !== undefined && value !== null) {
      switch (value) {
case '-8': return 'TunerBusy';
case '-7': return 'LowDiskSpace';
case '-6': return 'Cancelled';
case '-5': return 'Deleted';
case '-4': return 'Aborted';
case '-3': return 'Recorded';
case '-2': return 'Recording';
case '-1': return 'WillRecord';
case '0': return 'Unknown';
case '1': return 'DontRecord';
case '2': return 'PreviousRecording';
case '3': return 'CurrentRecording';
case '4': return 'EarlierShowing';
case '5': return 'TooManyRecordings';
case '6': return 'NotListed';
case '7': return 'Conflict';
case '8': return 'LaterShowing';
case '9': return 'Repeat';
case '10': return 'Inactive';
case '11': return 'NeverRecord';

default: return 'Unknown status: ' + value.toString();
      }
    } else {
      return null;
    }
  }

}
