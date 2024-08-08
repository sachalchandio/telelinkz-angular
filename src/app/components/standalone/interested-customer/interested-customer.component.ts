import { Component, OnInit } from '@angular/core';
import { InterestedCustomerService } from './interested-customer.service';
import {
  Provider,
  CreateInterestedCustomerInput,
} from '../../../../generated/graphqlTypes';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  standalone: true,
  selector: 'app-interested-customer',
  templateUrl: './interested-customer.component.html',
  styleUrls: ['./interested-customer.component.css'],
})
export class InterestedCustomerComponent implements OnInit {
  interestedCustomerForm: FormGroup;
  providers = Object.values(Provider);
  submitted = false;

  constructor(
    private interestedCustomerService: InterestedCustomerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.interestedCustomerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      ssn: ['', Validators.required],
      dob: ['', Validators.required],
      callbackDate: ['', Validators.required],
      callbackTime: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      provider: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true;
    if (this.interestedCustomerForm.valid) {
      const interestedCustomer: CreateInterestedCustomerInput =
        this.interestedCustomerForm.value;
      this.interestedCustomerService
        .createInterestedCustomer(interestedCustomer)
        .subscribe({
          next: (data) => {
            this.snackBar.open('Lead created successfully!', 'Close', {
              duration: 3000,
            });
            this.submitted = false;
            this.interestedCustomerForm.reset();
          },
          error: (err) => {
            this.snackBar.open(`Error: ${err.message}`, 'Close', {
              duration: 3000,
            });
            console.error(err);
          },
        });
    } else {
      this.snackBar.open('Please fill all required fields', 'Close', {
        duration: 3000,
      });
    }
  }

  get f() {
    return this.interestedCustomerForm.controls;
  }
}
