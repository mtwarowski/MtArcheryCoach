import { LoggedInGuard } from '../loggedIn.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { ScoreComponent } from './score/score.component';
import { ScoresComponent } from './scores/scores.component';

const routes: Routes = [
  { path: 'scores', component: ScoresComponent, canActivate: [ LoggedInGuard ] },
  // { path: 'score', component: ScoreComponent, canActivate: [ LoggedInGuard ] },
  // { path: 'score/:uid', component: ScoreComponent, canActivate: [ LoggedInGuard ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoringRoutingModule { }
