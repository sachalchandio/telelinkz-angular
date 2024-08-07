import { Component, OnInit } from '@angular/core';
import { InterestedCustomerService } from './interested-customer.service';
import {
  // InterestedCustomer,
  Provider,
  CreateInterestedCustomerInput,
} from '../../../../generated/graphqlTypes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  selector: 'app-interested-customer',
  templateUrl: './interested-customer.component.html',
  styleUrls: ['./interested-customer.component.css'],
})
export class InterestedCustomerComponent implements OnInit {
  interestedCustomer: CreateInterestedCustomerInput = {
    firstName: '',
    lastName: '',
    ssn: '',
    dob: '',
    callbackDate: '',
    callbackTime: '',
    phoneNumber: '',
    email: '',
    provider: Provider.Adt,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    comments: '',
  };
  providers = Object.values(Provider);
  submitted = false;

  constructor(private interestedCustomerService: InterestedCustomerService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.interestedCustomerService
      .createInterestedCustomer(this.interestedCustomer)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.submitted = true;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  newCustomer(): void {
    this.submitted = false;
    this.interestedCustomer = {
      firstName: '',
      lastName: '',
      ssn: '',
      dob: '',
      callbackDate: '',
      callbackTime: '',
      phoneNumber: '',
      email: '',
      provider: Provider.Adt,
      address: '',
      city: '',
      state: '',
      zipCode: '',
      comments: '',
    };
  }
}
