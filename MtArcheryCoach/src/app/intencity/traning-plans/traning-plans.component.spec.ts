import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraningPlansComponent } from './traning-plans.component';

describe('TraningPlansComponent', () => {
  let component: TraningPlansComponent;
  let fixture: ComponentFixture<TraningPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraningPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraningPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
