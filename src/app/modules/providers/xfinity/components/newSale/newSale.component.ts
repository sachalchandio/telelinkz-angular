import { Component, OnInit, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  CreateXfinitySaleMutation,
  CreateXfinitySaleMutationVariables,
  CreateXfinitySaleDocument,
  SaleStatus,
  UsState,
  TpvStatus,
  XfinityInternet,
  XfinityTv,
  XfinityHomePhone,
  XfinityHomeSecurity,
  GetAllAgentsGQL,
} from '../../../../../../generated/graphqlTypes';

@Component({
  selector: 'xfininty-new-sale',
  templateUrl: './newSale.component.html',
  styleUrls: ['./newSale.component.css'],
})
export class XfinityNewSale implements OnInit {
  agentNames: string[] = [];

  xfinitySaleInput = {
    // agentId: '',
    cx_firstName: '',
    cx_lastName: '',
    orderNumber: '',
    concertOrderId: '',
    installationDate: '',
    installationTime: '',
    orderDate: '',
    installation: SaleStatus.Undetermined,
    streetAddress: '',
    streetAddressLine2: '',
    city: '',
    state: UsState.Undetermined,
    zipcode: '',
    phoneNumber: '',
    socialSecurityNumber: '',
    email: '',
    product: '',
    packageSold: '',
    comcastTpvStatus: TpvStatus.Incomplete,
    Internet: XfinityInternet.None,
    TV: XfinityTv.None,
    Phone: XfinityHomePhone.None,
    HMS: XfinityHomeSecurity.None,
  };

  installationTypes = Object.values(SaleStatus);
  states = Object.values(UsState);
  internetTypes = Object.values(XfinityInternet);
  tvTypes = Object.values(XfinityTv);
  phoneTypes = Object.values(XfinityHomePhone);
  hmsTypes = Object.values(XfinityHomeSecurity);
  tpvStatuses = Object.values(TpvStatus);

  constructor(
    private apollo: Apollo,
    private getAllAgentsGQL: GetAllAgentsGQL
  ) {}

  ngOnInit() {
    this.getAgentNames();
  }

  getAgentNames(): void {
    this.getAllAgentsGQL.watch().valueChanges.subscribe({
      next: (response: { data: { getAllAgents: { name: string }[] } }) => {
        this.agentNames = response.data.getAllAgents.map(({ name }) => name);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    const variables: CreateXfinitySaleMutationVariables = {
      input: {
        ...this.xfinitySaleInput,
        agentId: localStorage.getItem('agent') || '',
      },
    };

    this.apollo
      .mutate<CreateXfinitySaleMutation, CreateXfinitySaleMutationVariables>({
        mutation: CreateXfinitySaleDocument,
        variables: variables,
      })
      .subscribe(
        (response) => {
          console.log('Xfinity Sale created successfully:', response);
        },
        (error) => {
          console.error('Error creating Xfinity Sale:', error);
        }
      );
  }

  formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }
}
