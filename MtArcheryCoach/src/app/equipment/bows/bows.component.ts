import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

import { Router } from "@angular/router";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { UserService } from "../../user.service";
import { FirebaseData } from "../../core/FirebaseData";
import { bowRefUrl } from '../../app.constants';

@Component({
  selector: 'app-bows',
  templateUrl: './bows.component.html',
  styleUrls: ['./bows.component.css']
})
export class BowsComponent implements OnInit {

  public bows: FirebaseListObservable<Bow[]>;

  constructor(private userService: UserService, public af: AngularFireDatabase, private router : Router, public dialog: MdDialog) {    
    let userDataUrl = userService.getUserObjectsUrl();
    this.bows = this.af.list(userDataUrl + bowRefUrl);
  }

  ngOnInit() {
  }

  onSelectedListItem(bow: Bow){
    if(!bow){
      return;
    }

    var resourcePath = "/bow/" + bow.$key;
    this.router.navigate([resourcePath]);
  }


  deleteDialogRef: MdDialogRef<BowDeleteConfirmDialog>;
  onDeleteListItem(bow: Bow){

    if(!bow){
      return;
    }       
    
    this.deleteDialogRef = this.dialog.open(BowDeleteConfirmDialog);
    this.deleteDialogRef.componentInstance.bow = bow;
    this.deleteDialogRef.afterClosed().subscribe(result => {
      if(result){
          this.deleteBow(this.deleteDialogRef.componentInstance.bow);
      }
    });
  }
  
  deleteBow(bow: Bow) {
    this.bows.remove(<any>bow);
  }
}


@Component({
  selector: 'bow-delete-confirm-dialog',
  template: `
<h2 md-dialog-title>Delete {{bow.name}}</h2>
<md-dialog-content>Are you sure?</md-dialog-content>
<md-dialog-actions>
  <button md-button md-dialog-close>No</button>
  <!-- Can optionally provide a result for the closing dialog. -->
  <button md-button [md-dialog-close]="true">Yes</button>
</md-dialog-actions>
`
})
export class BowDeleteConfirmDialog {
  bow: Bow;
  constructor(public dialogRef: MdDialogRef<BowDeleteConfirmDialog>) { }
}

export interface Bow extends FirebaseData {
    name: string;
    brand: string;
    size: number;
    description: string;
    sightMarks: BowSightMark[];
    bowType: string;

    drawWeight: number;
    braceHeight: string;
    bowString: string;
}

export interface BowSightMark {
    distance: string;
    value: string;
}

export const BowTypes: string[] = [
     'Recurve'
    ,'Barebow'
    ,'Compound' 
    ,'Long Bow'
    ,'Hourse Bow'
    ,'Yumi'];