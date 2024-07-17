import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApolloQueryResult } from '@apollo/client/core';
import { Subscription } from 'rxjs'; // Import Subscription from rxjs
import { GraphQLResponse } from 'src/app/types/gqlError';
import { LoginUserGQL, LoginUserQuery } from 'src/generated/graphqlTypes';
import { MatDialog } from '@angular/material/dialog';
// import { UserRegComponent } from 'src/app/modules/UserReg/components/';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setUserType } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MatSnackBar],
})
export class LoginComponent implements OnDestroy {
  loginForm!: FormGroup;
  toggleForm!: FormGroup; // Define the toggleForm group
  private subscription = new Subscription();
  private accessToken: string | undefined;
  rememberMe: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private loginUserGQL: LoginUserGQL,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [new FormControl(false)],
    });
  }

  // Function to login the user and store the access token in localStorage
  // if rememberMe is true or in the store if rememberMe is false or not set at all (default)
  loginUser() {
    if (this.loginForm.valid) {
      const input = this.loginForm.value;

      // Execute the query using Apollo Angular's service
      const loginSubscription = this.loginUserGQL
        .watch({
          email: input.email,
          password: input.password,
        })
        .valueChanges.subscribe({
          next: (result: ApolloQueryResult<LoginUserQuery>) => {
            const data = result.data;
            if (data?.loginUser) {
              this.accessToken = data.loginUser.accessToken;
              // Handle successful login, e.g., redirect the user
              if (this.accessToken) {
                if (this.rememberMe) {
                  // Store the access token in localStorage
                  localStorage.setItem('accessToken', this.accessToken);
                  const loginData = {
                    accessToken: this.accessToken,
                    name: data.loginUser.name,
                    email: data.loginUser.email,
                    userType: data.loginUser.userType,
                    profileImageURL: data.loginUser.profileImageURL,
                    dateOfBirth: data.loginUser.dateOfBirth,
                  };
                  // Store Certain Data for later use
                  localStorage.setItem('loginData', JSON.stringify(loginData));
                  localStorage.setItem('email', loginData.email || '');

                  // Instead of Storing userType in localStorage, dispatch an action to set the userType in the store
                  // Dispatch action to set the user type
                  this.store.dispatch(
                    setUserType({ userType: loginData.userType || '' })
                  );
                  //localStorage.setItem('userType', loginData.userType || '');

                  // Retrieve the loginData from localStorage
                  const storedLoginData = localStorage.getItem('loginData');

                  if (storedLoginData) {
                    localStorage.setItem(
                      'agent',
                      JSON.parse(storedLoginData).name || ''
                    );
                  }
                }
                //Display a snackbar message and redirect the user
                this.snackBar.open('Login Successful', 'Close', {
                  duration: 3000,
                  panelClass: ['custom-snackbar'],
                });

                this.dialog.closeAll();
                this.router.navigate(['/']);
              }
            }
          },
          error: (error: GraphQLResponse) => {
            console.error('GraphQL Error:', error.graphQLErrors[0]);
            // Handle error, e.g., display a snackbar message
            const graphQLError = error.graphQLErrors && error.graphQLErrors[0];
            const originalError = graphQLError?.extensions?.originalError;
            const backendErrorMessage =
              originalError?.message?.[0] || 'Some HTTP Exception';

            this.snackBar.open(backendErrorMessage, 'Close', {
              duration: 3000,
              panelClass: ['custom-snackbar'],
            });
          },
        });

      this.subscription.add(loginSubscription);
    } else {
      // Handle form validation failure
      // Form is invalid, show error messages
      const emailErrorMessage = this.getErrorMessage('email');
      const passwordErrorMessage = this.getErrorMessage('password');
      if (emailErrorMessage) {
        this.snackBar.open(emailErrorMessage, 'Close', {
          duration: 3000,
          panelClass: ['custom-snackbar'],
        });
      }

      if (passwordErrorMessage) {
        this.snackBar.open(passwordErrorMessage, 'Close', {
          duration: 3000,
          panelClass: ['custom-snackbar'],
        });
      }
    }
  }

  openRegisterModal(): void {
    this.dialog.closeAll();
    // const dialogRef = this.dialog.open(UserRegComponent, {});
  }

  // Function to change the value of rememberMe
  toggleRememberMe() {
    this.rememberMe = !this.rememberMe;
  }

  getErrorMessage(controlName: string) {
    const control = this.loginForm.get(controlName);

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe when the component is destroyed
  }
}
