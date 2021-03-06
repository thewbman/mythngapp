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
import { MessageService } from '../services/message.service';
import { MythDataService } from '../services/mythdata.service';

import { Pipe, PipeTransform } from '@angular/core';
import { RecstatusPipe } from '../pipes/recstatus.pipe';


import { StatusComponent } from './status.component';

describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        StatusComponent,
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
    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
