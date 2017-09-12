import { LoggedInGuard } from '../loggedIn.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PracticeComponent } from './practice/practice.component';
import { PracticesComponent } from './practices/practices.component';

const routes: Routes = [
  { path: 'practices', component: PracticesComponent, canActivate: [ LoggedInGuard ] },
  { path: 'practice', component: PracticeComponent, canActivate: [ LoggedInGuard ] },
  { path: 'practice/:uid', component: PracticeComponent, canActivate: [ LoggedInGuard ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PracticingRoutingModule { }
