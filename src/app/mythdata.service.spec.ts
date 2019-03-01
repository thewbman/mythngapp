import { TestBed } from '@angular/core/testing';

import { MythDataService } from './mythdata.service';

describe('MythDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MythDataService = TestBed.get(MythDataService);
    expect(service).toBeTruthy();
  });
});
