import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as comp from './components';
import { TalentPoolRoutingModule } from './module-routing';
import { TechStackComponent } from '../homepage/components';
import { RouterModule } from '@angular/router';

const COMP = [comp.TalentPoolMain];

@NgModule({
  declarations: [...COMP],
  imports: [
    CommonModule,
    TalentPoolRoutingModule,
    TechStackComponent,
    RouterModule,
  ],
})
export class TalentPoolModule {}
