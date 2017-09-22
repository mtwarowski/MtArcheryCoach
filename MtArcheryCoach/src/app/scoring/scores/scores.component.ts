import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MdDialogRef, MdDialog } from "@angular/material";

import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { UserService } from "../../user.service";
import { FirebaseData } from "../../core/FirebaseData";
import { IShootingRoundsInfo } from '../scoring.module';

const objectRefUrl: string = '/scores/';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

  public scores: FirebaseListObservable<Score[]>;
  constructor(private userService: UserService, public af: AngularFireDatabase, private router : Router, public dialog: MdDialog) {    
    let userDataUrl = userService.getUserObjectsUrl();
    this.scores = this.af.list(userDataUrl + objectRefUrl);
  }
  ngOnInit() {
  }

  onSelectedListItem(score: Score){
    if(!score){
      return;
    }

    var resourcePath = '/score/' + score.$key;
    this.router.navigate([resourcePath]);
  }


  deleteDialogRef: MdDialogRef<ScoreDeleteConfirmDialog>;
  onDeleteListItem(score: Score){
    if(!score){
      return;
    }
    
    this.deleteDialogRef = this.dialog.open(ScoreDeleteConfirmDialog);
    this.deleteDialogRef.componentInstance.score = score;
    this.deleteDialogRef.afterClosed().subscribe(result => {
      if(result){
        this.scores.remove(<any>score);
      }
    });
  }
}

@Component({
  selector: 'score-delete-confirm-dialog',
  template: `
<h2 md-dialog-title>Delete {{score.name}}</h2>
<md-dialog-content>Are you sure?</md-dialog-content>
<md-dialog-actions>
  <button md-button md-dialog-close>No</button>
  <!-- Can optionally provide a result for the closing dialog. -->
  <button md-button [md-dialog-close]="true">Yes</button>
</md-dialog-actions>
`
})
export class ScoreDeleteConfirmDialog {
  score: Score;
  constructor(public dialogRef: MdDialogRef<ScoreDeleteConfirmDialog>) { }
}

export interface IPoint{
  r: number;
  cx: number;
  cy: number;
  stroke: string;
  fill: string;
  strokeWidth: number;

  value: number;
  displayValue: string;
}

export interface IScoreInfo{
  roundName: string;
  endsPoints: IPoint[][];
}

export interface Score extends FirebaseData{
  name: string;
  maxValue: number;
  totalValue: number;
  scoreDateText: string;
  scoreDateTimeStamp: number;
  scoreDateFormatedText: string;
  bowName: string;
  arrowsName: string;
  scoresInfo: IScoreInfo[];
  roundsInfo: IShootingRoundsInfo;
}