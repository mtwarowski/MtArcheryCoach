import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreRoundsComponent } from './score-rounds.component';

describe('ScoreRoundsComponent', () => {
  let component: ScoreRoundsComponent;
  let fixture: ComponentFixture<ScoreRoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreRoundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
