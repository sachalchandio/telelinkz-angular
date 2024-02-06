import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as shared from './components/shared';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { UserRegModule } from './modules/UserReg/userReg.module';
import { LoginModule } from './modules/login/login.module';
import { ErrorMessageDialog } from './components/shared/Error/errorDialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';

const COMPONENTS = [
  // shared
  shared.AppLayoutComponent,
  shared.FooterComponent,
  shared.HeaderComponent,
  ErrorMessageDialog,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    LoginModule,
    ReactiveFormsModule,
    UserRegModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard, AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
