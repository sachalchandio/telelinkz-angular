import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import {
  UserType,
  RegisterUserResponseDto,
  RegisterUserGQL,
} from 'src/generated/graphqlTypes';
import { Subscription } from 'rxjs'; // Import Subscription from rxjs
import { MatSnackBar } from '@angular/material/snack-bar';
import { GraphQLResponse } from '../../../../types/gqlError';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/modules/login/components';
import { Router } from '@angular/router';

@Component({
  selector: 'userReg',
  templateUrl: './userReg.component.html',
  styleUrls: ['./userReg.component.css'],
  providers: [MatSnackBar],
})
export class UserRegComponent implements OnDestroy {
  // Implement OnDestroy lifecycle hook
  registerForm!: FormGroup;
  private subscription = new Subscription(); // Create a Subscription instance
  private accessToken = '';
  // userTypes = Object.values(UserType);

  constructor(
    private formBuilder: FormBuilder,
    private registerUserGQL: RegisterUserGQL,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.minLength(5),
            Validators.maxLength(99),
          ],
        ],
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(49),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(200),
          ],
        ], // Set minimum and maximum lengths
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(200),
          ],
        ], // Set minimum and maximum lengths
        userType: [UserType.Developer, Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  registerUser() {
    if (this.registerForm.valid) {
      const input = this.registerForm.value;
      const registerSubscription = this.registerUserGQL
        .mutate({ input })
        .subscribe({
          next: (result) => {
            if (result.data?.registerUser) {
              const responseData: RegisterUserResponseDto =
                result.data.registerUser;

              const data = result.data;
              this.accessToken = responseData.accessToken;
              localStorage.setItem('accessToken', this.accessToken);
              const loginData = {
                accessToken: this.accessToken,
                name: data.registerUser.name,
                email: data.registerUser.email,
                userType: data.registerUser.userType,
              };

              localStorage.setItem('loginData', JSON.stringify(loginData));
              localStorage.setItem('email', loginData.email || '');
              localStorage.setItem('resume_id', '');

              this.snackBar.open('Registration successful!', 'Close', {
                duration: 3000,
              });
              this.dialog.closeAll();
              this.router.navigate(['/cv-upload']);
            }
          },
          error: (error: GraphQLResponse) => {
            const graphQLError = error.graphQLErrors && error.graphQLErrors[0];
            const originalError = graphQLError?.extensions?.originalError;
            const backendErrorMessage =
              originalError?.message?.[0] || 'Some HTTP Exception';
            this.snackBar.open(backendErrorMessage, 'Close', {
              duration: 3000,
            });
            if (error) {
              this.snackBar.open(backendErrorMessage, 'Close', {
                duration: 3000,
              });
            } else {
              this.snackBar.open('An unknown error occurred', 'Close', {
                duration: 3000,
              });
            }
          },
        });
      this.subscription.add(registerSubscription);
    } else {
      // Handle form validation failure
      const emailErrorMessage = this.getErrorMessage('email');
      const passwordErrorMessage = this.getErrorMessage('password');
      const confirmPasswordErrorMessage =
        this.getErrorMessage('confirmPassword');
      const nameErrorMessage = this.getErrorMessage('name');

      if (emailErrorMessage) {
        this.snackBar.open(emailErrorMessage, 'Close', {
          duration: 3000,
        });
      }

      if (passwordErrorMessage) {
        this.snackBar.open(passwordErrorMessage, 'Close', {
          duration: 3000,
        });
      }

      if (confirmPasswordErrorMessage) {
        this.snackBar.open(confirmPasswordErrorMessage, 'Close', {
          duration: 3000,
        });
      }

      if (nameErrorMessage) {
        this.snackBar.open(nameErrorMessage, 'Close', {
          duration: 3000,
        });
      }
    }
  }

  openSignin(): void {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(LoginComponent, {});
  }

  getErrorMessage(controlName: string) {
    const control = this.registerForm.get(controlName);

    if (control && control.invalid) {
      if (control.hasError('required')) {
        return `${controlName} is required`;
      }
      if (control.hasError('email')) {
        return 'Invalid email format';
      }
      if (control.hasError('minlength')) {
        return `Password must be at least ${control.errors?.['minlength'].requiredLength} characters long`;
      }
    }
    return '';
  }

  private passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null; // Passwords match, no validation error
    } else {
      return { passwordMismatch: true }; // Passwords do not match, validation error
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe when the component is destroyed
  }
}
