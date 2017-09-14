import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MdDialogRef, MdDialog } from "@angular/material";

import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { UserService } from "../../user.service";
import { FirebaseData } from "../../core/FirebaseData";

const objectRefUrl: string = '/practices/';

@Component({
  selector: 'app-practices',
  templateUrl: './practices.component.html',
  styleUrls: ['./practices.component.css']
})
export class PracticesComponent implements OnInit {

  public practices: FirebaseListObservable<Practice[]>;
  constructor(private userService: UserService, public af: AngularFireDatabase, private router : Router, public dialog: MdDialog) {    
    let userDataUrl = userService.getUserObjectsUrl();
    this.practices = this.af.list(userDataUrl + objectRefUrl);
  }

  ngOnInit() {
  }

  onSelectedListItem(practice: Practice){
    if(!practice){
      return;
    }

    var resourcePath = '/practice/' + practice.$key;
    this.router.navigate([resourcePath]);
  }


  deleteDialogRef: MdDialogRef<PracticeDeleteConfirmDialog>;
  onDeleteListItem(practice: Practice){
    if(!practice){
      return;
    }
    
    this.deleteDialogRef = this.dialog.open(PracticeDeleteConfirmDialog);
    this.deleteDialogRef.componentInstance.practice = practice;
    this.deleteDialogRef.afterClosed().subscribe(result => {
      if(result){
        this.practices.remove(<any>practice);
      }
    });
  }
}


@Component({
  selector: 'practice-delete-confirm-dialog',
  template: `
<h2 md-dialog-title>Delete {{practice.name}}</h2>
<md-dialog-content>Are you sure?</md-dialog-content>
<md-dialog-actions>
  <button md-button md-dialog-close>No</button>
  <!-- Can optionally provide a result for the closing dialog. -->
  <button md-button [md-dialog-close]="true">Yes</button>
</md-dialog-actions>
`
})
export class PracticeDeleteConfirmDialog {
  practice: Practice;
  constructor(public dialogRef: MdDialogRef<PracticeDeleteConfirmDialog>) { }
}


export interface Practice extends FirebaseData{
  name: string;
  comment: string;
  practiceDateText: string;
  practiceDateTimeStamp: number;
  practiceDateFormatedText: string;
  totalValue: number;
  practiceRounds: PracticeRounds[];
}

export interface PracticeRounds{  
    numberOfRound: number;
    numberOfTimesPairRound: number;
}
