import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  AtntCustomerType,
  AtntInternet,
  AtntPhone,
  CreateAtntSaleDocument,
  CreateAtntSaleInput,
  CreateAtntSaleMutation,
  CreateAtntSaleMutationVariables,
  GetAllAgentsGQL,
  InstallationType,
  SaleFlag,
  SaraPlusAt_TUserId,
  TpvStatus,
  UsState,
} from '../../../../../../generated/graphqlTypes';
import { TabStateService } from 'src/app/services/tabState/tab-state.service';

@Component({
  selector: 'app-new-sale-kinetic',
  templateUrl: './new-sale-kinetic.component.html',
  styleUrl: './new-sale-kinetic.component.css',
})
export class NewSaleKineticComponent implements OnInit, OnDestroy {
  agentNames: string[] = [];

  atntSaleInput: CreateAtntSaleInput = {
    submissionDate: new Date().toISOString(),
    cx_firstName: '',
    cx_lastName: '',
    orderNumber: '',
    order_id: '',
    accountNumber: '',
    installationDateFormatted: '',
    installationTime: '',
    orderDate: '',
    installation: InstallationType.Undetermined,
    streetAddress: '',
    streetAddressLine2: '',
    city: '',
    state: UsState.Undetermined,
    zipcode: '',
    phoneNumber: '',
    Email: '',
    Internet: AtntInternet.None,
    Phone: AtntPhone.None,
    attTpvStatus: TpvStatus.Incomplete,
    customerType: AtntCustomerType.UnknownRisk,
    product: 'NA',
    saraPlusAT_TUserID: SaraPlusAt_TUserId.None,
    agentName: localStorage.getItem('agent')!,
    // implement it
    saleStatus: SaleFlag.Unassigned,
  };

  installationTypes = Object.values(InstallationType);
  states = Object.values(UsState);
  internetTypes = Object.values(AtntInternet);
  phoneTypes = Object.values(AtntPhone);
  tpvStatuses = Object.values(TpvStatus);
  saleStatuses = Object.values(SaleFlag);

  constructor(
    private apollo: Apollo,
    private getAllAgentsGQL: GetAllAgentsGQL,
    private tabStateService: TabStateService
  ) {}

  ngOnInit() {
    this.getAgentNames();
    this.restoreTabState();
  }

  restoreTabState(): void {
    if (this.tabStateService.hasState('kinetic', 'kinetic/new-sale')) {
      this.atntSaleInput = this.tabStateService.getState(
        'kinetic',
        'kinetic/new-sale'
      );
    }
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
    const variables: CreateAtntSaleMutationVariables = {
      input: {
        ...this.atntSaleInput,
        agentName: localStorage.getItem('agent') || '',
      },
    };

    this.apollo
      .mutate<CreateAtntSaleMutation, CreateAtntSaleMutationVariables>({
        mutation: CreateAtntSaleDocument,
        variables: variables,
      })
      .subscribe(
        (response) => {
          console.log('AT&T Sale created successfully:', response);
        },
        (error) => {
          console.error('Error creating AT&T Sale:', error);
        }
      );
  }

  formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  saveTabState(): void {
    this.tabStateService.setState('kinetic', 'kinetic/new-sale', this.atntSaleInput);
  }

  ngOnDestroy(): void {
    this.saveTabState();
  }
}
