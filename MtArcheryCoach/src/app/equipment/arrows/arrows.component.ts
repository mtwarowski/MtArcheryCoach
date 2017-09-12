import { FirebaseData } from '../../core/FirebaseData';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { UserService } from "../../user.service";

const objectRefUrl: string = '/arrows/';

@Component({
  selector: 'app-arrows',
  templateUrl: './arrows.component.html',
  styleUrls: ['./arrows.component.css']
})
export class ArrowsComponent implements OnInit {
  
  public allArrows: FirebaseListObservable<Arrows[]>;

  constructor(private userService: UserService, public af: AngularFireDatabase, private router : Router) {    
    let userDataUrl = this.userService.getUserObjectsUrl();
    this.allArrows = this.af.list(userDataUrl + objectRefUrl);
  }

  ngOnInit() {
  }

  onSelectedListItem(arrows: Arrows){
    if(!arrows){
      return;
    }

    var resourcePath = objectRefUrl + arrows.$key;
    this.router.navigate([resourcePath]);
  }
}

export const ShaftType : string[] = [
    'Carbon',
    'Aluminum',
    'Wooden'
];


export interface Arrows extends FirebaseData {
    name: string;
    diameterInMm: number;
    shaftType: string;
    amoLengthInCm: number;
    vanes: string;
    nocks: string;
    comment: string;
}