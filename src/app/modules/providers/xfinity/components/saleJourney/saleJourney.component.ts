import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { TabStateService } from 'src/app/services/tabState/tab-state.service';

const GET_SALE_HISTORY = gql`
  query GetSaleHistory($saleId: String!) {
    getSaleHistory(saleId: $saleId) {
      stage
      timestamp
      user {
        name
      }
      saleId
      saleType
    }
  }
`;

@Component({
  selector: 'app-sale-journey',
  templateUrl: './saleJourney.component.html',
  styleUrls: ['./saleJourney.component.css'],
})
export class SaleJourneyComponent implements OnInit, OnDestroy {
  saleHistory: any[] = [];
  saleDetails: any;
  saleId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private tabStateService: TabStateService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.saleId = params.get('saleId');
      const saleData = params.get('data');
      if (this.saleId && saleData) {
        this.saleDetails = JSON.parse(saleData);
        this.restoreTabState();
        this.fetchSaleHistory();
      }
    });
  }

  fetchSaleHistory(): void {
    this.apollo
      .watchQuery({
        query: GET_SALE_HISTORY,
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
    this.tabStateService.setState(`sale-journey-${this.saleId}`, {
      saleHistory: this.saleHistory,
    });
  }

  restoreTabState(): void {
    if (this.tabStateService.hasState(`sale-journey-${this.saleId}`)) {
      const state = this.tabStateService.getState(
        `sale-journey-${this.saleId}`
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
}
