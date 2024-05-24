import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { UserInfoRoutingModule } from './module-routing';
import * as comp from './components';
import { RouterModule } from '@angular/router';

const COMPONETS = [comp.SideBarLoginComponent, comp.UserfeedComponent];

@NgModule({
  declarations: [],
  imports: [UserInfoRoutingModule, NgIf, NgFor, AsyncPipe, RouterModule],
})
export class UserInfoModule {}
