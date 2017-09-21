import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreRoundsEditComponent } from './score-rounds-edit.component';

describe('ScoreRoundsEditComponent', () => {
  let component: ScoreRoundsEditComponent;
  let fixture: ComponentFixture<ScoreRoundsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreRoundsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreRoundsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
