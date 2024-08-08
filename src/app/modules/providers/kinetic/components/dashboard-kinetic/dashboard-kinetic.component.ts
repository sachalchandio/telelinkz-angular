import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TabStateService } from 'src/app/services/tabState/tab-state.service';
import { Tab } from 'src/app/services/tabState/tab-types';
import { Card } from '../../../types/common-types';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  templateUrl: './dashboard-Kinetic.component.html',
  styleUrls: ['./dashboard-Kinetic.component.css'],
})

// This is the main component for xfininty all other components are using
// being routed through router outlet in this component
export class KineticDashboardComponent implements OnInit, OnDestroy {
  tabs: Tab[] = [];
  cards: Card[] = [
    {
      title: 'New Sale',
      icon: 'add_shopping_cart',
      route: 'kinetic/new-sale',
      label: 'Navigate to New Sale',
    },
    {
      title: 'kinetic Sale Filter',
      icon: 'filter_alt',
      route: 'kinetic/filter',
      label: 'Navigate to kinetic Sale Filter',
    },
    {
      title: 'Input New File',
      icon: 'insert_drive_file',
      route: 'kinetic/input-new-file',
      label: 'Navigate to Input New File',
    },
    {
      title: 'Agent Review',
      icon: 'rate_review',
      route: 'kinetic/agent-review',
      label: 'Navigate to Agent Review',
    },
    {
      title: 'kinetic Statistics',
      icon: 'bar_chart',
      route: 'kinetic/statistics',
      label: 'Navigate to kinetic Statistics',
    },
    {
      title: 'kinetic Insights',
      icon: 'insights',
      route: 'kinetic/insights',
      label: 'Navigate to kinetic Insights',
    },
    {
      title: 'Unfinished Leads',
      icon: 'warning',
      route: 'kinetic/unfinished-leads',
      label: 'Navigate to Unfinished Leads',
    },
  ];
  selectedIndex: number = 0;
  private tabSubscription: Subscription = new Subscription();
  private routeSubscription: Subscription = new Subscription();
  currentUrl: string = '';

  constructor(
    private router: Router,
    private tabStateService: TabStateService
  ) {}

  ngOnInit(): void {
    this.tabSubscription.add(
      this.tabStateService.tabs$['kinetic'].subscribe((tabs) => {
        this.tabs = tabs;
      })
    );

    this.tabSubscription.add(
      this.tabStateService.selectedIndex$['kinetic'].subscribe((index) => {
        this.selectedIndex = index;
      })
    );

    // Update selected index based on route on component initialization and
    // update the current url on route change event
    this.tabStateService.updateSelectedIndexBasedOnRoute(
      'kinetic',
      this.router.url
    );
  }

  openTab(card: any): void {
    this.tabStateService.openTab('kinetic', {
      title: card.title,
      route: card.route,
      queryParams: {}, // Add any necessary query params here
    });
  }

  selectTab(index: number): void {
    this.tabStateService.selectTab('kinetic', index);
  }

  getCurrentUrl(): void {
    this.currentUrl = this.router.url;
    // it return something like -> /frontier/new-sale capitalize this
    // this.currentUrl = this.currentUrl.split('/')[1];
    this.currentUrl = this.currentUrl.toUpperCase().slice(1);
    console.log(this.currentUrl);
  }

  ngOnDestroy(): void {
    this.tabSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
