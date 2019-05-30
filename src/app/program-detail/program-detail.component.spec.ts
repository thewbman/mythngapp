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

import { MOCK_PROGRAMDETAILS_RESPONSE } from '../classes/mock-data';

import { Pipe, PipeTransform } from '@angular/core';
import { RecstatusPipe } from '../pipes/recstatus.pipe';


import { ProgramDetailComponent } from './program-detail.component';

describe('ProgramDetailComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ProgramDetailComponent,
        TestHostComponent
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
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('pass mock single program', () => {
    hostComponent.setInput(MOCK_PROGRAMDETAILS_RESPONSE.Program);
    hostFixture.detectChanges();
    expect(hostComponent).toBeTruthy();
  });




  @Component({
    selector: `host-component`,
    template: `<app-program-detail [program]="myProgram" *ngIf="myProgram"></app-program-detail>`
  })
  class TestHostComponent {
    private myProgram: Program;

    setInput(newProgram: Program) {
      this.myProgram = newProgram;
    }
  }

  
});
