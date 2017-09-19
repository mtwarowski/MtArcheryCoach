import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { UserService } from "../../user.service";

import { Score } from '../scores/scores.component';
import { IShootingRoundInfo, IShootingRoundsInfo } from '../scoring.module';
import { arrowsRefUrl, bowRefUrl } from '../../app.constants';
import { Bow } from '../../equipment/bows/bows.component';
import { Arrows } from '../../equipment/arrows/arrows.component';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {


  public score: ScoreViewModel;

  public bowsObservable: FirebaseListObservable<Bow[]>;
  public allArrowsObservable: FirebaseListObservable<Arrows[]>;
  public roundsObservable: FirebaseListObservable<IShootingRoundInfo[]>;


  constructor(private userService: UserService, public af: AngularFireDatabase,
    private route: ActivatedRoute, private router: Router) {
    this.score = <ScoreViewModel>{ name: "", totalValue: 0, scoreDateFormatedText: "" };

    let userDataUrl = this.userService.getUserObjectsUrl();
    this.allArrowsObservable = this.af.list(userDataUrl + arrowsRefUrl);
    this.bowsObservable = this.af.list(userDataUrl + bowRefUrl);
    this.roundsObservable = this.af.list('/rounds/');
  }

  ngOnInit() {
  }

  save() {
    let userDataUrl = this.userService.getUserObjectsUrl();
    let scoresObservable: FirebaseListObservable<Score[]> = this.af.list(userDataUrl + '/scores');
    let key = scoresObservable.push(this.MapToScore(this.score)).key;
    this.router.navigate(['/score/' + key]);
  }
  
  MapToScore(scoreViewModel: ScoreViewModel): Score {
    let result: any = {
      name: scoreViewModel.name,
      totalValue: 0,
      scoreDateText: scoreViewModel.scoreDate.toJSON(),
      scoreDateTimeStamp: Math.floor(scoreViewModel.scoreDate.getTime() / 1000),
      scoreDateFormatedText: this.getDateFormattedText(scoreViewModel.scoreDate),
      roundsInfo: scoreViewModel.roundsInfo
    };
    result.bowName = scoreViewModel.bow ? scoreViewModel.bow.name : null;
    result.arrowsName = scoreViewModel.arrows ? scoreViewModel.arrows.name : null;
    
    result.maxValue = this.getMaxValue(scoreViewModel.roundsInfo);
    return <Score>result;
  }

  private getMaxValue(roundsInfo: IShootingRoundsInfo) : number{
    if(!roundsInfo || !roundsInfo.rounds){
      return 0;
    }

    let result = 0;
    for (var index = 0; index < roundsInfo.rounds.length; index++) {
      var x = roundsInfo.rounds[index];
      result += x.arrowsPairEnd * x.numberOfEnds;
    }

    return result;
  }
  
  private getDateFormattedText(date: Date): string{
    return "" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  }
}

export interface ScoreViewModel{
  name: string;
  scoreDate: Date;
  totalValue: number;
  scoreDateFormatedText: string;
  bow: any;
  arrows: any;
  roundsInfo: IShootingRoundsInfo;
}