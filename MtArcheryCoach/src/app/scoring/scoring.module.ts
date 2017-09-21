import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MdNativeDateModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule,
   MaterialModule, MdDatepickerModule, MdExpansionModule } from '@angular/material';
import { ScoreDeleteConfirmDialog, ScoresComponent } from './scores/scores.component';

import { ScoringRoutingModule } from "./scoring-routing.module";
import { ScoreComponent } from './score/score.component';
import { ScoreRoundsComponent } from './score-rounds/score-rounds.component';
import { ScoreRoundsEditComponent } from './score-rounds-edit/score-rounds-edit.component';

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
    FormsModule,
    MdExpansionModule,
    FlexLayoutModule
  ],
  declarations: [ScoresComponent, ScoreDeleteConfirmDialog, ScoreComponent, ScoreRoundsComponent, ScoreRoundsEditComponent],
  exports: [
    MdNativeDateModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdDatepickerModule,
    MdIconModule,
    FormsModule,
    MdExpansionModule
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
  
  distanceValue: number;
  distanceSymbol: string;
  distanceUnitName: string;

  sortOrderNo: number;

  target: ITarget;
}

export interface ITarget{
  name: string;
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