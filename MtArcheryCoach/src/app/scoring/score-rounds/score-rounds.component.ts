import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { UserService } from "../../user.service";

import { ScoreViewModel } from '../score/score.component';
import { Score, IPoint } from '../scores/scores.component';
import { IShootingRoundInfo } from '../scoring.module';
import { scoresRefUrl } from '../../app.constants';

@Component({
  selector: 'app-score-rounds',
  templateUrl: './score-rounds.component.html',
  styleUrls: ['./score-rounds.component.css']
})
export class ScoreRoundsComponent implements OnInit {


  public score: Score;
  public scoreObservable: FirebaseObjectObservable<Score>;

  constructor(private userService: UserService, public af: AngularFireDatabase,
    private route: ActivatedRoute, private router: Router) {
    this.score = <Score>{ name: "", totalValue: 0, scoreDateFormatedText: "", roundsInfo: { name: "", rounds: [] } };
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit() {    
    this.route.params.subscribe(params => {
        var scoreIdFromUrl = params['uid'];
        
        if(scoreIdFromUrl){
          let userDataUrl = this.userService.getUserObjectsUrl();
          this.scoreObservable = this.af.object(userDataUrl + scoresRefUrl + scoreIdFromUrl);
          this.scoreObservable.subscribe((value: Score) => {
            this.score = value;
          });
        }
    });
  }

  getEndsForRound(roundNo: number) : any[] {
    let result = [];
    let round = this.score.roundsInfo.rounds[roundNo];
    for (var endNo = 0; endNo < round.numberOfEnds; endNo++) {
      let scoresForGivenEnd = [];

      for (var arrowNo = 0; arrowNo < round.arrowsPairEnd; arrowNo++) {
        scoresForGivenEnd.push(this.getScoreFor(roundNo, endNo, arrowNo));
      }

      result.push(scoresForGivenEnd);
    }

    return result;
  }

  getRoundName(round: IShootingRoundInfo): string{
    return round.distanceValue + round.distanceSymbol;
  }

  getScoreFor(roundNo: number, endNo: number, arrowNo: number) : IPoint {
    if(!this.score || !this.score.scoresInfo || !this.score.scoresInfo[roundNo].endsPoints || !this.score.scoresInfo[roundNo].endsPoints[endNo]){
      return this.getUndefindPoint();
    }

    return this.score.scoresInfo[roundNo].endsPoints[endNo][arrowNo] || this.getUndefindPoint();
  }  

  getUndefindPoint() : IPoint{
    return <IPoint>{ displayValue: "--", value: 0 };
  }
  
  onEndClick(roundRowId: number, endRowId: number){
    
    var resourcePath = '/score-edit/' + this.score.$key;

    if(roundRowId != null && roundRowId != undefined  && endRowId != null && endRowId != undefined ){
      resourcePath += '/' + roundRowId + '/' + endRowId;
    }

    this.router.navigate([resourcePath]);
  }
}
