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
import { RecordedProgramResponse, GuideChannel } from '../classes/api-responses';
import { MessageService } from '../message.service';
import { MythDataService } from '../mythdata.service';

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
});
