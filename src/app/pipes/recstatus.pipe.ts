import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recstatus'
})
export class RecstatusPipe implements PipeTransform {

  transform(value: any ): string {
// https://github.com/MythTV/mythweb/blob/master/modules/tv/includes/programs.php

    if (value !== undefined && value !== null) {
      switch (value) {
case '-8': return 'Tuner Busy';
case '-7': return 'Low Disk Space';
case '-6': return 'Cancelled';
case '-5': return 'Deleted';
case '-4': return 'Aborted';
case '-3': return 'Recorded';
case '-2': return 'Recording';
case '-1': return 'Will Record';
case '0': return 'N/A';
case '1': return 'Dont Record';
case '2': return 'Previous Recording';
case '3': return 'Current Recording';
case '4': return 'Earlier Showing';
case '5': return 'Too Many Recordings';
case '6': return 'Not Listed';
case '7': return 'Conflict';
case '8': return 'Later Showing';
case '9': return 'Repeat';
case '10': return 'Inactive';
case '11': return 'Never Record';

default: return 'Unknown status: ' + value.toString();
      }
    } else {
      return null;
    }
  }

}
