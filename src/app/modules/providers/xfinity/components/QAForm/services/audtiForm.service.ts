import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AuditForm,
  CreateAuditFormGQL,
  CreateAuditFormInput,
  UpdateAuditFormGQL,
} from 'src/generated/graphqlTypes';

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  constructor(
    private createAuditFormGQL: CreateAuditFormGQL,
    private updateAuditFormGQL: UpdateAuditFormGQL
  ) {}

  submitAudit(
    formData: CreateAuditFormInput
  ): Observable<{ createAuditForm: AuditForm }> {
    return this.createAuditFormGQL.mutate({ createAuditFormInput: formData });
  }

  // updateAudit(formData: UpdateAuditFormInput): Observable<{ updateAuditForm: AuditForm }> {
  //   return this.updateAuditFormGQL.mutate({ UpdateAuditFormInput: formData });
  // }
}
