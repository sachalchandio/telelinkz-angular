import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeModuleRoutingModule } from './homepage-routing.module';
import * as comp from './components';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

const COMPONETS = [comp.HomepageComponent];

@NgModule({
  declarations: [...COMPONETS],
  imports: [
    HomeModuleRoutingModule,
    NgIf,
    NgFor,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgChartsModule,
  ],
})
export class HomepageModule {}
