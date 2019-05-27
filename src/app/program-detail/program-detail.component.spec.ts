import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';
import { WINDOW, WINDOW_PROVIDERS } from '../window.provider';
import { HttpClient, HttpHeaders, HttpClientModule, HttpHandler } from '@angular/common/http';

import { CookieService } from '../cookie.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material/material.module';

import { Component, OnInit } from '@angular/core';

import { Program } from '../classes/program';
import { MessageService } from '../message.service';
import { MythDataService } from '../mythdata.service';

import { Pipe, PipeTransform } from '@angular/core';
import { RecstatusPipe } from '../pipes/recstatus.pipe';


import { ProgramDetailComponent } from './program-detail.component';

describe('ProgramDetailComponent', () => {
  let component: ProgramDetailComponent;
  let fixture: ComponentFixture<ProgramDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ProgramDetailComponent,
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
    fixture = TestBed.createComponent(ProgramDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
