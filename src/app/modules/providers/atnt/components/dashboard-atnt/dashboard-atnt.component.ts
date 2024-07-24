import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TabStateService } from 'src/app/services/tabState/tab-state.service';

@Component({
  selector: 'app-dashboard-atnt',
  templateUrl: './dashboard-atnt.component.html',
  styleUrl: './dashboard-atnt.component.css',
})
export class DashboardAtntComponent {
  tabs: any[] = [];
  cards: any[] = [
    {
      title: 'New Sale',
      icon: 'add_shopping_cart',
      route: 'atnt/new-sale',
      label: 'Navigate to New Sale',
    },
    {
      title: 'atnt Sale Filter',
      icon: 'filter_alt',
      route: 'atnt/filter',
      label: 'Navigate to atnt Sale Filter',
    },
    // {
    //   title: 'Sales Journey',
    //   icon: 'filter_alt',
    //   route: 'atnt/sales-journey',
    //   label: 'Navigate to Sales Journey',
    // },
    {
      title: 'Input New File',
      icon: 'insert_drive_file',
      route: 'atnt/input-new-file',
      label: 'Navigate to Input New File',
    },
    {
      title: 'Agent Review',
      icon: 'rate_review',
      route: 'atnt/agent-review',
      label: 'Navigate to Agent Review',
    },
    {
      title: 'atnt Statistics',
      icon: 'bar_chart',
      route: 'atnt/statistics',
      label: 'Navigate to atnt Statistics',
    },
    {
      title: 'atnt Insights',
      icon: 'insights',
      route: 'atnt/insights',
      label: 'Navigate to atnt Insights',
    },
    {
      title: 'Unfinished Leads',
      icon: 'warning',
      route: 'atnt/unfinished-leads',
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
      this.router.navigate(['atnt']);
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
