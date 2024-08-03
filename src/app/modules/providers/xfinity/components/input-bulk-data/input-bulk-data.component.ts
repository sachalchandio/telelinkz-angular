import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import {
  CreateXfinitySaleGQL,
  CreateXfinitySaleInput,
  CreateXfinitySaleMutationVariables,
  InstallationType,
  TpvStatus,
  UsState,
  XfinityHomePhone,
  XfinityHomeSecurity,
  XfinityInternet,
  XfinityTv,
} from 'src/generated/graphqlTypes';

interface TableData {
  [key: string]: string | number;
}

@Component({
  selector: 'app-input-bulk-data',
  templateUrl: './input-bulk-data.component.html',
  styleUrl: './input-bulk-data.component.css',
})
export class InputBulkDataComponent {
  jsonData: TableData[] = [];
  dataSource = this.jsonData;
  displayedColumns: string[] = [];

  constructor(private createXfinitySaleGQL: CreateXfinitySaleGQL) {}

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
    const formattedDate = this.formatDate(row['installationDate']);
    const formattedTime = this.formatTime(row['installationTime']);

    const input: CreateXfinitySaleInput = {
      orderDate: this.formatDate(row['orderDate']),
      agentId: row['agentId'] || null,
      cx_firstName: row['cx_firstName'] || null,
      cx_lastName: row['cx_lastName'] || null,
      orderNumber: row['orderNumber'] || null,
      installationDate: formattedDate || '1971-01-01',
      installationTime: formattedTime || '00:00:00',
      installation:
        row['installation'] === 'SELF_INSTALLATION'
          ? InstallationType.SelfInstallation
          : InstallationType.ProInstallation,
      streetAddress: row['streetAddress'] || null,
      streetAddressLine2: row['streetAddressLine2'] || null,
      city: row['city'] || null,
      state: this.isEnumValue(UsState, row['state'])
        ? row['state']
        : UsState.Undetermined,
      zipcode: row['zipcode'] || null,
      phoneNumber: row['phoneNumber'] || null,
      phoneNumber_second: row['phoneNumber_second'] || '',
      socialSecurityNumber: row['socialSecurityNumber'] || null,
      email: row['email'] || null,
      product: row['product'] || null,
      packageSold: row['packageSold'] || null,
      comcastTpvStatus: this.isEnumValue(
        TpvStatus,
        row['comcastTpvStatus'].toUpperCase()
      )
        ? row['comcastTpvStatus'].toUpperCase()
        : TpvStatus.Pending,
      concertOrderID: row['concertOrderID'] || null,
      Internet: this.isEnumValue(XfinityInternet, row['Internet'])
        ? row['Internet']
        : XfinityInternet.None,
      TV: this.isEnumValue(XfinityTv, row['TV']) ? row['TV'] : XfinityTv.None,
      Phone: this.isEnumValue(XfinityHomePhone, row['Phone'])
        ? row['Phone']
        : XfinityHomePhone.None,
      HMS: this.isEnumValue(XfinityHomeSecurity, row['HMS'])
        ? row['HMS']
        : XfinityHomeSecurity.None,
    };

    return { input };
  }

  private formatDate(date: any): string {
    if (typeof date === 'string') {
      const parts = date.split(' ');
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
      const monthIndex = months.indexOf(parts[0]) + 1;
      const day = parts[1].replace(',', '');
      const year = parts[2];
      return `${year}-${String(monthIndex).padStart(2, '0')}-${String(
        day
      ).padStart(2, '0')}`;
    } else if (typeof date === 'number') {
      // Assuming date is an Excel serial number
      const excelDate = new Date(Math.round((date - 25569) * 86400 * 1000));
      const year = excelDate.getFullYear();
      const month = (excelDate.getMonth() + 1).toString().padStart(2, '0');
      const day = excelDate.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    } else {
      return ''; // Handle other cases if necessary
    }
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
