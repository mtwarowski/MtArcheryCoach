import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntencityRoutingModule } from './intencity-routing.module';
import { TraningPlansComponent } from './traning-plans/traning-plans.component';
import { TraningPlanComponent } from './traning-plan/traning-plan.component';
import { CalendaryComponent } from './calendary/calendary.component';
import { MdNativeDateModule, MdButtonModule, MdMenuModule, MdCardModule, MdToolbarModule, MdIconModule, MdDatepickerModule, MaterialModule, MdExpansionModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IntencityRoutingModule,
    MdNativeDateModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdDatepickerModule,
    MaterialModule,
    HttpModule,
    FormsModule,
    MdExpansionModule
  ],
  declarations: [ TraningPlansComponent, TraningPlanComponent, CalendaryComponent ],
  exports: [
    MdNativeDateModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdDatepickerModule,
    MdIconModule,
    FormsModule,
    MdExpansionModule
  ],
})
export class IntencityModule { }
