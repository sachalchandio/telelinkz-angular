import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Store } from '@ngrx/store';
import { setSaleDetails } from 'src/app/store/actions/sale.actions';
import { TabStateService } from 'src/app/services/tabState/tab-state.service';
import { GetSaleHistoryDocument } from 'src/generated/graphqlTypes';

@Component({
  selector: 'app-sale-journey',
  templateUrl: './saleJourney.component.html',
  styleUrls: ['./saleJourney.component.css'],
})
export class SaleJourneyComponent implements OnInit, OnDestroy {
  saleHistory: any[] = [];
  saleDetails: any;
  saleId: string | null = null;
  moduleName: string = 'xfinity'; // Assume this component is for the Xfinity module

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private router: Router,
    private store: Store,
    private tabStateService: TabStateService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.saleId = params.get('saleId');
      const saleData = params.get('data');
      if (this.saleId && saleData) {
        this.saleDetails = JSON.parse(saleData);
        this.store.dispatch(setSaleDetails({ saleDetails: this.saleDetails }));
        this.restoreTabState();
        this.fetchSaleHistory();
      }
    });
  }

  fetchSaleHistory(): void {
    this.apollo
      .watchQuery({
        query: GetSaleHistoryDocument,
        variables: {
          saleId: this.saleId,
        },
      })
      .valueChanges.subscribe((result: any) => {
        this.saleHistory = result?.data?.getSaleHistory || [];
        this.saveTabState();
      });
  }

  formatTimestamp(timestamp: string): string {
    return new Date(timestamp).toLocaleString('en-US', {
      timeZone: 'America/Denver', // Adjust as necessary
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  formatHistoryEntry(entry: any): string {
    const timestamp = this.formatTimestamp(entry.timestamp);
    return `API added a note - ${timestamp} Changing status to ${entry.stage} by ${entry.user.name}`;
  }

  saveTabState(): void {
    this.tabStateService.setState(
      'xfinity',
      `${this.moduleName}-sale-journey-${this.saleId}`,
      {
        saleHistory: this.saleHistory,
      }
    );
  }

  restoreTabState(): void {
    if (
      this.tabStateService.hasState(
        'xfinity',
        `${this.moduleName}-sale-journey-${this.saleId}`
      )
    ) {
      const state = this.tabStateService.getState(
        'xfinity',
        `${this.moduleName}-sale-journey-${this.saleId}`
      );
      this.saleHistory = state.saleHistory;
    }
  }

  ngOnDestroy(): void {
    this.saveTabState();
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  navigateToAuditForm(): void {
    console.log('Dispatching sale details:', this.saleDetails); // Add this line
    this.store.dispatch(setSaleDetails({ saleDetails: this.saleDetails }));
    this.router.navigate(['/xfinity/audit-form'], {
      queryParams: { data: JSON.stringify(this.saleDetails) },
    });
  }
}
