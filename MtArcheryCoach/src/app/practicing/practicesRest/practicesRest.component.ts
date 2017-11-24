import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MdDialogRef, MdDialog } from "@angular/material";

import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { UserService } from "../../user.service";
import { RestDataService } from "../../core/restData.service";
import { FirebaseData } from "../../core/FirebaseData";
import { Practice } from '../practices/practices.component';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const objectRefUrl: string = '/practices/';

@Component({
  selector: 'app-practices',
  templateUrl: './practicesRest.component.html',
  styleUrls: ['./practicesRest.component.css']
})
export class PracticesRestComponent implements OnInit {

  public practices: Practice[];
  public practicesObservable: Observable<Practice[]>;
  constructor(private userService: UserService, public af: AngularFireDatabase, private router : Router, public dialog: MdDialog, private http : RestDataService) {    
    let userDataUrl = userService.getUserObjectsUrl();


    //this.practicesObservable = this.af.list(userDataUrl + objectRefUrl);
  }

  ngOnInit() {
    // this.userService.getUserData().getToken()
    //   .then((token) => {
    
    //   let headers = this.getHeaders(token);      
    //   this.practicesObservable = this.http.getAll(`http://localhost:56617/api/practice`);
    //   });
    
    this.http.getAll<Practice[]>(`http://localhost:56617/api/practice`).subscribe(x => this.practices = x, e => this.router.navigate(['error/notFound']));
  }

  // private getHeaders(token: string){
  //   // I included these headers because otherwise FireFox
  //   // will request text/html instead of application/json
  //   let headers = new Headers();
  //   headers.append('Accept', 'application/json');
  //   headers.append('Access-Control-Allow-Origin', 'http://localhost:4201');
  //   headers.append("Authorization", "Bearer " + token);
    
  //   return headers;
  // }

  onSelectedListItem(practice: Practice){
    if(!practice){
      return;
    };

    var resourcePath = '/practice/' + practice.$key;
    this.router.navigate([resourcePath]);
  }


  //deleteDialogRef: MdDialogRef<PracticeDeleteConfirmDialog>;
  onDeleteListItem(practice: Practice){
    // if(!practice){
    //   return;
    // }
    
    // this.deleteDialogRef = this.dialog.open(PracticeDeleteConfirmDialog);
    // this.deleteDialogRef.componentInstance.practice = practice;
    // this.deleteDialogRef.afterClosed().subscribe(result => {
    //   if(result){
    //     this.practices.remove(<any>practice);
    //   }
    // });
  }
}


// @Component({
//   selector: 'practice-delete-confirm-dialog',
//   template: `
// <h2 md-dialog-title>Delete {{practice.name}}</h2>
// <md-dialog-content>Are you sure?</md-dialog-content>
// <md-dialog-actions>
//   <button md-button md-dialog-close>No</button>
//   <!-- Can optionally provide a result for the closing dialog. -->
//   <button md-button [md-dialog-close]="true">Yes</button>
// </md-dialog-actions>
// `
// })
// export class PracticeDeleteConfirmDialog {
//   practice: Practice;
//   constructor(public dialogRef: MdDialogRef<PracticeDeleteConfirmDialog>) { }
// }


// export interface Practice extends FirebaseData{
//   name: string;
//   comment: string;
//   practiceDateText: string;
//   practiceDateTimeStamp: number;
//   practiceDateFormatedText: string;
//   totalValue: number;
//   practiceRounds: PracticeRounds[];
// }

// export interface PracticeRounds{  
//     numberOfRound: number;
//     numberOfTimesPairRound: number;
// }
