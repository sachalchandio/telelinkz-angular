import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tab } from './tab-types';

@Injectable({
  providedIn: 'root',
})
export class TabStateService {
  private tabsSubject: { [key: string]: BehaviorSubject<Tab[]> } = {
    xfinity: new BehaviorSubject<Tab[]>([
      { title: 'Xfinity', route: 'xfinity' },
    ]),
    atnt: new BehaviorSubject<Tab[]>([{ title: 'AT&T', route: 'atnt' }]),
    frontier: new BehaviorSubject<Tab[]>([{ title: 'Frontier', route: 'frontier' }]),
  };

  tabs$: { [key: string]: Observable<Tab[]> } = {
    xfinity: this.tabsSubject['xfinity'].asObservable(),
    atnt: this.tabsSubject['atnt'].asObservable(),
    frontier: this.tabsSubject['frontier'].asObservable(),
  };

  private selectedIndexSubject: { [key: string]: BehaviorSubject<number> } = {
    xfinity: new BehaviorSubject<number>(0),
    atnt: new BehaviorSubject<number>(0),
    frontier: new BehaviorSubject<number>(0),
  };
  selectedIndex$: { [key: string]: Observable<number> } = {
    xfinity: this.selectedIndexSubject['xfinity'].asObservable(),
    atnt: this.selectedIndexSubject['atnt'].asObservable(),
    frontier: this.selectedIndexSubject['frontier'].asObservable(),
  };

  private state: { [key: string]: { [key: string]: any } } = {
    xfinity: {},
    atnt: {},
    frontier: {},
  };

  constructor(private router: Router) {}

  setState(module: string, tab: string, state: any): void {
    this.state[module][tab] = state;
  }

  getState(module: string, tab: string): any {
    return this.state[module][tab];
  }

  hasState(module: string, tab: string): boolean {
    return this.state[module].hasOwnProperty(tab);
  }

  openTab(module: string, tab: any): void {
    const currentTabs = this.tabsSubject[module].value;
    const existingTabIndex = currentTabs.findIndex(
      (t) =>
        t.route === tab.route &&
        JSON.stringify(t.queryParams) === JSON.stringify(tab.queryParams)
    );

    if (existingTabIndex === -1) {
      this.tabsSubject[module].next([...currentTabs, tab]);
      this.selectTab(module, currentTabs.length);
    } else {
      this.selectTab(module, existingTabIndex);
    }
  }

  updateSelectedIndexBasedOnRoute(module: string, route: string): void {
    const currentTabs = this.tabsSubject[module].value;
    const index = currentTabs.findIndex((tab) => route.includes(tab.route));
    if (index !== -1 && this.selectedIndexSubject[module].value !== index) {
      this.selectTab(module, index);
    }
  }

  selectTab(module: string, index: number): void {
    if (this.selectedIndexSubject[module].value !== index) {
      this.selectedIndexSubject[module].next(index);
      const currentTabs = this.tabsSubject[module].value;
      if (index >= 0 && index < currentTabs.length) {
        this.router.navigate([currentTabs[index].route], {
          queryParams: currentTabs[index].queryParams,
        });
      }
    }
  }
}
