import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShortContactComponent } from 'src/app/modules/homepage/components/short-contact/short-contact.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(private dialog: MatDialog) {}

  openShortForm(): void {
    const dialogRef = this.dialog.open(ShortContactComponent, {
      data: { component_name: true },
    });
  }
}
