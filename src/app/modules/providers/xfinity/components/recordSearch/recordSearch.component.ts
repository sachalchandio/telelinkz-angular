import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
} from 'src/generated/graphqlTypes';
import { FormGroup, FormControl } from '@angular/forms';
import { XfinitySharedDataService } from 'src/app/services/xfinityData/shared-data.service';
import { SaleStageService } from 'src/app/services/saleStage/saleStage.service';

interface TableData {
  [key: string]: string | number;
}

@Component({
  selector: 'app-record-search',
  templateUrl: './recordSearch.component.html',
  styleUrls: ['./recordSearch.component.css'],
})
export class RecordSearch implements OnInit {
  agentNames: string[] = [];
  fetched_sales: XfinitySaleDto[] = [];
  sales: FindAllSalesByAgentNameQuery['findAllSalesByAgentName'] = [];
  jsonData: TableData[] = [];
  dataSource = this.jsonData;
  saleFlags = Object.values(SaleFlag);
  displayedColumns: string[] = [
    'SaleFlag',
    'ID',
    'Order Date',
    'Customer First Name',
    'Customer Last Name',
    'Installation Date',
    'Installation Time',
    'Product',
    'Package Sold',
  ]; // Add other necessary columns
  searchForm = new FormGroup({
    nameInput: new FormControl(''), // Initialize your search input control
  });

  constructor(
    private dialog: MatDialog,
    private createXfinitySaleGQL: CreateXfinitySaleGQL,
    private findAllSalesByAgentNameGQL: FindAllSalesByAgentNameGQL,
    private sharedDataService: XfinitySharedDataService,
    private saleStageService: SaleStageService
  ) {}

  ngOnInit(): void {
    this.sharedDataService.currentDisplayedColumns.subscribe((columns) => {
      this.displayedColumns = columns;
    });

    this.sharedDataService.currentData.subscribe((data) => {
      this.dataSource = data;
    });
  }

  async onStatusChange(row: any, selectedStatus: SaleFlag): Promise<void> {
    console.log('Row updated:', row, 'Selected Status:', selectedStatus);

    // Example userId, replace with the actual user ID
    const userId = '4a1b9056-4844-4964-8438-4c2be59e499c';

    try {
      const response = await this.saleStageService
        .setSaleStage(row.ID, SaleType.XfinitySale, selectedStatus, userId)
        .toPromise();
      if (response?.data) {
        console.log('Sale stage set:', response.data);
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

  // Adjust the method signature if needed, based on the actual definitions of your types
  private transformRowToInput(row: any): CreateXfinitySaleMutationVariables {
    // Assuming `row['Installation Date']` is in the format "Mar 22, 2023"
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
    const day = dateParts[1].replace(',', ''); // Removes comma
    const year = dateParts[2];
    const formattedDate = `${year}-${monthIndex
      .toString()
      .padStart(2, '0')}-${day.padStart(2, '0')}`;

    // Transform time to 24-hour format as before
    let [time, modifier] = row['Installation Time'].split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = (parseInt(hours, 10) + 12).toString();
    } else if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }
    const formattedTime = `${hours}:${minutes}:00`; // Converts to HH:MM:SS format

    const input: CreateXfinitySaleInput = {
      orderDate: row['Submission Date'] || null,
      agentId: row['Agent Name'] || null, // This assumes the agent's ID is directly available; you might need to fetch or translate this
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
      streetAddressLine2: row['Street Address Line 2'] || null, // Provide default value if necessary
      city: row['City'] || null,
      state: row['State / Province'] || UsState.Undetermined,
      zipcode: row['Postal / Zip Code'] || null,
      phoneNumber: row['Phone Number'] || null,
      phoneNumber_second: '', // Assuming there's no second phone number in your JSON; adjust as necessary
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
      // Assuming `SaleStatus` is a valid enum or string for the `saleStatus` field in your GraphQL schema
      // saleStatus: row["Sale Status"],
    };

    return { input };
  }
}
