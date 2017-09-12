import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";

import { UserService } from "../../user.service";
import { Bow, BowSightMark, BowTypes } from '../bows/bows.component';

@Component({
  selector: 'app-bow',
  templateUrl: './bow.component.html',
  styleUrls: ['./bow.component.css']
})
export class BowComponent implements OnInit {

  bowTypes: string[] = BowTypes;
  modeDetails: boolean;

  bow: Bow;
  dataObservable: FirebaseObjectObservable<Bow>;

  constructor(private userService: UserService, public af: AngularFireDatabase, 
    private router: Router, private route: ActivatedRoute) {

    this.bow = <Bow>{ name: "", bowType: "", description: "", brand: "", size: 68, sightMarks: [], 
      bowString: "", braceHeight: "", drawWeight: 0 };  
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        var bowIdFromUrl = params['uid'];
        
        if(bowIdFromUrl){ 
          let userDataUrl = this.userService.getUserObjectsUrl();
          this.dataObservable = this.af.object(userDataUrl + '/bows/' + bowIdFromUrl);
          this.dataObservable.subscribe((value: Bow) => {
            this.bow = value;
          });
        }
    });
  }

  save() {
    if(this.dataObservable){
        this.dataObservable.update(this.bow).then(() => {
          this.router.navigate(['bows']);
        });
    }
    else{
      let userDataUrl = this.userService.getUserObjectsUrl();
      let bows = this.af.list(userDataUrl + '/bows/').push(this.bow);
      this.router.navigate(['bows']);
    }
  }
  addSightMark() {
    if(!this.bow.sightMarks){
      this.bow.sightMarks = [];
    }

    this.bow.sightMarks.push({ distance: '0m', value: '0' });
  }

  removeSightMark(sightMark: BowSightMark) {
    this.bow.sightMarks = this.bow.sightMarks.filter((value: BowSightMark) => {
        return value !== sightMark;
    });
  }

  
  onSlideToggleChange(value) {
    this.modeDetails = value.checked;  
  }
}
