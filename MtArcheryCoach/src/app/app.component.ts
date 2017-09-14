import { Component } from '@angular/core';
import { UserService } from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  isUserLoggedIn: boolean;
  displayName: string = "Account";

  constructor(public userService: UserService){
    userService.getAuthState().subscribe(auth => {
        if (auth) {
          this.isUserLoggedIn = true;
          this.displayName = auth.displayName;
        } else {
          this.isUserLoggedIn = false;
          this.displayName = "Account";
        }
      });
  }
}
