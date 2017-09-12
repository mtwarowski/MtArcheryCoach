import { distinct } from 'rxjs/operator/distinct';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
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