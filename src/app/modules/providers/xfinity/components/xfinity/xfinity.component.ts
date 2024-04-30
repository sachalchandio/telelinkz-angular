import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-homepage',
  templateUrl: './xfinity.component.html',
  styleUrls: ['./xfinity.component.css'],
})
export class XfinityComponent {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
}
