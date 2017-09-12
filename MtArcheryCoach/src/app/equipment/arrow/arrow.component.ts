import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";

import { UserService } from '../../user.service';
import { Arrows, ShaftType } from '../arrows/arrows.component';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.css']
})
export class ArrowComponent implements OnInit {

  shaftTypes: string[] = ShaftType;
  arrows: Arrows;
  modeDetails: boolean;
  dataObservable: FirebaseObjectObservable<Arrows>;
  
  constructor(private userService: UserService, public af: AngularFireDatabase,
     private router: Router, private route: ActivatedRoute) {

    this.arrows = <Arrows>{
      name: '',
      diameterInMm: 5.0,
      comment: '',

      amoLengthInCm: 0,
      vanes: "",
      shaftType: "",
      nocks: ""
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
        var uIdFromUrl = params['uid'];
        
        if(uIdFromUrl){
          this.dataObservable = this.af.object('/arrows/' + uIdFromUrl);
          this.dataObservable.subscribe((value: Arrows) => {
            this.arrows = value;
          });
        }
    });
  }

  save(){
    if(this.dataObservable){
        this.dataObservable.update(this.arrows).then(() => {
          this.router.navigate(['arrows']);
        });
    }
    else{
      let userObjects = this.userService.getUserObjectsUrl();
      let arrows = this.af.list(userObjects + '/arrows/').push(this.arrows);
      this.router.navigate(['arrows']);
    }
  }
  
  onSlideToggleChange(value) {
    this.modeDetails = value.checked;  
  }
}
