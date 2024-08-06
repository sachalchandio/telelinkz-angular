import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import {
  AtntCustomerType,
  AtntInternet,
  AtntPhone,
  CreateAtntSaleGQL,
  CreateAtntSaleInput,
  CreateAtntSaleMutationVariables,
  InstallationType,
  SaleFlag,
  SaraPlusAt_TUserId,
  UsState,
} from 'src/generated/graphqlTypes';

interface TableData {
  [key: string]: string | number;
}

interface ExcelRowAtntSale {
  'Submission Date': string;
  'Agent Name': string;
  'Phone Number': string;
  'First Name': string;
  'Last Name': string;
  'Order ID': string;
  'Order Number': string;
  'Account Number': string;
  'Order Date': string;
  'Installation Type': string;
  'Installation Date': string;
  'Installation Time': string;
  'Street Address': string;
  'Street Address Line 2': string;
  City: string;
  'State / Province': string;
  'Postal / Zip Code': string;
  'Package Details': string;
  Internet: string;
  Phone: string;
  'Customer Type': string;
  'SaraPlus AT&T User ID': string;
  Product: string;
  'Sale Status': string;
  Email: string;
}

@Component({
  selector: 'app-atnt-input-bulk-data',
  templateUrl: './input-bulk-data.component.html',
  styleUrl: './input-bulk-data.component.css',
})
export class AtntInputBulkDataComponent {
  jsonData: TableData[] = [];
  dataSource = this.jsonData;
  displayedColumns: string[] = [];

  constructor(private createAtntSaleGQL: CreateAtntSaleGQL) {}

  private isEnumValue<T extends Record<string, unknown>>(
    enumType: T,
    value: any
  ): value is T[keyof T] {
    return Object.values(enumType).includes(value);
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

      // Convert sheet to JSON, assuming the first row is headers
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
    console.log(' This is JSON Data ', jsonData);
    for (const row of jsonData) {
      console.log('this is row', row);
      try {
        const input = this.transformRowToInput(row); // Make sure this returns the correct input structure
        console.log('this is input', input);
        const result = await this.createAtntSaleGQL.mutate(input).toPromise();
        console.log(result?.data?.createAtntSale); // Access the mutation result here
      } catch (error) {
        console.error('Error processing row:', row, error);
      }
    }
  }

  private transformRowToInput(
    row: ExcelRowAtntSale
  ): CreateAtntSaleMutationVariables {
    console.log('this is row before transformation', row);
    const formattedTime = this.formatTime(row['Installation Time']);
    const input: CreateAtntSaleInput = {
      submissionDate: this.formatDate(
        String(row['Submission Date']),
        'MM/DD/YYYY'
      ),
      accountNumber: String(row['Account Number']),
      orderDate: this.formatDate(String(row['Order Date']), 'MMM DD, YYYY'),
      agentName: row['Agent Name'],
      cx_firstName: row['First Name'],
      cx_lastName: row['Last Name'],
      orderNumber: row['Order Number'],
      installationDateFormatted: row['Installation Date'] || '1971-01-01',
      installationTime: formattedTime || '00:00:00',
      installation:
        row['Installation Type'] === 'Self Install'
          ? InstallationType.SelfInstallation
          : InstallationType.ProInstallation,
      streetAddress: row['Street Address'],
      streetAddressLine2: row['Street Address Line 2'] || null,
      city: row['City'],
      state: this.isEnumValue(UsState, row['State / Province'])
        ? row['State / Province']
        : UsState.Undetermined,
      zipcode: String(row['Postal / Zip Code']),
      phoneNumber: String(row['Phone Number']),
      Email: row['Email'],
      product: row['Product'],
      Internet: this.isEnumValue(AtntInternet, row['Internet'])
        ? row['Internet']
        : AtntInternet.AtntUndetermined,
      Phone: this.isEnumValue(AtntPhone, row['Phone'])
        ? row['Phone']
        : AtntPhone.None,
      saraPlusAT_TUserID: this.isEnumValue(
        SaraPlusAt_TUserId,
        row['SaraPlus AT&T User ID']
      )
        ? row['SaraPlus AT&T User ID']
        : SaraPlusAt_TUserId.None,
      saleStatus: this.isEnumValue(SaleFlag, row['SaraPlus AT&T User ID'])
        ? row['SaraPlus AT&T User ID']
        : SaleFlag.PendingInstall,

      customerType: this.isEnumValue(
        AtntCustomerType,
        row['SaraPlus AT&T User ID']
      )
        ? row['SaraPlus AT&T User ID']
        : AtntCustomerType.UnknownRisk,
      order_id: row['Order ID'],
    };

    console.log('this is row after transformation', input);
    return { input };
  }

  // Helper function to format dates
  formatDate(
    date: string | number,
    inputFormat: 'MM/DD/YYYY' | 'MMM DD, YYYY'
  ): string {
    if (typeof date === 'number') {
      const excelDate = new Date(Math.round((date - 25569) * 86400 * 1000));
      return excelDate.toISOString().split('T')[0];
    } else if (typeof date === 'string') {
      const [part1, part2, part3] = date.split(/[- /,]/);
      if (inputFormat === 'MM/DD/YYYY') {
        const month = part1;
        const day = part2;
        const year = part3;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      } else if (inputFormat === 'MMM DD, YYYY') {
        const month = part1 as keyof typeof months;
        const day = part2;
        const year = part3;
        const months: Record<string, string> = {
          Jan: '01',
          Feb: '02',
          Mar: '03',
          Apr: '04',
          May: '05',
          Jun: '06',
          Jul: '07',
          Aug: '08',
          Sep: '09',
          Oct: '10',
          Nov: '11',
          Dec: '12',
        };
        return `${year}-${months[month]}-${day.padStart(2, '0')}`;
      }
    }
    return date.toString();
  }

  private formatTime(time: any): string {
    if (typeof time === 'string') {
      let [hour, minute] = time.split(':').map(Number); // Convert both hour and minute to numbers
      let modifier = 'AM';

      if (hour >= 12) {
        modifier = 'PM';
        if (hour > 12) {
          hour = hour - 12;
        }
      }

      if (hour === 0) {
        hour = 12;
      }

      return `${hour}:${minute.toString().padStart(2, '0')} ${modifier}`;
    } else if (typeof time === 'number') {
      // Assuming time is a decimal representing a fraction of the day
      const totalMinutes = Math.round(time * 1440);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const hourFormatted = hours % 12 === 0 ? 12 : hours % 12;
      const modifier = hours >= 12 ? 'PM' : 'AM';
      return `${hourFormatted}:${minutes
        .toString()
        .padStart(2, '0')} ${modifier}`;
    } else {
      return ''; // Handle other cases if necessary
    }
  }
}
