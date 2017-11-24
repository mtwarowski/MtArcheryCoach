import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraningPlansComponent } from './traning-plans/traning-plans.component';
import { TraningPlanComponent } from './traning-plan/traning-plan.component';
import { CalendaryComponent } from './calendary/calendary.component';
import { LoggedInGuard } from '../loggedIn.guard';

const routes: Routes = [
  { path: 'intencity/traningPlans', component: TraningPlansComponent, canActivate: [ LoggedInGuard ] },
  { path: 'intencity/traningPlan', component: TraningPlanComponent, canActivate: [ LoggedInGuard ] },
  { path: 'intencity/calendary', component: CalendaryComponent, canActivate: [ LoggedInGuard ] },
  { path: 'intencity/calendary:traningPlanId', component: CalendaryComponent, canActivate: [ LoggedInGuard ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntencityRoutingModule { }
