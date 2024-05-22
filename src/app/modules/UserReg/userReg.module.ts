import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as comp from './components';
import { userRegRoutingModule } from './module-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const COMPONENTS = [comp.UserRegComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    userRegRoutingModule,
    MatSnackBarModule,
    FormsModule,
  ],
})
export class UserRegModule {}
