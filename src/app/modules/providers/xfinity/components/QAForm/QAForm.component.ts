import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuditService } from './services/audtiForm.service';

@Component({
  selector: 'app-audit-form',
  templateUrl: './audit-form.component.html',
  styleUrls: ['./audit-form.component.css'],
})
export class AuditFormComponent implements OnInit {
  auditForm!: FormGroup;
  auditors: string[] = [
    'Adnan',
    'Kashaf',
    'Ahmad - US',
    'Zunair',
    'Tahreema',
    'Umair',
    'Shoaib',
  ];
  auditTypes: string[] = ['Non Sale', 'Sale'];
  callTypes: string[] = [
    'Sale Call',
    'Potential Sale Call',
    'CS Call',
    'CS to Sale',
  ];
  agentNames: string[] = [
    'Rashid - Cris',
    'Haleem - Nick',
    'Zuraiz - Mark',
    'Fawad - Joe',
    'Bisma - Emma',
    'Shah Fahad - Frank',
    'Zuha - Vaneesa',
    'Abdullah - Victor',
    'Sehrish - Sarah',
    'Hammad - Adam',
    'Sakina - Audrey',
    'Ammar - Micheal',
    'Jawad - Jason',
  ];
  providers: string[] = [
    'Spectrum',
    'Spectrum Mobile',
    'Frontier',
    'AT&T',
    'AT&T Mobile',
    'ViaSat',
    'HughesNet',
    'Optimum',
    'WindStream',
    'EarthLink',
    'WoW',
    'Vivint',
    'Ziply',
    'MetroNet',
    'Fidium Fiber',
    'Comcast - Xfinity',
    'DIRECTV',
    'BrightSpeed',
    'Breezeline',
    'T-Mobile',
    'Alta Fiber',
  ];

  constructor(private fb: FormBuilder, private auditService: AuditService) {}

  ngOnInit(): void {
    this.auditForm = this.fb.group({
      auditBy: ['', Validators.required],
      auditType: ['', Validators.required],
      callType: ['', Validators.required],
      agentName: ['', Validators.required],
      callDate: ['', Validators.required],
      auditDate: ['', Validators.required],
      provider: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      callDuration: ['', Validators.required],
      callDisposition: ['', Validators.required],
      customerAddress: [''],
      findings: [''],
    });
  }

  onSubmit(): void {
    if (this.auditForm.valid) {
      this.auditService
        .submitAudit(this.auditForm.value)
        .subscribe((response) => {
          console.log('Audit submitted successfully', response);
        });
    }
  }
}
