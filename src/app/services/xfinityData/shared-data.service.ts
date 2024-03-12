import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableData } from 'src/app/components/standalone/xfinityFilter/xfinity-filter.component';
import { XfinitySaleFilterInputDto } from 'src/generated/graphqlTypes';

@Injectable({
  providedIn: 'root',
})
export class XfinitySharedDataService {
  private displayedColumns = new BehaviorSubject<string[]>([]);
  private dataSource = new BehaviorSubject<TableData[]>([]);

  currentDisplayedColumns = this.displayedColumns.asObservable();
  currentData = this.dataSource.asObservable();

  constructor() {}

  updateDisplayedColumns(columns: string[]): void {
    this.displayedColumns.next(columns);
  }

  updateData(data: TableData[]): void {
    this.dataSource.next(data);
  }
}
