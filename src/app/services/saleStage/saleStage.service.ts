import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  SetSaleStageDocument,
  SaleFlag,
  SaleType,
  GetSaleStageQuery,
  GetSaleStageDocument,
  GetSaleStageQueryVariables,
} from 'src/generated/graphqlTypes';

@Injectable({
  providedIn: 'root',
})
export class SaleStageService {
  constructor(private apollo: Apollo) {}

  getSaleStage(saleId: string) {
    return this.apollo.query<GetSaleStageQuery, GetSaleStageQueryVariables>({
      query: GetSaleStageDocument,
      variables: {
        id: saleId,
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
