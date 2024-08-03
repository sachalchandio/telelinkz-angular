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
      concertOrderID: row['Concert Order ID'] || null,
      Internet: row['Internet'] || XfinityInternet.None,
      TV: row['TV'] || XfinityTv.None,
      Phone: row['Phone'] || XfinityHomePhone.None,
      HMS: row['HMS'] || XfinityHomeSecurity.None,
    };

    return { input };
  }
}
