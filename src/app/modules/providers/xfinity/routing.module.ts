import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as comp from './components';

const routes: Routes = [
  {
    path: '',
    component: comp.XfinityComponent,
  },
  {
    path: 'filter',
    component: comp.RecordSearch,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XfinityRoutingModule {}
