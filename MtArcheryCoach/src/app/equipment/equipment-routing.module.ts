import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BowsComponent } from "./bows/bows.component";
import { BowComponent } from "./bow/bow.component";
import { ArrowsComponent } from "./arrows/arrows.component";
import { ArrowComponent } from "./arrow/arrow.component";
import { LoggedInGuard } from '../loggedIn.guard';

const routes: Routes = [
  { path: 'bows', component: BowsComponent, canActivate: [ LoggedInGuard ] },
  { path: 'bow', component: BowComponent, canActivate: [ LoggedInGuard ] },
  { path: 'bow/:uid', component: BowComponent, canActivate: [ LoggedInGuard ] },
  { path: 'arrows', component: ArrowsComponent, canActivate: [ LoggedInGuard ] },
  { path: 'arrow', component: ArrowComponent, canActivate: [ LoggedInGuard ] },
  { path: 'arrow/:uid', component: ArrowComponent, canActivate: [ LoggedInGuard ] }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
