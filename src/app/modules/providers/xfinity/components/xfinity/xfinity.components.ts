import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

interface TableData {
  [key: string]: string | number;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './xfinity.component.html',
  styleUrls: ['./xfinity.component.css'],
})
export class XfinityComponent {
  constructor(private dialog: MatDialog) {}

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
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }
  // openHireDev(): void {
  //   const dialogRef = this.dialog.open(ChildComponent0, {
  //     data: { component_name: true },
  //   });
  // }
}
