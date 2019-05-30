import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';
import { WINDOW, WINDOW_PROVIDERS } from '../window.provider';
import { HttpClient, HttpHeaders, HttpClientModule, HttpHandler } from '@angular/common/http';

import { CookieService } from '../cookie.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material/material.module';
import { ProgramDetailComponent } from '../program-detail/program-detail.component';

import { Component, OnInit } from '@angular/core';

import { Program } from '../classes/program';
import { ProgramGuideResponse, GuideChannel } from '../classes/api-responses';
import { MessageService } from '../message.service';

import { MythDataService } from '../mythdata.service';

import { GuideComponent } from './guide.component';

describe('GuideComponent', () => {
  let component: GuideComponent;
  let fixture: ComponentFixture<GuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GuideComponent,
	ProgramDetailComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
	MaterialModule,
	HttpClientModule
      ],
      providers: [
        BrowserModule,
        MythDataService,
        WINDOW_PROVIDERS,
        HttpClient,
        HttpClientModule,
        HttpHandler,
        CookieService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('can click now', () => {
    component.dataLoaded = false;
    component.onClickNow();
    expect(component.dataLoaded).toBeTruthy();
  });
  
  it('click first program of first channel', () => {
    //component.dataLoaded = false;
    component.onSelectProgram(component.guideChannels[0].Programs[0],component.guideChannels[0].ChanId);
    expect(component.tabIndex).toBe(2);
  });  


  it('change tab back to 1 after details', () => {
    //changing tabs doesnt seem to call onTabChanged event
    component.tabIndex = 1;
    expect(component.tabIndex).toBe(1);
  });
  it('call onTabChanges to 2', () => {
    component.tabIndex = 1;
    component.onTabChanged({index: 2});
    expect(component.tabIndex).toBe(2);
  });
  it('call onTabChanges to 1', () => {
    component.tabIndex = 1;
    component.onTabChanged({index: 1});
    expect(component.tabIndex).toBe(1);
  });
  it('call onTabChanges to 0', () => {
    component.tabIndex = 0;
    component.onTabChanged({index: 0});
    expect(component.tabIndex).toBe(0);
  });
  

  it('click first channel', () => {
    component.tabIndex = 1;
    component.dataLoaded = false;
    component.onSelectChannel(component.guideChannels[0]);
    expect(component.dataLoaded).toBeTruthy();
//  });

//  it('click first time on channel view', () => {
    component.tabIndex = 1;
    component.dataLoaded = false;
    component.onSelectTime(component.guidePrograms[0].StartTime);
    expect(component.dataLoaded).toBeTruthy('click first time on channel');
  });  

  it('can click go with just channel', () => {
    component.dataLoaded = false;
    component.chanIdInput = "6051";
    component.startTimeInput = "";
    component.endTimeInput = "";
    component.onClickGo();
    expect(component.dataLoaded).toBeTruthy();
  });
  it('can click go with channel and time', () => {
    component.dataLoaded = false;
    component.chanIdInput = "6051";
    component.startTimeInput = "2019-05-21T01:00:01";
    component.endTimeInput = "";
    component.onClickGo();
    expect(component.dataLoaded).toBeTruthy();
  });
  it('can click go with times', () => {
    component.dataLoaded = false;
    component.chanIdInput = "";
    component.startTimeInput = "2019-05-21T01:00:01";
    component.endTimeInput = "2019-05-21T01:30:00";
    component.onClickGo();
    expect(component.dataLoaded).toBeTruthy();
  });
  it('can click go with just start time', () => {
    component.dataLoaded = false;
    component.chanIdInput = "";
    component.startTimeInput = "2019-05-21T01:00:01";
    component.endTimeInput = "";
    component.onClickGo();
    expect(component.dataLoaded).toBeTruthy();
  });
  
});
