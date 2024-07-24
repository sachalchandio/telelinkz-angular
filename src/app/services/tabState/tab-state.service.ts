import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabStateService {
  // private subject to store the tabs array in the service
  // and emit the new tabs array whenever it changes (when a new tab is opened or a tab is closed)
  private tabsSubject = new BehaviorSubject<any[]>([
    { title: 'Xfinity', route: 'xfinity' },
  ]);

  // observable that emits the current tabs array whenever it changes (when a new tab is opened or a tab is closed)
  tabs$: Observable<any[]> = this.tabsSubject.asObservable();

  // observable that emits the index of the currently selected tab whenever it changes
  private selectedIndexSubject = new BehaviorSubject<number>(0);
  selectedIndex$: Observable<number> = this.selectedIndexSubject.asObservable();

  // private state object to store the state of each tab
  private state: { [key: string]: any } = {};

  constructor(private router: Router) {}

  // set the state of a tab
  setState(tab: string, state: any): void {
    this.state[tab] = state;
  }

  // get the state of a tab
  getState(tab: string): any {
    return this.state[tab];
  }

  // check if a tab has state stored in the service or not
  hasState(tab: string): boolean {
    return this.state.hasOwnProperty(tab);
  }

  // remove the state of a tab from the service when the tab is closed by the user or
  // programmatically by the application logic (e.g., when the user logs out) to prevent memory leaks
  openTab(tab: any): void {
    const currentTabs = this.tabsSubject.value;
    const existingTabIndex = currentTabs.findIndex(
      (t) =>
        t.route === tab.route &&
        JSON.stringify(t.queryParams) === JSON.stringify(tab.queryParams)
    );

    if (existingTabIndex === -1) {
      this.tabsSubject.next([...currentTabs, tab]);
      this.selectTab(currentTabs.length);
    } else {
      this.selectTab(existingTabIndex);
    }
  }

  // remove the tab at the specified index from the tabs array and navigate to the
  // tab at the new selected index if necessary (if the closed tab was the currently selected tab)
  selectTab(index: number): void {
    this.selectedIndexSubject.next(index);
    const currentTabs = this.tabsSubject.value;
    if (index >= 0 && index < currentTabs.length) {
      this.router.navigate([currentTabs[index].route], {
        queryParams: currentTabs[index].queryParams,
      });
    }
  }
}
