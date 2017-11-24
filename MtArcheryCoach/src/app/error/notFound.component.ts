import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MdDialogRef, MdDialog } from "@angular/material";

import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { UserService } from "../user.service";
import { FirebaseData } from "../core/FirebaseData";

@Component({
    selector: 'app-not-found',
    template: 'Sorry not found!'
  })
  export class NotFoundComponent {
  }