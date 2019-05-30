import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';
import { WINDOW, WINDOW_PROVIDERS } from './window.provider';
import { HttpClient, HttpHeaders, HttpClientModule, HttpHandler } from '@angular/common/http';

import { CookieService } from './cookie.service';

import { MythDataService } from './mythdata.service';

describe('MythDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BrowserModule,
      MythDataService,
      WINDOW_PROVIDERS,
      HttpClient,
      HttpClientModule,
      HttpHandler,
      CookieService
    ]
  }));

  it('should be created', () => {
    const service: MythDataService = TestBed.get(MythDataService);
    expect(service).toBeTruthy();
  });
});
