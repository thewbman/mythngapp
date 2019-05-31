import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';
import { WINDOW, WINDOW_PROVIDERS } from '../window.provider';
import { HttpClient, HttpHeaders, HttpClientModule, HttpHandler } from '@angular/common/http';

import { CookieService } from '../services/cookie.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material/material.module';
import { ProgramDetailComponent } from '../program-detail/program-detail.component';

import { Component, OnInit } from '@angular/core';

import { Program } from '../classes/program';
import { RecordedProgramResponse, GuideChannel } from '../classes/api-responses';
import { MessageService } from '../services/message.service';
import { MythDataService } from '../services/mythdata.service';

import { Pipe, PipeTransform } from '@angular/core';
import { RecstatusPipe } from '../pipes/recstatus.pipe';


import { RecordedComponent } from './recorded.component';

describe('RecordedComponent', () => {
  let component: RecordedComponent;
  let fixture: ComponentFixture<RecordedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecstatusPipe,
        RecordedComponent,
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
        CookieService,
	RecstatusPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('select allTextString title', () => {
    component.onSelectTitle(component.allTextString);
    component.filterRecordedsByTitle();
    expect(component.tabIndex).toBe(2);
  });
  it('select title', () => {
    component.onSelectTitle(component.titleList[component.titleList.length - 1]);
    component.filterRecordedsByTitle();
    expect(component.tabIndex).toBe(2);
  });
  

  it('select a program', () => {
    component.onSelectRecGroup(component.recGroupList[0]);
    component.onSelectTitle(component.allTextString);
    component.onSelectRecorded(component.recordeds[0]);
    expect(component.tabIndex).toBe(3);
  });



  it('change tab 1', () => {
    //changing tabs doesnt seem to call onTabChanged event
    component.tabIndex = 1;
    expect(component.tabIndex).toBe(1);
  });
  it('call onTabChanges to 3', () => {
    component.tabIndex = 3;
    component.onTabChanged({index: 3});
    expect(component.tabIndex).toBe(3);
  });
  it('call onTabChanges to 2', () => {
    component.tabIndex = 2;
    component.onTabChanged({index: 2});
    expect(component.tabIndex).toBe(2);
  });
  it('call onTabChanges to 1', () => {
    component.tabIndex = 1;
    component.onTabChanged({index: 1});
    expect(component.tabIndex).toBe(1);
  });
  it('call onTabChanges to 0', () => {
    component.tabIndex = -1;
    component.onTabChanged({index: 0});
    expect(component.tabIndex).toBe(0);
  });
  

  
});
