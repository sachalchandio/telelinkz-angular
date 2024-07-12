import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { GET_SALE_HISTORY } from '../../components/sale-journey/sale-journey.component';
import {
  loadSales,
  loadSalesSuccess,
  loadSalesFailure,
} from '../actions/sale.actions';

@Injectable()
export class SaleEffects {
  loadSales$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSales),
      mergeMap(() =>
        this.apollo
          .watchQuery<any>({
            query: GET_SALE_HISTORY,
            variables: {
              saleId: 'someSaleId', // This should be dynamic based on your use case
            },
          })
          .valueChanges.pipe(
            map((response) =>
              loadSalesSuccess({ sales: response.data.getSaleHistory })
            ),
            catchError((error) => of(loadSalesFailure({ error })))
          )
      )
    )
  );

  constructor(private actions$: Actions, private apollo: Apollo) {}
}
