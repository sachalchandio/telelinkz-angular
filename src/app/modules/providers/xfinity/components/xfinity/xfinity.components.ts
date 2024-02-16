import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-homepage',
  templateUrl: './xfinity.component.html',
  styleUrls: ['./xfinity.component.css'],
})
export class XfinityComponent {
  constructor(private dialog: MatDialog) {}

  // openHireDev(): void {
  //   const dialogRef = this.dialog.open(ChildComponent0, {
  //     data: { component_name: true },
  //   });
  // }
}
