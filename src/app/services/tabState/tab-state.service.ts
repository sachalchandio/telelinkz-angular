import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabStateService {
  private tabsSubject = new BehaviorSubject<any[]>([
    { title: 'Xfinity', route: 'xfinity' },
  ]);
  tabs$: Observable<any[]> = this.tabsSubject.asObservable();

  private selectedIndexSubject = new BehaviorSubject<number>(0);
  selectedIndex$: Observable<number> = this.selectedIndexSubject.asObservable();

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
