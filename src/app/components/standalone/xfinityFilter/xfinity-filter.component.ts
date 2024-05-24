import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  XfinitySaleDto,
  XfinitySaleFilterInputDto,
  FindSalesWithComplexFilterGQL,
  XfinityHomeSecurity,
  XfinityHomePhone,
  XfinityTv,
  XfinityInternet,
  TpvStatus,
  UsState,
  InstallationType,
  GetAllAgentsGQL,
  UserType,
  SaleFlag,
  SaleType,
} from 'src/generated/graphqlTypes';
import { XfinitySharedDataService } from 'src/app/services/xfinityData/shared-data.service';
import { SaleStageService } from 'src/app/services/saleStage/saleStage.service';

export interface TableData {
  [key: string]: string | number;
}

@Component({
  standalone: true,
  selector: 'xfinity-filter-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './xfinity-filter.component.html',
  styleUrls: ['./xfinity-filter.component.css'],
})
export class XfinityFilter implements OnInit {
  agentNames: string[] = [];
  agentType: UserType = UserType.Agent;
  jsonData: TableData[] = [];
  dataSource = this.jsonData;
  displayedColumns: string[] = []; // Adjust based on your data
  saleStatuses = Object.values(InstallationType);
  USStates = Object.values(UsState);
  InternetPackages = Object.values(XfinityInternet);
  TVPackages = Object.values(XfinityTv);
  PhonePackages = Object.values(XfinityHomePhone);
  HMSPackages = Object.values(XfinityHomeSecurity);
  TpvStatuses = Object.values(TpvStatus);

  filterForm = new FormGroup({
    id: new FormControl(''),
    createdAt: new FormControl(''),
    updatedAt: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    orderDate: new FormControl(''),
    cx_firstName: new FormControl(''),
    cx_lastName: new FormControl(''),
    orderNumber: new FormControl(''),
    installationDate: new FormControl(''),
    installationTime: new FormControl(''),
    installation: new FormControl(InstallationType.Undetermined),
    streetAddress: new FormControl(''),
    streetAddressLine2: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(UsState.Undetermined),
    zipcode: new FormControl(''),
    phoneNumber: new FormControl(''),
    phoneNumber_second: new FormControl(''),
    socialSecurityNumber: new FormControl(''),
    email: new FormControl(''),
    product: new FormControl(''),
    packageSold: new FormControl(''),
    comcastTpvStatus: new FormControl(TpvStatus.Complete),
    concertOrderId: new FormControl(''),
    Internet: new FormControl(XfinityInternet.None),
    TV: new FormControl(XfinityTv.None),
    Phone: new FormControl(XfinityHomePhone.None),
    HMS: new FormControl(XfinityHomeSecurity.None),
    agentName: new FormControl(''),
  });

  constructor(
    private findSalesWithComplexFilterGQL: FindSalesWithComplexFilterGQL,
    private xfinityDataService: XfinitySharedDataService,
    private getAllAgentsGQL: GetAllAgentsGQL,
    private saleStageService: SaleStageService // Ensure this is injected correctly
  ) {}

  ngOnInit(): void {
    this.getAgentNames();
  }

  getAgentNames(): void {
    this.agentType = localStorage.getItem('userType') as UserType;
    if (
      this.agentType === UserType.Admin ||
      this.agentType === UserType.Manager
    ) {
      this.getAllAgentsGQL.watch().valueChanges.subscribe({
        next: (response) => {
          this.agentNames = response.data.getAllAgents.map(({ name }) => name);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.agentNames.push(localStorage.getItem('agent') || '');
    }
  }

  async getSaleFlag(
    saleId: string,
    saleType: SaleType
  ): Promise<SaleFlag | null> {
    try {
      const response = await this.saleStageService
        .getSaleStage(saleId, saleType)
        .toPromise();
      const stage = response?.data?.getSaleFlag ?? null;

      if (stage && Object.values(SaleFlag).includes(stage as SaleFlag)) {
        return stage as SaleFlag;
      }

      return null;
    } catch (error) {
      console.error('Error fetching sale stage:', error);
      return null;
    }
  }

  onFilterSubmit(): void {
    if (this.filterForm.valid) {
      const formValue: Partial<XfinitySaleFilterInputDto> =
        this.filterForm.value;

      for (const [key, value] of Object.entries(formValue)) {
        if (!value && value === 'NONE') {
          delete formValue[key as keyof XfinitySaleFilterInputDto];
        }

        if (value === 'UNDETERMINED') {
          delete formValue[key as keyof XfinitySaleFilterInputDto];
        }
      }

      console.log(formValue);
      this.getSalesByFilter(formValue);
    }
  }

  private getSalesByFilter(filter: XfinitySaleFilterInputDto): void {
    this.findSalesWithComplexFilterGQL
      .watch({ filter })
      .valueChanges.subscribe({
        next: async (response) => {
          const transformedData: TableData[] = await Promise.all(
            response.data.findSalesWithComplexFilter.map(async (sale) => ({
              ID: sale.id,
              SaleFlag:
                (await this.getSaleFlag(sale.id, SaleType.XfinitySale)) ||
                SaleFlag.Unassigned,
              'Order Date': sale.orderDate,
              'Agent Name': sale.agentName,
              'Customer First Name': sale.cx_firstName,
              'Customer Last Name': sale.cx_lastName,
              'Order Number': sale.orderNumber,
              'Installation Date': sale.installationDateFormatted,
              'Installation Time': sale.installationTime,
              'Installation Type': sale.installation,
              'Street Address': sale.streetAddress,
              'Street Address Line 2': sale.streetAddressLine2 || '',
              City: sale.city,
              State: sale.state,
              Zipcode: sale.zipcode,
              'Phone Number': sale.phoneNumber,
              'Second Phone Number': sale.phoneNumber_second || '',
              'Social Security Number': sale.socialSecurityNumber || '',
              Email: sale.email,
              Product: sale.product,
              'Package Sold': sale.packageSold,
              'Comcast TPV Status': sale.comcastTpvStatus,
              'Concert Order ID': sale.concertOrderId,
              Internet: sale.Internet,
              TV: sale.TV,
              Phone: sale.Phone,
              HMS: sale.HMS,
            }))
          );
          // Assuming you have a way to set this transformed data to your table's dataSource.
          this.dataSource = transformedData; // Update your table's dataSource with the transformed data.
          // Save the dataSource in service to share it with display component for excel view
          this.xfinityDataService.updateData(this.dataSource);
          console.log(transformedData);
          if (transformedData.length > 0) {
            this.displayedColumns = Object.keys(transformedData[0]);
            // Save the dataSource in service to share it with display component for excel view
            this.xfinityDataService.updateDisplayedColumns(
              this.displayedColumns
            );
          }
        },
        error: (error) => {
          console.error('There was an error fetching the sales', error);
        },
      });
  }
}
