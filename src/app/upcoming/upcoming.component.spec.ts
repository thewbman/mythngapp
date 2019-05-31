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
import { UpcomingProgramResponse, GuideChannel } from '../classes/api-responses';
import { MessageService } from '../services/message.service';
import { MythDataService } from '../services/mythdata.service';

import { Pipe, PipeTransform } from '@angular/core';
import { RecstatusPipe } from '../pipes/recstatus.pipe';



import { UpcomingComponent } from './upcoming.component';

describe('UpcomingComponent', () => {
  let component: UpcomingComponent;
  let fixture: ComponentFixture<UpcomingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecstatusPipe,
        UpcomingComponent,
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
    fixture = TestBed.createComponent(UpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('select group All', () => {
    component.onSelectGroup("All");
    expect(component.tabIndex).toBe(1);
  });
  it('select group Conflicting', () => {
    component.onSelectGroup("Conflicting");
    expect(component.tabIndex).toBe(1);
  });
  it('select group Overrides', () => {
    component.onSelectGroup("Overrides");
    expect(component.tabIndex).toBe(1);
  });
  it('select group Upcoming', () => {
    component.onSelectGroup("Upcoming");
    expect(component.tabIndex).toBe(1);
  });

  it('select date allDatesString', () => {
    component.onSelectDate(component.allDatesString);
    expect(component.tabIndex).toBe(2);
  });
  it('select date last date', () => {
    component.onSelectDate(component.dateList[component.dateList.length-1]);
    expect(component.tabIndex).toBe(2);
  });  


  it('select a program', () => {
    component.onSelectGroup("All");
    component.onSelectDate(component.allDatesString);
    component.onSelectProgram(component.allPrograms[0]);
    expect(component.tabIndex).toBe(3);
  });
});
