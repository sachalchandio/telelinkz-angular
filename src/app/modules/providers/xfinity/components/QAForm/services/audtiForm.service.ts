import { Injectable } from '@angular/core';
import { MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  AuditForm,
  CreateAuditFormGQL,
  CreateAuditFormInput,
  CreateAuditFormMutation,
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

  // submitAudit(
  //   formData: CreateAuditFormInput
  // ): Observable<{ createAuditForm: AuditForm }> {
  //   return this.createAuditFormGQL.mutate({ createAuditFormInput: formData });
  // }

  submitAudit(
    formData: CreateAuditFormInput
  ): Observable<MutationResult<CreateAuditFormMutation>> {
    return this.createAuditFormGQL.mutate({ CreateAuditFormInput: formData });
  }

  // updateAudit(formData: UpdateAuditFormInput): Observable<{ updateAuditForm: AuditForm }> {
  //   return this.updateAuditFormGQL.mutate({ UpdateAuditFormInput: formData });
  // }
}
