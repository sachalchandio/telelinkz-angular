import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TabStateService } from 'src/app/services/tabState/tab-state.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './xfinity.component.html',
  styleUrls: ['./xfinity.component.css'],
})
export class XfinityComponent implements OnInit, OnDestroy {
  tabs: any[] = [];
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
    // {
    //   title: 'Sales Journey',
    //   icon: 'filter_alt',
    //   route: 'xfinity/sales-journey',
    //   label: 'Navigate to Sales Journey',
    // },
    {
      title: 'Input New File',
      icon: 'insert_drive_file',
      route: 'xfinity/input-new-file',
      label: 'Navigate to Input New File',
    },
    {
      title: 'Agent Review',
      icon: 'rate_review',
      route: 'xfinity/agent-review',
      label: 'Navigate to Agent Review',
    },
    {
      title: 'Xfinity Statistics',
      icon: 'bar_chart',
      route: 'xfinity/statistics',
      label: 'Navigate to Xfinity Statistics',
    },
    {
      title: 'Xfinity Insights',
      icon: 'insights',
      route: 'xfinity/insights',
      label: 'Navigate to Xfinity Insights',
    },
    {
      title: 'Unfinished Leads',
      icon: 'warning',
      route: 'xfinity/unfinished-leads',
      label: 'Navigate to Unfinished Leads',
    },
  ];
  selectedIndex: number = 0;
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private tabStateService: TabStateService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.tabStateService.tabs$.subscribe((tabs) => {
        this.tabs = tabs;
      })
    );

    this.subscription.add(
      this.tabStateService.selectedIndex$.subscribe((index) => {
        this.selectedIndex = index;
      })
    );

    // Default to the first tab if no tab is selected
    if (this.selectedIndex === 0) {
      // navigate to the first tab
      this.router.navigate(['xfinity']);
    }
  }

  openTab(card: any): void {
    this.tabStateService.openTab({
      title: card.title,
      route: card.route,
      queryParams: {}, // Add any necessary query params here
    });
  }

  selectTab(index: number): void {
    this.tabStateService.selectTab(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
