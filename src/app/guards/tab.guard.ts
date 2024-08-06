import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { TabStateService } from '../services/tabState/tab-state.service';

@Injectable({
  providedIn: 'root',
})
export class TabGuard implements CanActivate {
  constructor(private tabStateService: TabStateService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url = state.url;

    if (url.startsWith('/xfinity')) {
      this.tabStateService.selectTab('xfinity', this.getSelectedIndex(url));
    } else if (url.startsWith('/atnt')) {
      this.tabStateService.selectTab('atnt', this.getSelectedIndex(url));
    }

    return true;
  }

  private getSelectedIndex(url: string): number {
    if (url.includes('new-sale')) return 1;
    if (url.includes('filter')) return 2;
    return 0;
  }
}
