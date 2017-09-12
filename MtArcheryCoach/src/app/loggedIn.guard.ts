import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(public userService: UserService, private parentRouter: Router) {
    }

    canActivate() {
        var canActivate = this.userService.getUserData() != null;

        if (!canActivate) {
            this.parentRouter.navigate(["/login"]);
        }

        return canActivate;
    }
}