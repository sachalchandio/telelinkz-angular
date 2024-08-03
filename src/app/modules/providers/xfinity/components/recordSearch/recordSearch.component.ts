import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import {
  CreateXfinitySaleGQL,
  FindAllSalesByAgentNameXfinityGQL,
  FindAllSalesByAgentNameXfinityQuery,
  XfinitySaleDto,
  SaleFlag,
  SaleType,
  XfinitySaleFilterInputDto,
  FindSalesWithComplexFilterXfinityGQL,
} from 'src/generated/graphqlTypes';
import { XfinitySharedDataService } from 'src/app/services/xfinityData/shared-data.service';
import { SaleStageService } from 'src/app/services/saleStage/saleStage.service';
import { TabStateService } from 'src/app/services/tabState/tab-state.service';

interface TableData {
  [key: string]: string | number;
}
@Component({
  selector: 'app-record-search',
  templateUrl: './recordSearch.component.html',
  styleUrls: ['./recordSearch.component.css'],
})
export class RecordSearch implements OnInit, OnDestroy {
  agentNames: string[] = [];
  fetched_sales: XfinitySaleDto[] = [];
  sales: FindAllSalesByAgentNameXfinityQuery['findAllSalesByAgentNameXfinity'] =
    [];

  saleFlags = Object.values(SaleFlag);
  displayedColumns: string[] = [];
  jsonData: TableData[] = [];
  dataSource = this.jsonData;

  // New properties for search and pagination
  searchQuery: string = '';
  totalRecords: number = 0;
  pageSize: number = 20;
  currentPage: number = 0;

  constructor(
    private findSalesWithComplexFilterGQL: FindSalesWithComplexFilterXfinityGQL,
    private sharedDataService: XfinitySharedDataService,
    private saleStageService: SaleStageService,
    private tabStateService: TabStateService
  ) {}

  ngOnInit(): void {
    this.sharedDataService.currentDisplayedColumns.subscribe((columns) => {
      this.displayedColumns = columns;
    });

    this.sharedDataService.currentData.subscribe((data) => {
      this.dataSource = data;
    });

    this.restoreTabState();

    // Fetch initial data
    this.getSalesByFilter(
      {},
      this.pageSize,
      this.currentPage,
      this.searchQuery
    );
  }

  onIdClick(element: TableData): void {
    const saleId: string = element['ID'] as string;
    console.log('Clicked Sale ID:', saleId); // Debugging statement
    if (saleId) {
      this.tabStateService.openTab('xfinity', {
        title: 'Sales Journey',
        route: 'xfinity/sales-journey',
        queryParams: { saleId: saleId, data: JSON.stringify(element) },
      });
    } else {
      console.error('Sale ID is undefined');
    }
  }

  restoreTabState(): void {
    if (this.tabStateService.hasState('xfinity', 'xfinity/record-search')) {
      const state = this.tabStateService.getState(
        'xfinity',
        'xfinity/record-search'
      );
      this.searchQuery = state.searchQuery;
      this.totalRecords = state.totalRecords;
      this.pageSize = state.pageSize;
      this.currentPage = state.currentPage;
      this.displayedColumns = state.displayedColumns;
      this.dataSource = state.dataSource;
    }
  }

  saveTabState(): void {
    const state = {
      searchQuery: this.searchQuery,
      totalRecords: this.totalRecords,
      pageSize: this.pageSize,
      currentPage: this.currentPage,
      displayedColumns: this.displayedColumns,
      dataSource: this.dataSource,
    };
    this.tabStateService.setState('xfinity', 'xfinity/record-search', state);
  }

  async onStatusChange(row: any, selectedStatus: SaleFlag): Promise<void> {
    const userId = '4a1b9056-4844-4964-8438-4c2be59e499c'; // Example userId

    try {
      const response = await this.saleStageService
        .setSaleStage(row.ID, SaleType.XfinitySale, selectedStatus, userId)
        .toPromise();
      if (response?.data) {
        console.log('Sale stage set:', response.data);
        // Update local state immediately
        row.SaleFlag = selectedStatus;
        //
        let saleFlag = this.getSaleFlag(row.ID, SaleType.XfinitySale);
        console.log(saleFlag);
      } else {
        console.error('Error: Response data is undefined');
      }
    } catch (error) {
      console.error('Error setting sale stage:', error);
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getSalesByFilter(
      {},
      this.pageSize,
      this.currentPage,
      this.searchQuery
    );
  }

  onSearch(): void {
    this.currentPage = 0; // Reset to first page on new search
    this.getSalesByFilter(
      {},
      this.pageSize,
      this.currentPage,
      this.searchQuery
    );
  }

  private refreshData(): void {
    this.getSalesByFilter(
      {},
      this.pageSize,
      this.currentPage,
      this.searchQuery
    );
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

  private getSalesByFilter(
    filter: XfinitySaleFilterInputDto,
    limit: number,
    offset: number,
    search?: string
  ): void {
    this.findSalesWithComplexFilterGQL
      .watch({ filter, limit, offset, search }, { fetchPolicy: 'network-only' })
      .valueChanges.subscribe({
        next: async (response) => {
          const { sales, total } =
            response.data.findSalesWithComplexFilterXfinity;
          const transformedData: TableData[] = await Promise.all(
            sales.map(async (sale: XfinitySaleDto) => ({
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
              'Concert Order ID': sale.concertOrderID,
              Internet: sale.Internet,
              TV: sale.TV,
              Phone: sale.Phone,
              HMS: sale.HMS,
            }))
          );
          this.dataSource = transformedData;
          this.sharedDataService.updateData(this.dataSource);
          console.log(transformedData);
          if (transformedData.length > 0) {
            this.displayedColumns = Object.keys(transformedData[0]);
            this.sharedDataService.updateDisplayedColumns(
              this.displayedColumns
            );
          }
          this.totalRecords = total;
        },
        error: (error: string) => {
          console.error('There was an error fetching the sales', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.saveTabState();
  }
}
