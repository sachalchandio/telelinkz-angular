import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectSaleDetails } from 'src/app/store/selectors/sale.selectors';
import { AuditService } from './services/audtiForm.service';

@Component({
  selector: 'app-audit-form',
  templateUrl: './QAForm.component.html',
  styleUrls: ['./QAForm.component.css'],
})
export class AuditFormComponent implements OnInit {
  auditForm!: FormGroup;
  saleDetails: any = {};

  auditors = [
    'Adnan',
    'Kashaf',
    'Ahmad - US',
    'Zunair',
    'Tahreema',
    'Umair',
    'Shoaib',
  ];
  auditTypes = ['Non Sale', 'Sale'];
  callTypes = ['Sale Call', 'Potential Sale Call', 'CS Call', 'CS to Sale'];
  yesNoOptions = ['Yes', 'No'];
  yesNoNaOptions = ['Yes', 'No', 'N/A'];
  upsellingOptions = [
    'Video - TV',
    'Home Phone',
    'Home Security',
    'Mobile Line',
    'Not Applicable',
  ];

  constructor(
    private fb: FormBuilder,
    private auditService: AuditService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectSaleDetails).subscribe((details) => {
      console.log('Selected sale details:', details); // Add this line
      if (details) {
        this.saleDetails = details;
        this.initForm();
      }
    });
  }

  initForm(): void {
    this.auditForm = this.fb.group({
      auditBy: ['', Validators.required],
      auditType: ['Sale', Validators.required],
      callType: [''],
      agentName: [
        { value: this.saleDetails['Agent Name'] || '', disabled: true },
        Validators.required,
      ],
      callDate: [
        {
          value: this.formatDate(this.saleDetails['Order Date']),
          disabled: true,
        },
        Validators.required,
      ],
      auditDate: ['', Validators.required],
      provider: ['Xfinity', Validators.required],
      phoneNumber: [
        { value: this.saleDetails['Phone Number'] || '', disabled: true },
        Validators.required,
      ],
      callDuration: ['', Validators.required],
      callDisposition: ['', Validators.required],
      customerAddress: [{ value: this.getFullAddress(), disabled: true }],
      findings: [''],
      customerName: this.fb.group({
        first: [
          {
            value: this.saleDetails['Customer First Name'] || '',
            disabled: true,
          },
        ],
        last: [
          {
            value: this.saleDetails['Customer Last Name'] || '',
            disabled: true,
          },
        ],
      }),
      packageSold: [
        { value: this.saleDetails['Package Sold'] || '', disabled: true },
      ],
      cabletvPackage: [''],
      phoneAdded: [''],
      recordedLine: [''],
      consentForCallback: [''],
      creditCheckConsent: [''],
      contractTermMentioned: [''],
      anyFalsifications: [''],
      topDownSelling: [''],
      customerUsageProbing: [''],
      packageDetailsExplained: [''],
      paymentCartTotalMentioned: [''],
      anyUpselling: [''],
      agentEnergeticBehavior: ['', Validators.required],
      deadAirMoreThanNormal: [''],
      tookTooMuchTimeInAddressCheck: [''],
      improvementAreas: [''],
    });

    // Set disabled state for packageSold control
    this.auditForm.get('packageSold')?.disable();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  getFullAddress(): string {
    return `${this.saleDetails['Street Address']}, ${this.saleDetails['City']}, ${this.saleDetails['State']} ${this.saleDetails['Zipcode']}`;
  }

  onSubmit(): void {
    if (this.auditForm.valid) {
      const formData = {
        ...this.auditForm.value,
        saleId: this.saleDetails['ID'],
      };
      this.auditService.submitAudit(formData).subscribe(
        (response: Response) => {
          console.log('Audit submitted successfully', response);
          // Handle success (e.g., show a success message, navigate back to the sales journey)
        },
        (error: Error) => {
          console.error('Error submitting audit', error);
          // Handle error (e.g., show an error message)
        }
      );
    }
  }
}
