import { TestBed } from '@angular/core/testing';

import { CookieService } from './cookie.service';

describe('CookieService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CookieService
    ]
  }));

  it('should be created', () => {
    const service: CookieService = TestBed.get(CookieService);
    expect(service).toBeTruthy();
  });

  //note cookie testing is better done in app.component
});