import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import * as comp from './components';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { XfinityRoutingModule } from './routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { XfinityFilter } from 'src/app/components/standalone/xfinityFilter/xfinity-filter.component';

const COMPONETS = [comp.XfinityComponent];

@NgModule({
  declarations: [...COMPONETS],
  imports: [
    XfinityRoutingModule,
    NgIf,
    NgFor,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgChartsModule,
    CommonModule,
    MatTableModule,
    MatIconModule,
    XfinityFilter,
  ],
})
export class XfinityModule {}
