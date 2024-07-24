import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TabStateService } from 'src/app/services/tabState/tab-state.service';
import { Tab } from 'src/app/services/tabState/tab-types';
import { Card } from '../../../types/common-types';

@Component({
  selector: 'app-homepage',
  templateUrl: './dashboard-atnt.component.html',
  styleUrls: ['./dashboard-atnt.component.css'],
})
export class AtntDashboardComponent implements OnInit, OnDestroy {
  tabs: Tab[] = [];
  cards: Card[] = [
    {
      title: 'New Sale',
      icon: 'add_shopping_cart',
      route: 'atnt/new-sale',
      label: 'Navigate to New Sale',
    },
    {
      title: 'AT&T Sale Filter',
      icon: 'filter_alt',
      route: 'atnt/filter',
      label: 'Navigate to AT&T Sale Filter',
    },
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
      title: 'AT&T Statistics',
      icon: 'bar_chart',
      route: 'atnt/statistics',
      label: 'Navigate to AT&T Statistics',
    },
    {
      title: 'AT&T Insights',
      icon: 'insights',
      route: 'atnt/insights',
      label: 'Navigate to AT&T Insights',
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
      this.tabStateService.tabs$['atnt'].subscribe((tabs) => {
        this.tabs = tabs;
      })
    );

    this.subscription.add(
      this.tabStateService.selectedIndex$['atnt'].subscribe((index) => {
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
    this.tabStateService.openTab('atnt', {
      title: card.title,
      route: card.route,
      queryParams: {}, // Add any necessary query params here
    });
  }

  selectTab(index: number): void {
    this.tabStateService.selectTab('atnt', index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
