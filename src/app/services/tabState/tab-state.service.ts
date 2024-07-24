import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tab } from './tab-types';

@Injectable({
  providedIn: 'root',
})
export class TabStateService {
  // private subject to store the tabs array in the service
  // and emit the new tabs array whenever it changes (when a new tab is opened or a tab is closed)
  private tabsSubject: { [key: string]: BehaviorSubject<Tab[]> } = {
    xfinity: new BehaviorSubject<Tab[]>([
      { title: 'Xfinity', route: 'xfinity' },
    ]),
    atnt: new BehaviorSubject<any[]>([{ title: 'AT&T', route: 'atnt' }]),
  };

  // observable that emits the current tabs array whenever it changes (when a new tab is opened or a tab is closed)
  tabs$: { [key: string]: Observable<Tab[]> } = {
    xfinity: this.tabsSubject['xfinity'].asObservable(),
    atnt: this.tabsSubject['atnt'].asObservable(),
  };

  // observable that emits the index of the currently selected tab whenever it changes
  private selectedIndexSubject: { [key: string]: BehaviorSubject<number> } = {
    xfinity: new BehaviorSubject<number>(0),
    atnt: new BehaviorSubject<number>(0),
  };
  selectedIndex$: { [key: string]: Observable<number> } = {
    xfinity: this.selectedIndexSubject['xfinity'].asObservable(),
    atnt: this.selectedIndexSubject['atnt'].asObservable(),
  };

  // private state object to store the state of each tab
  private state: { [key: string]: { [key: string]: any } } = {
    xfinity: {},
    atnt: {},
  };

  constructor(private router: Router) {}

  // set the state of a tab
  setState(module: string, tab: string, state: any): void {
    this.state[module][tab] = state;
  }

  // get the state of a tab
  getState(module: string, tab: string): any {
    return this.state[module][tab];
  }

  // check if a tab has state stored in the service or not
  hasState(module: string, tab: string): boolean {
    return this.state[module].hasOwnProperty(tab);
  }

  // open a tab
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

  // remove the tab at the specified index from the tabs array and navigate to the
  // tab at the new selected index if necessary (if the closed tab was the currently selected tab)
  selectTab(module: string, index: number): void {
    this.selectedIndexSubject[module].next(index);
    const currentTabs = this.tabsSubject[module].value;
    if (index >= 0 && index < currentTabs.length) {
      this.router.navigate([currentTabs[index].route], {
        queryParams: currentTabs[index].queryParams,
      });
    }
  }
}
