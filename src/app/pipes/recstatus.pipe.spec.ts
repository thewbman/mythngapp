import { RecstatusPipe } from './recstatus.pipe';

describe('RecstatusPipe', () => {
  const pipe = new RecstatusPipe();
  
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('test recstatus pipe values', () => {
    expect(pipe.transform('-8')).toBe('Tuner Busy','Tuner Busy');
expect(pipe.transform('-7')).toBe('Low Disk Space','Low Disk Space');
expect(pipe.transform('-6')).toBe('Cancelled','Cancelled');
expect(pipe.transform('-5')).toBe('Deleted','Deleted');
expect(pipe.transform('-4')).toBe('Aborted','Aborted');
expect(pipe.transform('-3')).toBe('Recorded','Recorded');
expect(pipe.transform('-2')).toBe('Recording','Recording');
expect(pipe.transform('-1')).toBe('Will Record','Will Record');
expect(pipe.transform('0')).toBe('N/A','N/A');
expect(pipe.transform('1')).toBe('Dont Record','Dont Record');
expect(pipe.transform('2')).toBe('Previous Recording','Previous Recording');
expect(pipe.transform('3')).toBe('Current Recording','Current Recording');
expect(pipe.transform('4')).toBe('Earlier Showing','Earlier Showing');
expect(pipe.transform('5')).toBe('Too Many Recordings','Too Many Recordings');
expect(pipe.transform('6')).toBe('Not Listed','Not Listed');
expect(pipe.transform('7')).toBe('Conflict','Conflict');
expect(pipe.transform('8')).toBe('Later Showing','Later Showing');
expect(pipe.transform('9')).toBe('Repeat','Repeat');
expect(pipe.transform('10')).toBe('Inactive','Inactive');
expect(pipe.transform('11')).toBe('Never Record','Never Record');

expect(pipe.transform('100')).toBe('Unknown status: 100','Never Record');


expect(pipe.transform(null)).toBeNull('Null');

  });
});
