import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  SetSaleStageDocument,
  SaleFlag,
  SaleType,
  GetSaleFlagDocument,
  GetSaleFlagQuery,
  GetSaleFlagQueryVariables,
} from 'src/generated/graphqlTypes';

@Injectable({
  providedIn: 'root',
})
export class SaleStageService {
  constructor(private apollo: Apollo) {}

  getSaleStage(saleId: string, saleType: SaleType) {
    return this.apollo.query<GetSaleFlagQuery, GetSaleFlagQueryVariables>({
      query: GetSaleFlagDocument,
      variables: {
        saleId: saleId,
        saleType: saleType,
      },
    });
  }

  setSaleStage(
    saleId: string,
    saleType: SaleType,
    stage: SaleFlag,
    userId: string
  ) {
    return this.apollo.mutate({
      mutation: SetSaleStageDocument,
      variables: {
        saleId,
        saleType,
        stage,
        userId,
      },
    });
  }
}
