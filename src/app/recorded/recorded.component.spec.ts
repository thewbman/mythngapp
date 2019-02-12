import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordedComponent } from './recorded.component';

describe('RecordedComponent', () => {
  let component: RecordedComponent;
  let fixture: ComponentFixture<RecordedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordedComponent ]
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
