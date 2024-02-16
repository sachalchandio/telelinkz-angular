import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as mainComp from './components';
import * as comp from '../homepage/components';

const routes: Routes = [
  {
    path: '',
    component: mainComp.TalentPoolMain,
    children: [
      {
        path: '',
        component: comp.ChildComponent0,
      },
      {
        path: 'calendar',
        component: comp.ChildComponent0,
      },
      {
        path: 'calendar2',
        component: comp.ChildComponent1,
      },
      {
        path: 'calendar3',
        component: comp.ChildComponent2,
      },
      {
        path: 'calendar4',
        component: comp.ChildComponent3,
      },
      {
        path: 'calendar5',
        component: comp.ChildComponent4,
      },
      {
        path: 'calendar6',
        component: comp.ChildComponent5,
      },
      {
        path: 'calendar7',
        component: comp.ChildComponent6,
      },
      {
        path: 'calendar8',
        component: comp.ChildComponent7,
      },

      {
        path: 'thankyou',
        component: comp.ChildComponent8,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TalentPoolRoutingModule {}
