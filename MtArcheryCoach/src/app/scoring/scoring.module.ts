import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdNativeDateModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MaterialModule, MdDatepickerModule } from '@angular/material';
import { ScoreDeleteConfirmDialog, ScoresComponent } from './scores/scores.component';

import { ScoringRoutingModule } from "./scoring-routing.module";
import { ScoreComponent } from './score/score.component';
import { ScoreRoundsComponent } from './score-rounds/score-rounds.component';

@NgModule({
  imports: [
    CommonModule,
    ScoringRoutingModule,
    MdNativeDateModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdDatepickerModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [ScoresComponent, ScoreDeleteConfirmDialog, ScoreComponent, ScoreRoundsComponent],
  exports: [
    MdNativeDateModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdDatepickerModule,
    MdIconModule,
    FormsModule
  ],
  entryComponents: [ScoreDeleteConfirmDialog],
})
export class ScoringModule { }




export interface IShootingRoundsInfo {
  name: string;
  rounds: IShootingRoundInfo[];
}



export interface IShootingRoundInfo {
  arrowsPairEnd: number;
  numberOfEnds: number;
  
  distance: number;
  distinctSimbol: string;

  target: ITarget;
}

export interface ITarget{
  size: number;
  targetFields: ITargetField[];

  imageUrl: string;
}

export interface ITargetField{
  r: number;
  cx: number;
  cy: number;
  stroke: string;
  fill: string;
  strokeWidth: string;

  point: number;
  displayPoint: string;
}