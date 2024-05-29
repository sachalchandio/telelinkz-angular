import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

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
export class SaleJourneyComponent implements OnInit {
  saleHistory: any[] = [];
  saleId: string | null = null;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.saleId = params.get('saleId');
      if (this.saleId) {
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
}
