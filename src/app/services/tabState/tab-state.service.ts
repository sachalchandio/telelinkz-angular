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
    const existingTabIndex = this.tabs.findIndex((t) => t.route === tab.route);
    if (existingTabIndex === -1) {
      this.tabs.push(tab);
      this.selectTab(this.tabs.length - 1);
    } else {
      this.selectTab(existingTabIndex);
    }
  }

  selectTab(index: number): void {
    this.selectedIndex = index;
    this.router.navigate([this.tabs[index].route]);
  }
}