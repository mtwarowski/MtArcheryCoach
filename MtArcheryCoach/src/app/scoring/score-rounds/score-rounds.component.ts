import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { UserService } from "../../user.service";

import { ScoreViewModel } from '../score/score.component';
import { Score } from '../scores/scores.component';

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


  ngOnInit() {    
    this.route.params.subscribe(params => {
        var scoreIdFromUrl = params['uid'];
        
        if(scoreIdFromUrl){
          let userDataUrl = this.userService.getUserObjectsUrl();
          this.scoreObservable = this.af.object(userDataUrl + '/scores/' + scoreIdFromUrl);
          this.scoreObservable.subscribe((value: Score) => {
            this.score = value;
          });
        }
    });
  }
}
