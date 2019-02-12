import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordedDetailComponent } from './recorded-detail.component';

describe('RecordedDetailComponent', () => {
  let component: RecordedDetailComponent;
  let fixture: ComponentFixture<RecordedDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordedDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
