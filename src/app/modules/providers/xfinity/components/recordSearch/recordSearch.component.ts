import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import {
  CreateXfinitySaleGQL,
  CreateXfinitySaleInput,
  CreateXfinitySaleMutationVariables,
  InstallationType,
  TpvStatus,
  UsState,
  XfinityInternet,
  XfinityHomePhone,
  XfinityHomeSecurity,
  XfinityTv,
  FindAllSalesByAgentNameGQL,
  FindAllSalesByAgentNameQuery,
  XfinitySaleDto,
  SaleFlag,
  SaleType,
  XfinitySaleFilterInputDto,
  FindSalesWithComplexFilterGQL,
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
  sales: FindAllSalesByAgentNameQuery['findAllSalesByAgentName'] = [];
  jsonData: TableData[] = [];
  dataSource = this.jsonData;
  saleFlags = Object.values(SaleFlag);
  displayedColumns: string[] = [];

  // New properties for search and pagination
  searchQuery: string = '';
  totalRecords: number = 0;
  pageSize: number = 20;
  currentPage: number = 0;

  constructor(
    private dialog: MatDialog,
    private createXfinitySaleGQL: CreateXfinitySaleGQL,
    private findAllSalesByAgentNameGQL: FindAllSalesByAgentNameGQL,
    private findSalesWithComplexFilterGQL: FindSalesWithComplexFilterGQL,
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
      this.tabStateService.openTab({
        title: 'Sales Journey',
        route: 'xfinity/sales-journey',
        queryParams: { saleId: saleId, data: JSON.stringify(element) },
      });
    } else {
      console.error('Sale ID is undefined');
    }
  }

  restoreTabState(): void {
    if (this.tabStateService.hasState('xfinity/record-search')) {
      const state = this.tabStateService.getState('xfinity/record-search');
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
    this.tabStateService.setState('xfinity/record-search', state);
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

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      // Convert sheet to json, assuming the first row is headers
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      if (data.length > 0) {
        const headers = data[0] as string[]; // Cast first row as string[] for headers
        this.displayedColumns = headers; // Update displayedColumns dynamically
        this.jsonData = data.slice(1).map((row: any) => {
          const rowData: TableData = {};
          row.forEach((cell: any, index: any) => {
            rowData[headers[index]] = cell; // Map each cell to a property
          });
          return rowData;
        });
        this.dataSource = this.jsonData;
        console.log(this.dataSource.length);
        this.sendRowsToBackend(this.dataSource);
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }

  async sendRowsToBackend(jsonData: any[]): Promise<void> {
    for (const row of jsonData) {
      try {
        const input = this.transformRowToInput(row); // Make sure this returns the correct input structure
        const result = await this.createXfinitySaleGQL
          .mutate(input)
          .toPromise();
        console.log(result?.data?.createXfinitySale); // Access the mutation result here
      } catch (error) {
        console.error('Error processing row:', row, error);
      }
    }
  }

  private isEnumValue<T extends Record<string, unknown>>(
    enumType: T,
    value: any
  ): value is T[keyof T] {
    return Object.values(enumType).includes(value);
  }

  private transformRowToInput(row: any): CreateXfinitySaleMutationVariables {
    const dateParts = row['Installation Date'].split(' ');
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const monthIndex = months.indexOf(dateParts[0]) + 1;
    const day = dateParts[1].replace(',', '');
    const year = dateParts[2];
    const formattedDate = `${year}-${monthIndex
      .toString()
      .padStart(2, '0')}-${day.padStart(2, '0')}`;

    let [time, modifier] = row['Installation Time'].split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = (parseInt(hours, 10) + 12).toString();
    } else if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }
    const formattedTime = `${hours}:${minutes}:00`;

    const input: CreateXfinitySaleInput = {
      orderDate: row['Submission Date'] || null,
      agentId: row['Agent Name'] || null,
      cx_firstName: row['First Name'] || null,
      cx_lastName: row['Last Name'] || null,
      orderNumber: row['Order Number'] || null,
      installationDate: formattedDate || '1971-01-01',
      installationTime: formattedTime || '00:00:00',
      installation:
        row['Installation'] === 'Self Install'
          ? InstallationType.SelfInstallation
          : InstallationType.ProInstallation,
      streetAddress: row['Street Address'] || null,
      streetAddressLine2: row['Street Address Line 2'] || null,
      city: row['City'] || null,
      state: row['State / Province'] || UsState.Undetermined,
      zipcode: row['Postal / Zip Code'] || null,
      phoneNumber: row['Phone Number'] || null,
      phoneNumber_second: '',
      socialSecurityNumber: row['Social Security Number'] || null,
      email: row['Email'] || null,
      product: row['Product'] || null,
      packageSold: row['Package Sold'] || null,
      comcastTpvStatus:
        row['Comcast TPV Status'].toUpperCase() || TpvStatus.Pending,
      concertOrderId: row['Concert Order ID'] || null,
      Internet: row['Internet'] || XfinityInternet.None,
      TV: row['TV'] || XfinityTv.None,
      Phone: row['Phone'] || XfinityHomePhone.None,
      HMS: row['HMS'] || XfinityHomeSecurity.None,
    };

    return { input };
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
          const { sales, total } = response.data.findSalesWithComplexFilter;
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
              'Concert Order ID': sale.concertOrderId,
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
