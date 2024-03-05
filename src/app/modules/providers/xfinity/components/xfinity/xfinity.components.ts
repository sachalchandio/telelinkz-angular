import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import {
  CreateXfinitySaleGQL,
  CreateXfinitySaleInput,
  CreateXfinitySaleMutationVariables,
  SaleStatus,
  TpvStatus,
} from 'src/generated/graphqlTypes';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

interface TableData {
  [key: string]: string | number;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './xfinity.component.html',
  styleUrls: ['./xfinity.component.css'],
})
export class XfinityComponent {
  constructor(
    private dialog: MatDialog,
    private createXfinitySaleGQL: CreateXfinitySaleGQL,
    private apollo: Apollo
  ) {}

  jsonData: TableData[] = [];
  dataSource = this.jsonData;
  displayedColumns: string[] = []; // Adjust based on your data

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
        this.sendRowsToBackend(this.dataSource);
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }

  async sendRowsToBackend(jsonData: any[]): Promise<void> {
    for (const row of jsonData) {
      const input = this.transformRowToInput(row); // Make sure this returns the correct input structure
      try {
        const result = await this.createXfinitySaleGQL
          .mutate(input)
          .toPromise();
        console.log(result?.data?.createXfinitySale); // Access the mutation result here
      } catch (error) {
        console.error('Error:', error);
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
    const input: CreateXfinitySaleInput = {
      orderDate: row['Submission Date'] as string,
      agentId: row['Agent Name'] as string, // This assumes the agent's ID is directly available; you might need to fetch or translate this
      cx_firstName: row['First Name'] as string,
      cx_lastName: row['Last Name'] as string,
      orderNumber: row['Order Number'] as string,
      installationDate: row['Installation Date'] as string,
      installationTime: row['Installation Time'] as string,
      installation:
        row['Installation'] === 'Self Install'
          ? SaleStatus.SelfInstallation
          : SaleStatus.ProInstallation,
      streetAddress: row['Street Address'] as string,
      streetAddressLine2: row['Street Address Line 2'] || ('' as string), // Provide default value if necessary
      city: row['City'] as string,
      state: row['State / Province'],
      zipcode: row['Postal / Zip Code'] as string,
      phoneNumber: row['Phone Number'] as string,
      phoneNumber_second: '', // Assuming there's no second phone number in your JSON; adjust as necessary
      socialSecurityNumber: row['Social Security Number'] as string,
      email: row['Email'] as string,
      product: row['Product'] as string,
      packageSold: row['Package Sold'] as string,
      comcastTpvStatus: row['Comcast TPV Status'].toUpperCase(),
      concertOrderId: row['Concert Order ID'] as string,
      Internet: row['Internet'],
      TV: row['TV'],
      Phone: row['Phone'],
      HMS: row['HMS'],
      // Assuming `SaleStatus` is a valid enum or string for the `saleStatus` field in your GraphQL schema
      // saleStatus: row["Sale Status"],
    };

    return { input };
  }

  // openHireDev(): void {
  //   const dialogRef = this.dialog.open(ChildComponent0, {
  //     data: { component_name: true },
  //   });
  // }
}
