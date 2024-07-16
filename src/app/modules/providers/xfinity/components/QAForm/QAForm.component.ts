import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectSaleDetails } from 'src/app/store/selectors/sale.selectors';
import { AuditService } from './services/audtiForm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateAuditFormInput } from 'src/generated/graphqlTypes';

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

  // Constructor to inject the required services
  constructor(
    private fb: FormBuilder,
    private auditService: AuditService,
    private store: Store,
    private snackBar: MatSnackBar // Inject MatSnackBar service to show a snack bar message
  ) {}

  // Add the following ngOnInit method to subscribe to the sale details from the store and
  // initialize the audit form with the sale details when available in the store (saleDetails)
  // object from the store using the initForm method
  ngOnInit(): void {
    this.store.select(selectSaleDetails).subscribe((details) => {
      console.log('Selected sale details:', details); // Add this line
      if (details) {
        this.saleDetails = details;
        this.initForm();
      }
    });
  }

  // Add the following method to initialize the audit form with the sale details and set the initial values for the form controls based on the
  // sale details object received from the store (saleDetails) and the audit form structure defined in the template
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

  // Add the following method to format the date to 'YYYY-MM-DD' format
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  // Add the following method to get the full address of the customer from the sale details object
  // and return it as a string value (e.g., '123 Main St, City, State Zipcode')
  getFullAddress(): string {
    return `${this.saleDetails['Street Address']}, ${this.saleDetails['City']}, ${this.saleDetails['State']} ${this.saleDetails['Zipcode']}`;
  }

  // InOrder to update the audit form, we need to add the following method to update the audit form data to the server
  // using the audit service and handle the response accordingly (e.g., show a success message, navigate back to the sales journey)
  // onUpdateSubmit(): void {
  //   console.log(this.auditForm.value);
  //   if (this.auditForm.valid) {
  //     const formData = {
  //       ...this.auditForm.getRawValue(), // use getRawValue() to include disabled fields
  //       id: this.saleDetails['ID'],
  //     };
  //     this.auditService.updateAudit(formData).subscribe(
  //       (response) => {
  //         console.log('Audit updated successfully', response);
  //         // Handle success (e.g., show a success message, navigate back to the sales journey)
  //       },
  //       (error) => {
  //         console.error('Error updating audit', error);
  //         // Handle error (e.g., show an error message)
  //       }
  //     );
  //   }
  // }

  // Add the following method to submit the audit form data to the server using the audit service and handle the response accordingly
  // (e.g., show a success message, navigate back to the sales journey)
  onSubmit(): void {
    console.log(this.auditForm.value);
    if (this.auditForm.valid) {
      // Filter out any fields not defined in CreateAuditFormInput
      const allowedFields: (keyof CreateAuditFormInput)[] = [
        'auditBy',
        'auditType',
        'callType',
        'auditDate',
        'provider',
        'callDuration',
        'callDisposition',
        'findings',
        'cabletvPackage',
        'phoneAdded',
        'recordedLine',
        'consentForCallback',
        'creditCheckConsent',
        'contractTermMentioned',
        'anyFalsifications',
        'topDownSelling',
        'customerUsageProbing',
        'packageDetailsExplained',
        'paymentCartTotalMentioned',
        'anyUpselling',
        'agentEnergeticBehavior',
        'deadAirMoreThanNormal',
        'tookTooMuchTimeInAddressCheck',
        'improvementAreas',
        'saleId',
      ];

      const formData = {
        ...this.auditForm.getRawValue(), // use getRawValue() to include disabled fields
        saleId: this.saleDetails['ID'],
      };

      const filteredFormData: CreateAuditFormInput = allowedFields.reduce(
        (obj, key) => {
          obj[key] = formData[key];
          return obj;
        },
        {} as CreateAuditFormInput
      );

      this.auditService.submitAudit(filteredFormData).subscribe(
        (response) => {
          console.log('Audit submitted successfully', response);
          // Show success message
          this.snackBar.open('Audit submitted successfully', 'Close', {
            duration: 3000,
          });
          // Clear form except the disabled fields
          this.auditForm.reset({
            auditBy: '',
            auditType: 'Sale',
            callType: '',
            auditDate: '',
            callDuration: '',
            callDisposition: '',
            findings: '',
            cabletvPackage: '',
            phoneAdded: '',
            recordedLine: '',
            consentForCallback: '',
            creditCheckConsent: '',
            contractTermMentioned: '',
            anyFalsifications: '',
            topDownSelling: '',
            customerUsageProbing: '',
            packageDetailsExplained: '',
            paymentCartTotalMentioned: '',
            anyUpselling: '',
            agentEnergeticBehavior: '',
            deadAirMoreThanNormal: '',
            tookTooMuchTimeInAddressCheck: '',
            improvementAreas: '',
            agentName: this.saleDetails['Agent Name'],
            callDate: this.formatDate(this.saleDetails['Order Date']),
            provider: 'Xfinity',
            phoneNumber: this.saleDetails['Phone Number'],
            customerAddress: this.getFullAddress(),
            customerName: {
              first: this.saleDetails['Customer First Name'],
              last: this.saleDetails['Customer Last Name'],
            },
            packageSold: this.saleDetails['Package Sold'],
          });
        },
        (error) => {
          console.error('Error submitting audit', error);
          // Handle error (e.g., show an error message)
          this.snackBar.open('Error submitting audit', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }
}
