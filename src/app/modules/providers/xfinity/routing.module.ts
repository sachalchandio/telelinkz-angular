import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as comp from './components';

const routes: Routes = [
  {
    path: '',
    component: comp.XfinityComponent,
    children: [
      {
        path: 'new-sale',
        component: comp.XfinityNewSale,
      },

      {
        path: 'filter',
        component: comp.RecordSearch,
      },

      {
        path: 'sales-journey',
        component: comp.SaleJourneyComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XfinityRoutingModule {}
