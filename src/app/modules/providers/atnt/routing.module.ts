import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as comp from './components';

const routes: Routes = [
  {
    path: '',
    component: comp.AtntDashboardComponent,
    children: [
      {
        path: 'new-sale',
        component: comp.NewSaleAtntComponent,
      },

      {
        path: 'filter',
        component: comp.RecordSearchAtntComponent,
      },

      {
        path: 'sales-journey',
        component: comp.SaleJourneyAtntComponent,
      },
      // {
      //   path: 'audit-form',
      //   component: comp.AuditFormComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtntRoutingModule {}
