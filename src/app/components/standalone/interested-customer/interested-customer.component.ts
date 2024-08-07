import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface InterestedCustomerInput {
  name: string;
  phoneNumber: string;
  email: string;
  interestedProducts: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  comments: string;
  cx_firstName: string;
  cx_lastName: string;
  addressLine2: string;
  SSN: string;
  DOB: string;
  callbackDate: Date | string;
  callbackTime: Date | string;
}

@Component({
  selector: 'app-interested-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './interested-customer.component.html',
  styleUrls: ['./interested-customer.component.css'],
})
export class InterestedCustomerComponent {
  interestedCustomerInput: InterestedCustomerInput = {
    name: '',
    phoneNumber: '',
    email: '',
    interestedProducts: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    comments: '',
    cx_firstName: '',
    cx_lastName: '',
    addressLine2: '',
    SSN: '',
    DOB: '',
    callbackDate: '',
    callbackTime: '',
  };

  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  constructor() {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log(
        'Interested customer created successfully:',
        this.interestedCustomerInput
      );
      // Handle form submission, e.g., call an API to save the lead
    } else {
      console.error('Form is invalid');
    }
  }
}
