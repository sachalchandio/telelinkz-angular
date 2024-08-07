import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  InterestedCustomer,
  CreateInterestedCustomerInput,
  InterestedCustomersDocument,
  CreateInterestedCustomerDocument,
  InterestedCustomerDocument,
  CreateInterestedCustomerMutation,
  InterestedCustomersQuery,
  InterestedCustomerQuery,
} from '../../../../generated/graphqlTypes';

@Injectable({
  providedIn: 'root',
})
export class InterestedCustomerService {
  constructor(private apollo: Apollo) {}

  createInterestedCustomer(
    input: CreateInterestedCustomerInput
  ): Observable<InterestedCustomer> {
    return this.apollo
      .mutate<CreateInterestedCustomerMutation>({
        mutation: CreateInterestedCustomerDocument,
        variables: {
          input,
        },
      })
      .pipe(map((result) => result.data!.createInterestedCustomer));
  }

  getInterestedCustomers(): Observable<InterestedCustomer[]> {
    return this.apollo
      .watchQuery<InterestedCustomersQuery>({
        query: InterestedCustomersDocument,
      })
      .valueChanges.pipe(map((result) => result.data!.interestedCustomers));
  }

  getInterestedCustomer(id: number): Observable<InterestedCustomer> {
    return this.apollo
      .query<InterestedCustomerQuery>({
        query: InterestedCustomerDocument,
        variables: {
          id,
        },
      })
      .pipe(map((result) => result.data!.interestedCustomer));
  }
}
