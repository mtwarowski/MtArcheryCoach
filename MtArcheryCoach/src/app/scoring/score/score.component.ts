import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { UserService } from "../../user.service";

import { Score, IScoreInfo, IPoint } from '../scores/scores.component';
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
      roundsInfo: scoreViewModel.roundsInfo,
    };
    result.bowName = scoreViewModel.bow ? scoreViewModel.bow.name : null;
    result.arrowsName = scoreViewModel.arrows ? scoreViewModel.arrows.name : null;
    result.arrowsDiameterInMm = scoreViewModel.arrows ? scoreViewModel.arrows.diameterInMm : null;
    
    result.maxValue = this.getMaxValue(scoreViewModel.roundsInfo);

    result.scoresInfo = this.getEmptyScoresInfo(scoreViewModel.roundsInfo, result.arrowsDiameterInMm);

    return <Score>result;
  }  
  
  private getEmptyScoresInfo(roundsInfo: IShootingRoundsInfo, arrowDimention: number): IScoreInfo[] {
    let result = [];
    
    if(!roundsInfo || !roundsInfo.rounds){
      return result;
    }
    

    for (var index = 0; index < roundsInfo.rounds.length; index++) {
      let scoreInfo = <IScoreInfo>{ 
         roundName: roundsInfo.rounds[index].distanceValue + roundsInfo.rounds[index].distanceSymbol,
         endsPoints: [] 
      };

      for (var endIndex = 0; endIndex < roundsInfo.rounds[index].numberOfEnds; endIndex++) {
        let arrayOfPoints : IPoint[] = [];
        for (var arrowIndex = 0; arrowIndex < roundsInfo.rounds[index].arrowsPairEnd; arrowIndex++) {
          let scoreZone = roundsInfo.rounds[index].target.targetFields[0];

          let newPoint = <IPoint>{    
            r: arrowDimention,

            value: scoreZone.point,
            displayValue: scoreZone.displayPoint
          };

          if(scoreZone){
            newPoint.cx = scoreZone.cx;
            newPoint.cy = scoreZone.cy;
            newPoint.stroke = scoreZone.stroke;
            newPoint.fill = scoreZone.fill;
            newPoint.strokeWidth = scoreZone.strokeWidth;
          }

          arrayOfPoints.push();
        }

        scoreInfo.endsPoints.push(arrayOfPoints);
      }

      result.push(scoreInfo);
    }

    return result;
  }


  private getMaxValue(roundsInfo: IShootingRoundsInfo) : number{
    if(!roundsInfo || !roundsInfo.rounds){
      return 0;
    }

    let result = 0;
    for (var index = 0; index < roundsInfo.rounds.length; index++) {
      let x = roundsInfo.rounds[index];

      let maxPointValue = x.target.targetFields.reduce((a, b) => {
          return a.point > b.point ? a : b;
      });

      result += x.arrowsPairEnd * x.numberOfEnds * maxPointValue.point;
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
  arrows: Arrows;
  roundsInfo: IShootingRoundsInfo;
}