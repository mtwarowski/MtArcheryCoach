import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BowsComponent } from './bows.component';

describe('BowsComponent', () => {
  let component: BowsComponent;
  let fixture: ComponentFixture<BowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
