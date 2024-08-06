import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import {
  AtntCustomerType,
  AtntInternet,
  AtntPhone,
  CreateAtntSaleBulkGQL,
  CreateAtntSaleInput,
  InstallationType,
  SaleFlag,
  SaraPlusAt_TUserId,
  TpvStatus,
  UsState,
} from 'src/generated/graphqlTypes';
import { descriptiveToEnumMap } from '../../utils/mappingEnum';

interface TableData {
  [key: string]: string | number;
}

interface ExcelRowAtntSale {
  'Submission Date': string;
  'Agent Name': string;
  'Phone Number': string | number;
  'First Name': string;
  'Last Name': string;
  'Order ID': string;
  'Order Number': string;
  'Account Number': string | number;
  'Order Date': string | number;
  'Installation Type': string;
  'Installation Date': string | number;
  'Installation Time': string | number;
  'Street Address': string;
  'Street Address Line 2': string;
  City: string;
  'State / Province': string;
  'Postal / Zip Code': string | number;
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
  styleUrls: ['./input-bulk-data.component.css'],
})
export class AtntInputBulkDataComponent {
  jsonData: TableData[] = [];
  dataSource = this.jsonData;
  displayedColumns: string[] = [];

  constructor(private createAtntSaleGQL: CreateAtntSaleBulkGQL) {}

  private isEnumValue<T extends Record<string, unknown>>(
    enumType: T,
    value: any
  ): value is T[keyof T] {
    return Object.values(enumType).includes(value);
  }

  onFileChange(event: any) {
    console.log('File change event triggered');
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      console.log('File read successfully');
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      // Convert sheet to JSON, assuming the first row is headers
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      if (data.length > 0) {
        console.log('Sheet to JSON conversion successful');
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
        console.log('Data source updated', this.dataSource.length);
        this.sendRowsToBackend(this.dataSource);
      } else {
        console.error('No data found in the sheet');
      }
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  async sendRowsToBackend(jsonData: any[]): Promise<void> {
    console.log('Sending rows to backend:', jsonData);
    const batchSize = 50; // Adjust this number as needed
    for (let i = 0; i < jsonData.length; i += batchSize) {
      const batch = jsonData
        .slice(i, i + batchSize)
        .map((row) => this.transformRowToInput(row)); // Fix the context issue here
      try {
        const input = { input: { sales: batch } };
        console.log('Sending batch:', input);
        const result = await this.createAtntSaleGQL.mutate(input).toPromise();
        console.log(
          'Batch sent successfully:',
          result?.data?.createAtntSaleBulk
        ); // Access the mutation result here
      } catch (error) {
        console.error('Error processing batch:', batch, error);
      }
    }
  }

  private transformRowToInput(row: ExcelRowAtntSale): CreateAtntSaleInput {
    console.log('Transforming row to input:', row);
    const formattedTime = this.formatTime(row['Installation Time']);
    const descriptiveValue = row['SaraPlus AT&T User ID'];
    const saraplus_agent_enumValue =
      descriptiveToEnumMap[descriptiveValue] || SaraPlusAt_TUserId.None;

    const input: CreateAtntSaleInput = {
      submissionDate: this.formatDate(
        String(row['Submission Date']),
        'MM/DD/YYYY'
      ),
      accountNumber: String(row['Account Number']),
      orderDate: this.formatDate(row['Order Date'], 'MMM DD, YYYY'),
      agentName: row['Agent Name'],
      cx_firstName: row['First Name'],
      cx_lastName: row['Last Name'],
      orderNumber: row['Order Number'],
      installationDateFormatted: this.formatDate(
        row['Installation Date'],
        'MM/DD/YYYY'
      ),
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
        saraplus_agent_enumValue
      )
        ? saraplus_agent_enumValue
        : SaraPlusAt_TUserId.None,
      saleStatus: this.isEnumValue(SaleFlag, row['Sale Status'])
        ? row['Sale Status']
        : SaleFlag.PendingInstall,
      customerType: this.isEnumValue(AtntCustomerType, row['Customer Type'])
        ? row['Customer Type']
        : AtntCustomerType.UnknownRisk,
      order_id: String(row['Order ID']),
      attTpvStatus: TpvStatus.Complete,
      packageDetails: row['Package Details'],
    };

    console.log('Transformed input:', input);
    return input;
  }

  // Helper function to format dates
  private formatDate(
    date: string | number | undefined,
    inputFormat: 'MM/DD/YYYY' | 'MMM DD, YYYY'
  ): string {
    console.log('Formatting date:', date);

    const fallbackDate = new Date('1971-01-01').toISOString().split('T')[0];

    if (date === undefined || date === null) {
      console.error('Date is undefined or null:', date);
      return fallbackDate; // Return the start of time (January 1, 1971)
    }

    if (typeof date === 'number') {
      const excelDate = new Date(Math.round((date - 25569) * 86400 * 1000));
      if (isNaN(excelDate.getTime())) {
        console.error('Invalid numeric date:', date);
        return fallbackDate;
      }
      const formattedDate = excelDate.toISOString().split('T')[0];
      console.log('Formatted numeric date:', formattedDate);
      return formattedDate;
    } else if (typeof date === 'string') {
      if (inputFormat === 'MM/DD/YYYY') {
        const parts = date.split('/');
        if (parts.length !== 3) {
          console.error('Invalid date format:', date);
          return fallbackDate; // Return the start of time (January 1, 1971)
        }
        const [month, day, year] = parts;
        if (!month || !day || !year) {
          console.error('Invalid date components:', date);
          return fallbackDate;
        }
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
          2,
          '0'
        )}`;
        console.log('Formatted string date (MM/DD/YYYY):', formattedDate);
        return formattedDate;
      } else if (inputFormat === 'MMM DD, YYYY') {
        const parts = date.split(/[, ]+/);
        if (parts.length !== 3) {
          console.error('Invalid date format:', date);
          return fallbackDate; // Return the start of time (January 1, 1971)
        }
        const [month, day, year] = parts;
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
        const monthNumeric = months[month];
        if (monthNumeric === undefined) {
          console.error('Invalid month:', month);
          return fallbackDate; // Return the start of time (January 1, 1971)
        }
        const formattedDate = `${year}-${monthNumeric}-${day.padStart(2, '0')}`;
        console.log('Formatted string date (MMM DD, YYYY):', formattedDate);
        return formattedDate;
      }
    }

    console.log('Returning unformatted date:', date.toString());
    return fallbackDate;
  }

  private formatTime(time: string | number): string {
    console.log('Formatting time:', time);
    if (typeof time === 'string') {
      let [hour, minute] = time.split(':').map(Number); // Convert both hour and minute to numbers
      let modifier = 'AM';

      if (hour >= 12) {
        modifier = 'PM';
        if (hour > 12) {
          hour -= 12;
        }
      }

      if (hour === 0) {
        hour = 12;
      }

      const formattedTime = `${hour}:${minute
        .toString()
        .padStart(2, '0')} ${modifier}`;
      console.log('Formatted string time:', formattedTime);
      return formattedTime;
    } else if (typeof time === 'number') {
      // Assuming time is a decimal representing a fraction of the day
      const totalMinutes = Math.round(time * 1440);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const hourFormatted = hours % 12 === 0 ? 12 : hours % 12;
      const modifier = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hourFormatted}:${minutes
        .toString()
        .padStart(2, '0')} ${modifier}`;
      console.log('Formatted numeric time:', formattedTime);
      return formattedTime;
    } else {
      console.log('Returning unformatted time:', '');
      return ''; // Handle other cases if necessary
    }
  }
}
