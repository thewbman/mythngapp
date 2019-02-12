import { TestBed } from '@angular/core/testing';

import { RecordedService } from './recorded.service';

describe('RecordedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordedService = TestBed.get(RecordedService);
    expect(service).toBeTruthy();
  });
});
