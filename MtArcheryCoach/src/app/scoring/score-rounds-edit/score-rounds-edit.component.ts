import { Component, OnInit } from '@angular/core';
import { Score, IPoint } from '../scores/scores.component';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { UserService } from '../../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { scoresRefUrl } from '../../app.constants';
import { ITargetField } from '../scoring.module';

@Component({
  selector: 'app-score-rounds-edit',
  templateUrl: './score-rounds-edit.component.html',
  styleUrls: ['./score-rounds-edit.component.css']
})
export class ScoreRoundsEditComponent implements OnInit {

  public score: Score;
  public scoreObservable: FirebaseObjectObservable<Score>;

  public editedRoundRowId: number = 0;
  public editedEndRowId: number = 0;

  constructor(private userService: UserService, public af: AngularFireDatabase,
    private route: ActivatedRoute, private router: Router) {
    this.score = <Score>{ name: "", totalValue: 0, scoreDateFormatedText: "", roundsInfo: { name: "", rounds: [] } };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        var scoreIdFromUrl = params['uid'];
        this.editedRoundRowId = parseInt(params['roundRowId']) || 0;
        this.editedEndRowId = parseInt(params['endRowId']) || 0;
        
        if(scoreIdFromUrl){
          let userDataUrl = this.userService.getUserObjectsUrl();
          this.scoreObservable = this.af.object(userDataUrl + scoresRefUrl + scoreIdFromUrl);
          this.scoreObservable.subscribe((value: Score) => {
            this.score = value;
            this.populateEmptyScores(this.score);
            // this.score.roundsInfo.rounds.forEach(x => x.target.targetFields = x.target.targetFields
            //   .sort((tf1, tf2) => tf1.point > tf2.point ? -1 : 1));
          });
        }
    });
  }

  populateEmptyScores(score: Score) {

    if(!score.scoresInfo){
      score.scoresInfo = [];
    }

    for (var index = 0; index < score.roundsInfo.rounds.length; index++) {
      var round = score.roundsInfo.rounds[index];     

      if(!score.scoresInfo[index]){
        score.scoresInfo[index] = { roundName: round.distanceValue + round.distanceSymbol, endsPoints: [] }
      }

      if(!score.scoresInfo[index].endsPoints){
        score.scoresInfo[index].endsPoints = [];
      }
    }
  }

  onPointScoreCircleClick(clickedPoint: IPoint){
    let currentPoints: IPoint[] = this.getCurrentPoints();
    currentPoints = currentPoints.filter(x => x != clickedPoint);
    this.setCurrentPoints(currentPoints);
  }

  tryAddPoint(point: IPoint){
    let currentPoints = this.getCurrentPoints();
    if(this.canAddNewPoint(currentPoints)){
      currentPoints.push(point);
      this.setCurrentPoints(currentPoints);
      this.updateTotalScore();      
    }
  }

  onPointButtonClick(targetField: ITargetField, cx: number, cy: number){
    this.tryAddPoint(this.getPoint(targetField, cx, cy));
  }

  onBackButtonClick() {
    let currentPoints = this.getCurrentPoints();
    if(currentPoints.length > 0){
      currentPoints.pop();
      this.setCurrentPoints(currentPoints);
    }
  }

  save(){
    this.scoreObservable.update(this.score).then(() => {

      let maxNumnerOfRounds = this.score.roundsInfo.rounds.length;
      let maxNumnerOfEnds = this.score.roundsInfo.rounds[this.editedRoundRowId].numberOfEnds;
      let newEditedEndRowId = this.editedEndRowId + 1;

      if(newEditedEndRowId >= maxNumnerOfEnds){
        let newRoundRowId = this.editedRoundRowId + 1;
        
        if(newRoundRowId >= maxNumnerOfRounds){
          //show go back
          return;
        }

        this.editedRoundRowId = newRoundRowId;
        newEditedEndRowId = 0;
      }

      this.editedEndRowId = newEditedEndRowId;
    });
  }

  private getCurrentPoints(): IPoint[]{
    return this.score.scoresInfo[this.editedRoundRowId].endsPoints[this.editedEndRowId] || [];
  }

  private setCurrentPoints(currentPoints: IPoint[]){
    this.score.scoresInfo[this.editedRoundRowId].endsPoints[this.editedEndRowId] = currentPoints;
  }

  private getPoint(targetField: ITargetField, cx: number, cy: number): IPoint {
    let point = <IPoint>{ displayValue: targetField.displayPoint, value: targetField.point, stroke: "grey", strokeWidth: 0.1 };

    if(targetField.fill){
      point.fill = targetField.fill;
    }

    return point;
  }

  private canAddNewPoint(currentPoints: IPoint[]): boolean {
    return currentPoints.length <  this.score.roundsInfo.rounds[this.editedRoundRowId].arrowsPairEnd;
  }

  private updateTotalScore() {
    let totalValue = 0;
    
    for (let index = 0; index < this.score.scoresInfo.length; index++) {
      let element = this.score.scoresInfo[index];
      
      if(element){        
        for (let endsIndex = 0; endsIndex < element.endsPoints.length; endsIndex++) {
          let end = element.endsPoints[endsIndex];
          
          if(end){
            end.forEach(e => totalValue += e.value);
          }
        }
      }
    }

    this.score.totalValue = totalValue;
  }
}
