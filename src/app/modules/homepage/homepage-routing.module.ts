import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as comp from './components';
import * as xfinity from '../providers/xfinity/components/';

const routes: Routes = [
  {
    path: '',
    component: comp.HomepageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeModuleRoutingModule {}
