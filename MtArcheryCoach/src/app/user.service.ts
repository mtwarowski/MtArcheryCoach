import {Injectable} from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";

@Injectable()
export class UserService {
    private authState: Observable<firebase.User>
    private currentUser: firebase.User = null;

constructor(public af: AngularFireDatabase, public afAuth: AngularFireAuth, private router: Router) {
      this.authState = this.afAuth.authState;
      console.log("Created UserService.");
      this.authState.subscribe(auth => {
        if (auth) {
          this.currentUser = auth;
          console.log("Successfully Logged in.");
          this.router.navigate(['']);
        } else {
          this.currentUser = null;
          console.log("Not Logged in.");
          this.router.navigate(['login']);
        }
      });
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    
  }
    
  logout() {
    this.afAuth.auth.signOut();
  }  
  
  getAuthState() : Observable<firebase.User> {
    return this.authState;
  }

  getUserData() : firebase.User {
    return this.currentUser;
  }

  getUserObjectsUrl() : string {    
    return '/userData/' +  this.currentUser.uid;
  }
}
