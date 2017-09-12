import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MaterialModule } from '@angular/material';
import { EquipmentRoutingModule } from './equipment-routing.module';
import { BowsComponent, BowDeleteConfirmDialog } from './bows/bows.component';
import { BowComponent } from './bow/bow.component';
import { ArrowsComponent } from './arrows/arrows.component';
import { ArrowComponent } from './arrow/arrow.component';

@NgModule({
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [BowsComponent, BowDeleteConfirmDialog, BowComponent, ArrowsComponent, ArrowComponent],
  entryComponents: [BowDeleteConfirmDialog],
  exports: [
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    FormsModule
  ]
})
export class EquipmentModule { }
