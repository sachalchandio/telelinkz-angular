import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabStateService } from 'src/app/services/tabState/tab-state.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './xfinity.component.html',
  styleUrls: ['./xfinity.component.css'],
})
export class XfinityComponent implements OnInit {
  tabs: any[] = [{ title: 'Xfinity', route: 'xfinity' }];
  cards: any[] = [
    {
      title: 'New Sale',
      icon: 'add_shopping_cart',
      route: 'xfinity/new-sale',
      label: 'Navigate to New Sale',
    },
    {
      title: 'Xfinity Sale Filter',
      icon: 'filter_alt',
      route: 'xfinity/filter',
      label: 'Navigate to Xfinity Sale Filter',
    },
    {
      title: 'Sales Journey',
      icon: 'filter_alt',
      route: 'xfinity/sales-journey',
      label: 'Navigate to Sales Journey',
    },
    {
      title: 'Input New File',
      icon: 'insert_drive_file',
      route: 'xfinity/filter',
      label: 'Navigate to Input New File',
    },
    {
      title: 'Agent Review',
      icon: 'rate_review',
      route: 'xfinity/filter',
      label: 'Navigate to Agent Review',
    },
    {
      title: 'Xfinity Statistics',
      icon: 'bar_chart',
      route: 'xfinity/filter',
      label: 'Navigate to Xfinity Statistics',
    },
    {
      title: 'Xfinity Insights',
      icon: 'insights',
      route: 'xfinity/filter',
      label: 'Navigate to Xfinity Insights',
    },
    {
      title: 'Unfinished Leads',
      icon: 'warning',
      route: 'xfinity/filter',
      label: 'Navigate to Unfinished Leads',
    },
  ];
  selectedIndex: number = 0;

  constructor(
    private router: Router,
    private tabStateService: TabStateService
  ) {}

  ngOnInit(): void {
    // Default to the first tab
    this.router.navigate(['xfinity']);
  }

  openTab(card: any): void {
    const existingTabIndex = this.tabs.findIndex(
      (tab) => tab.route === card.route
    );
    if (existingTabIndex === -1) {
      this.tabs.push(card);
      this.selectTab(this.tabs.length - 1);
    } else {
      this.selectTab(existingTabIndex);
    }
  }

  selectTab(index: number): void {
    this.selectedIndex = index;
    this.router.navigate([this.tabs[index].route], {
      queryParams: this.tabs[index].queryParams,
    });
  }
}
