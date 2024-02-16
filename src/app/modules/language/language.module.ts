import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as comp from './components';
import { LanguageRoutingModule } from './module-routing';
import { MatDialogModule } from '@angular/material/dialog';

const COMP = [comp.LanguageComponent];

@NgModule({
  declarations: [...COMP],
  imports: [CommonModule, LanguageRoutingModule, MatDialogModule],
})
export class LanguageModule {}
