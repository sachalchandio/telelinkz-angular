import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { TabStateService } from '../services/tabState/tab-state.service';

@Injectable({
  providedIn: 'root',
})
export class TabResolver implements Resolve<void> {
  constructor(private tabStateService: TabStateService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    console.log('TabResolver called');
    const url = state.url;
    console.log('URL:', url);
    if (url.startsWith('/xfinity')) {
      console.log('Updating xfinity tab');
      this.tabStateService.updateSelectedIndexBasedOnRoute('xfinity', url);
    } else if (url.startsWith('/atnt')) {
      console.log('Updating atnt tab');
      this.tabStateService.updateSelectedIndexBasedOnRoute('atnt', url);
    }
  }
}
