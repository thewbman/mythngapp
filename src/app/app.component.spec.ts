import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { MaterialModule } from './material/material.module';
import { CookieService } from './services/cookie.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MessagesComponent } from './messages/messages.component';


describe('AppComponent', () => {
  let cookieServiceMock: jasmine.SpyObj<CookieService>;
  let fixture: ComponentFixture<AppComponent>;
    
  beforeEach(async(() => {
    cookieServiceMock = jasmine.createSpyObj<CookieService>('CookieService', ['set', 'get', 'setWithExpiryInYears', 'check' ]);
    cookieServiceMock.check.and.returnValue(true);
	
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
	MaterialModule,
	BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,
	MessagesComponent
      ]
    });

    fixture = TestBed.overrideComponent(AppComponent, {
      set: { 
        providers: [{
          provide: CookieService,
          useValue: cookieServiceMock
        }]
      }
    }).createComponent(AppComponent);
    
  }));

  it('should create the app', () => {
    //const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Myth-ng App'`, () => {
    //const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Myth-ng App');
  });

  it('should render title in a header', () => {
    //const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#headerTitleSpan').textContent).toContain('Myth-ng App');
  });

  it('test cookies from app', () => {
    //fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    let key = "myKey";
    let value = "myValue";
    let dt = new Date();
    
    //app.setCookie(key,value);
    //app.cookieService.set(key, value, new Date(dt.getDate() + 1));
    //expect(app.cookieService.get(key)).toMatch(value);
    expect(app.cookieService.check('foobar')).toBe(true);
    expect(app.cookieService.check).toHaveBeenCalledWith('foobar');

    //app.cookieService.set(key, value, new Date());

    //expect(app.cookieService.get(key).toMat
  });
});
