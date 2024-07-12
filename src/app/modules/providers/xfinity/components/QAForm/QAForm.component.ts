import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  providers = [
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

  packagesSold = [
    '5 Gig',
    '2 Gig',
    '1200 Mbps',
    '1 Gig',
    '500 Mbps',
    '800 Mbps',
    '400 Mbps',
    '300 Mbps',
    '200 Mbps',
    '100 Mbps',
    '75 Mbps',
    '50 Mbps',
    '30 Mbps',
    '25 Mbps',
    '18 Mbps',
    '10 Mbps',
    '5 Mbps or Less',
    'Wireless',
  ];
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['data']) {
        this.saleDetails = JSON.parse(params['data']);
      }
    });

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
      provider: ['Comcast - Xfinity', Validators.required],
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
