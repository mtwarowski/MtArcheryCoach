import { Component, OnInit } from '@angular/core';
import { Score } from '../scores/scores.component';
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

  public endName: string = "End nr: 1";
  public editEndView: string = "x, 10, 8";

  public editedRoundRowId: number = 0;

  public score: Score;
  public scoreObservable: FirebaseObjectObservable<Score>;

  constructor(private userService: UserService, public af: AngularFireDatabase,
    private route: ActivatedRoute, private router: Router) {
    this.score = <Score>{ name: "", totalValue: 0, scoreDateFormatedText: "", roundsInfo: { name: "", rounds: [] } };
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

  onPointButtonClick(targetField: ITargetField){
    this.editEndView += ", " + targetField.displayPoint;    
  }

  onBackButtonClick() {
    this.editEndView = "x, 10";
  }
}
