import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as shared from './components/shared';
import { GraphQLModule } from './graphql.module';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
// import { UserRegModule } from './modules/UserReg/userReg.module';
import { ErrorMessageDialog } from './components/shared/Error/errorDialog.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthenticationService } from './auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgChartsModule } from 'ng2-charts';

import {
  SideBarLoginComponent,
  UserfeedComponent,
} from './modules/user-info/components';
import { StoreModule } from '@ngrx/store';
import { saleReducer } from './store/reducers/sale.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SaleEffects } from './store/effects/sale.effects';

class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Global error handler:', error);
  }
}

const COMPONENTS = [
  // shared
  shared.AppLayoutComponent,
  shared.FooterComponent,
  shared.HeaderComponent,
  shared.rightBarComponent,
  shared.NavbarTopComponent,
  ErrorMessageDialog,
];

@NgModule({
  exports: [ApolloModule],
  declarations: [AppComponent, ...COMPONENTS],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    NgChartsModule,
    UserfeedComponent,
    StoreModule.forRoot({ sale: saleReducer }),
    EffectsModule.forRoot([SaleEffects]),
    SideBarLoginComponent,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    provideHttpClient(withInterceptorsFromDi()),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
})
export class AppModule {}
