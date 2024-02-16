import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as shared from './components/shared';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
// import { UserRegModule } from './modules/UserReg/userReg.module';
import { LoginModule } from './modules/login/login.module';
import { ErrorMessageDialog } from './components/shared/Error/errorDialog.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthenticationService } from './auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgChartsModule } from 'ng2-charts';

const COMPONENTS = [
  // shared
  shared.AppLayoutComponent,
  shared.FooterComponent,
  shared.HeaderComponent,
  ErrorMessageDialog,
];

@NgModule({
  exports: [ApolloModule],
  declarations: [AppComponent, ...COMPONENTS],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    NgChartsModule,
    // UserRegModule,
    // LoginModule,
  ],
  providers: [AuthGuard, AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
