import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { MaterialModule } from './material/material.module';
import { CookieService } from './services/cookie.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MessagesComponent } from './messages/messages.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
	MaterialModule,
	BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,
	MessagesComponent
      ],
      providers: [
        CookieService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Myth-ng App'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Myth-ng App');
  });

  it('should render title in a header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#headerTitleSpan').textContent).toContain('Myth-ng App');
  });
});
