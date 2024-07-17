import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { setSaleDetails } from '../actions/sale.actions';

@Injectable()
export class SaleEffects {
  constructor(private actions$: Actions) {}

  loadSaleDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Sale] Set Sale Details'),
      switchMap(() =>
        of({ type: '[Sale] Load Sale Details Success' }).pipe(
          catchError((error) =>
            of({ type: '[Sale] Load Sale Details Failure', error })
          )
        )
      )
    )
  );
}
