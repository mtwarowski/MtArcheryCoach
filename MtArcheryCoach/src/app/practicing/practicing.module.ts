import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdNativeDateModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MaterialModule } from '@angular/material';
import { PracticeDeleteConfirmDialog, PracticesComponent } from './practices/practices.component';
import { PracticeComponent } from './practice/practice.component';
import { PracticingRoutingModule } from "./practicing-routing.module";

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
    MaterialModule,
    FormsModule
  ],
  declarations: [PracticesComponent, PracticeDeleteConfirmDialog, PracticeComponent],
  exports: [
    MdNativeDateModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    FormsModule
  ],
  entryComponents: [PracticeDeleteConfirmDialog],
})
export class PracticingModule { }
