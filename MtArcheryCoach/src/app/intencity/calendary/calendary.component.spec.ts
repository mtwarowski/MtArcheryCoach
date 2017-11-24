import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendaryComponent } from './calendary.component';

describe('CalendaryComponent', () => {
  let component: CalendaryComponent;
  let fixture: ComponentFixture<CalendaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
