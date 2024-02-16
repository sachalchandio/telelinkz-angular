import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private companySizeSubject = new BehaviorSubject<string>('');
  companySize$ = this.companySizeSubject.asObservable();

  setCompanySize(size: string) {
    this.companySizeSubject.next(size);
  }
}
