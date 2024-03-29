import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartData, ChartType, ChartOptions } from 'chart.js';
import {
  GetXfinitySalesDataByYearGQL,
  XfinitySalesByYearInput,
  XfinitySalesByYear,
} from 'src/generated/graphqlTypes';

interface StackedBarGraphDataset {
  data: number[];
  label: string;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

@Component({
  selector: 'xfinity-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],
})
export class GraphsComponent implements AfterViewInit {
  @ViewChild('canvasInternetYearly') internetYearlyCanvas:
    | ElementRef<HTMLElement>
    | undefined;
  // Define the chart options
  yearForm = new FormGroup({
    year: new FormControl(''),
  });

  stackedBarGraphData: XfinitySalesByYear[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
      },
    },
  };

  // Define the chart type
  chartType: ChartType = 'bar';

  chartColors: string[] = [
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 0, 0, 0.2)', // Red
    'rgba(0, 255, 0, 0.2)', // Green
    'rgba(0, 0, 255, 0.2)', // Blue
    'rgba(255, 255, 0, 0.2)', // Yellow
  ];
  borderColors: string[] = [
    'rgba(54, 162, 235, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 0, 0, 1)', // Red
    'rgba(0, 255, 0, 1)', // Green
    'rgba(0, 0, 255, 1)', // Blue
    'rgba(255, 255, 0, 1)', // Yellow
  ];

  // Define the chart labels
  chartLabels: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Correctly structure the chart data according to ChartData type
  chartData: ChartData<'bar'> = {
    labels: this.chartLabels, // Assign the labels here if needed
    datasets: [],
  };

  // const chartBorderColors: string[] = chartColors.map((color, index) => {
  //   const baseColor = color.replace('0.2', '1');
  //   return index % 2 === 0 ? baseColor : `#${baseColor.slice(4)}`;
  // });

  constructor(
    private getXfinitySalesDataByYear: GetXfinitySalesDataByYearGQL
  ) {}

  ngAfterViewInit() {
    // Check if the canvas reference is defined
    if (this.internetYearlyCanvas) {
      // Access and manipulate the native DOM element
      const canvasElement = this.internetYearlyCanvas.nativeElement;
      // Perform operations on the canvas element as needed
    }
  }

  onYearSubmit(): void {
    const variables = {
      query: {
        year: parseInt(this.yearForm.value.year || '2023', 10),
      },
    };

    this.getXfinitySalesDataByYear.watch(variables).valueChanges.subscribe({
      next: (result) => {
        this.stackedBarGraphData = result.data.getXfinitySalesDataByYear;
        this.chartData.datasets = this.setDataForMultiGraph();
        // console.log(this.chartData);
      },
      error: (error) => {
        alert('Error retrieving sales data');
        console.error(error);
      },
    });
  }

  setDataForMultiGraph(): StackedBarGraphDataset[] {
    const xfMonthlySalesData: XfinitySalesByYear[] | undefined =
      this.stackedBarGraphData;

    // Check if xfMonthlySalesData is defined and not null
    if (xfMonthlySalesData) {
      return Object.keys(xfMonthlySalesData).map((key, index) => ({
        label: xfMonthlySalesData[index].label,
        data: xfMonthlySalesData[index]?.data || [], // Ensure each item is converted to string
        backgroundColor: this.chartColors[index % this.chartColors.length],
        borderColor: this.borderColors[index % this.borderColors.length],
        borderWidth: 1,
      }));
    } else {
      // Handle case when xfMonthlySalesData is undefined or null
      return [];
    }
  }
}
