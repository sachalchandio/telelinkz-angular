import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as comp from './components';

const routes: Routes = [
  {
    path: '',
    component: comp.XfinityComponent,
    children: [
      // {
      //   path: '',
      //   component: comp.ChildComponent0,
      // },
      {
        path: 'graphs',
        component: comp.GraphsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XfinityRoutingModule {}
