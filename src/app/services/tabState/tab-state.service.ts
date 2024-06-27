import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TabStateService {
  tabs: any[] = [{ title: 'Xfinity', route: 'xfinity' }];
  selectedIndex: number = 0;

  private state: { [key: string]: any } = {};

  constructor(private router: Router) {}

  setState(tab: string, state: any): void {
    this.state[tab] = state;
  }

  getState(tab: string): any {
    return this.state[tab];
  }

  hasState(tab: string): boolean {
    return this.state.hasOwnProperty(tab);
  }

  openTab(tab: any): void {
    // Check if the tab is already open
    const existingTabIndex = this.tabs.findIndex(
      (t) =>
        t.route === tab.route &&
        JSON.stringify(t.queryParams) === JSON.stringify(tab.queryParams)
    );

    // If the tab is not open, add it to the tabs array
    if (existingTabIndex === -1) {
      this.tabs.push(tab);
      console.log(this.tabs);
      this.selectTab(this.tabs.length - 1);
    }

    // If the tab is open, select it
    else {
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
