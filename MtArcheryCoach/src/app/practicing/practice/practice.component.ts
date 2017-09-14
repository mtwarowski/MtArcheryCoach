import { forEach } from '@angular/router/src/utils/collection';
import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { UserService } from "../../user.service";
import { Practice, PracticeRounds } from '../practices/practices.component';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  public practice: PracticeViewModel;
  public practiceObservable: FirebaseObjectObservable<Practice>;

  
  constructor(private userService: UserService, public af: AngularFireDatabase,
      private route: ActivatedRoute, private router: Router) {


    let practice = <PracticeViewModel>{name: "", comment: "", practiceDate: new Date(), totalValue: 0, practiceRounds: [{ numberOfRound: 0, numberOfTimesPairRound: 6}]};

    this.practice = practice;
  }

  ngOnInit() {    
    this.route.params.subscribe(params => {
        var practiceIdFromUrl = params['uid'];
        
        if(practiceIdFromUrl){
          let userDataUrl = this.userService.getUserObjectsUrl();
          this.practiceObservable = this.af.object(userDataUrl + '/practices/' + practiceIdFromUrl);
          this.practiceObservable.subscribe((value: Practice) => {
            this.practice = this.MapToViewModel(value);
          });
        }
    });
  }

  save() {
    this.practice.totalValue = this.getTotalValue(this.practice);
	
    this.practice.practiceDateText = this.practice.practiceDate.toJSON();
    this.practice.practiceDateTimeStamp = Math.floor(this.practice.practiceDate.getTime() / 1000);
    this.practice.practiceDateFormatedText = "" + this.practice.practiceDate.getFullYear() + 
                                            "/" + (this.practice.practiceDate.getMonth() + 1) + 
                                            "/" + this.practice.practiceDate.getDate();
    
    if(this.practiceObservable){
        this.practiceObservable.update(this.practice).then(() => {
          this.router.navigate(['practices']);
        });
    }
    else{
      let userDataUrl = this.userService.getUserObjectsUrl();
      this.af.list(userDataUrl + '/practices/').push(this.practice);
    this.router.navigate(['practices']);
    }
  }

  addPracticeRounds(){
    if(!this.practice.practiceRounds){
      this.practice.practiceRounds = [];
    }

    this.practice.practiceRounds.push({ numberOfRound: 0, numberOfTimesPairRound: 0 });
  }

  removePracticeRounds(practiceRound: PracticeRounds){
    this.practice.practiceRounds = this.practice.practiceRounds.filter((value: PracticeRounds) =>{
      value !== practiceRound;
    });
  }

  private getTotalValue(practice: PracticeViewModel){
    let total = 0;

    practice.practiceRounds.forEach((practiceRound: PracticeRounds) => {
      total += (practiceRound.numberOfRound * practiceRound.numberOfTimesPairRound);
    });
    return total;
  }

  private MapToViewModel(practice: Practice): PracticeViewModel{
    let vm = <PracticeViewModel> JSON.parse(JSON.stringify(practice));
    vm.practiceDate = new Date(practice.practiceDateTimeStamp*1000) || new Date();
    return vm;
  }
}

export class PracticeViewModel{
  $key: string;
  name: string;
  comment: string;
  practiceDate: Date;
  practiceDateText: string;
  practiceDateTimeStamp: number;
  practiceDateFormatedText: string;
  totalValue: number;
  practiceRounds: PracticeRounds[];
}