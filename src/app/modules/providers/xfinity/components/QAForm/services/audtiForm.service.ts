import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  constructor(private http: HttpClient) {}

  submitAudit(auditData: any): Observable<any> {
    return this.http.post('/api/audit', auditData);
  }
}
