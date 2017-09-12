import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BowComponent } from './bow.component';

describe('BowComponent', () => {
  let component: BowComponent;
  let fixture: ComponentFixture<BowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
