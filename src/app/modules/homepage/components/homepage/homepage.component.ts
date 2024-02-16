import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  constructor(private dialog: MatDialog) {}

  public chartOptions: ChartOptions = {
    responsive: true,
    // further customization
  };

  public chartLabels: string[] = ['January', 'February', 'March', 'April'];

  public chartType: ChartType = 'line';

  public chartData: ChartDataset[] = [
    { data: [65, 59, 80, 81], label: 'Series A' },
    // Add more datasets if needed
  ];
}
