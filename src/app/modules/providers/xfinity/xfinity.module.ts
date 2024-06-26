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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';

const COMPONETS = [
  comp.XfinityComponent,
  comp.RecordSearch,
  comp.XfinityNewSale,
  comp.SaleJourneyComponent,
];

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
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule,
  ],
})
export class XfinityModule {}
