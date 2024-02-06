import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as comp from './components';
import { LoginRoutingModule } from './module-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const COMPONENTS = [comp.LoginComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MatSnackBarModule,
    FormsModule,
  ],
})
export class LoginModule {}
