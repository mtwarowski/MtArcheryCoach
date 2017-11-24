import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdNativeDateModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MaterialModule, MdDatepickerModule } from '@angular/material';
import { PracticeDeleteConfirmDialog, PracticesComponent } from './practices/practices.component';
import { PracticeComponent } from './practice/practice.component';
import { PracticingRoutingModule } from "./practicing-routing.module";
import { HttpModule } from '@angular/http';
import { PracticesRestComponent } from './practicesRest/PracticesRest.component';

@NgModule({
  imports: [
    CommonModule,
    PracticingRoutingModule,
    MdNativeDateModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdDatepickerModule,
    MaterialModule,
    HttpModule,
    FormsModule
  ],
  declarations: [PracticesComponent, PracticesRestComponent, PracticeDeleteConfirmDialog, PracticeComponent],
  exports: [
    MdNativeDateModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdDatepickerModule,
    MdIconModule,
    FormsModule
  ],
  entryComponents: [PracticeDeleteConfirmDialog],
})
export class PracticingModule { }
