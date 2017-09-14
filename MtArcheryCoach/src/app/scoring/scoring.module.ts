import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdNativeDateModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MaterialModule, MdDatepickerModule } from '@angular/material';
import { ScoreDeleteConfirmDialog, ScoresComponent } from './scores/scores.component';
//import { ScoreComponent } from './scores/scores.component';
import { ScoringRoutingModule } from "./scoring-routing.module";

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
  declarations: [ScoresComponent, ScoreDeleteConfirmDialog],//, ScoreComponent],
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




export interface I {

}

export interface IShootingRoundDef {
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