import { TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';
import { WINDOW, WINDOW_PROVIDERS } from '../window.provider';
import { HttpClient, HttpHeaders, HttpClientModule, HttpHandler } from '@angular/common/http';

import { CookieService } from './cookie.service';

import { MythDataService } from './mythdata.service';

import { MOCK_PROGRAMDETAILS_RESPONSE } from '../classes/mock-data';


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

  it('should be created with defaults', () => {
    const service: MythDataService = TestBed.get(MythDataService);
    expect(service).toBeTruthy();

    expect(service.getConflictsUrl()).toBeTruthy('Conflicts');
    expect(service.getRecordedsUrl()).toBeTruthy('Recordeds');
    expect(service.getUpcomingUrl()).toBeTruthy('Upcoming');
    expect(service.getGuideUrl('2019-05-21T00:00:00Z','2019-05-21T00:00:00','6051')).toBeTruthy('Guide');
    expect(service.getGuideUrl('2019-05-21T00:00:00Z','2019-05-21T00:00:00',null)).toBeTruthy('Guide');
    expect(service.getProgramDetailsUrl('6051','2019-05-21T00:00:00Z')).toBeTruthy('Program details');
    expect(service.getStatusUrl()).toBeTruthy('Status');
    
    expect(service.getPreviewImageUrlWidth(MOCK_PROGRAMDETAILS_RESPONSE.Program, 300)).toBeTruthy('Preview image width');
    expect(service.getPreviewImageUrlHeight(MOCK_PROGRAMDETAILS_RESPONSE.Program, 300)).toBeTruthy('Preview image height');
    
  });

  it('set baseUrlOverride', () => {
    const service: MythDataService = TestBed.get(MythDataService);
    service.baseUrlOverride = '/assets/mock';

    expect(service.getConflictsUrl()).toBeTruthy('Conflicts');
    expect(service.getRecordedsUrl()).toBeTruthy('Recordeds');
    expect(service.getUpcomingUrl()).toBeTruthy('Upcoming');
    expect(service.getGuideUrl('2019-05-21T00:00:00Z','2019-05-21T00:00:00','6051')).toBeTruthy('Guide');
    expect(service.getGuideUrl('2019-05-21T00:00:00Z','2019-05-21T00:00:00',null)).toBeTruthy('Guide');
    expect(service.getProgramDetailsUrl('6051','2019-05-21T00:00:00Z')).toBeTruthy('Program details');
    expect(service.getStatusUrl()).toBeTruthy('Status');

    expect(service.getPreviewImageUrlWidth(MOCK_PROGRAMDETAILS_RESPONSE.Program, 300)).toBeTruthy('Preview image width');
    expect(service.getPreviewImageUrlHeight(MOCK_PROGRAMDETAILS_RESPONSE.Program, 300)).toBeTruthy('Preview image height');
    
  });
});
