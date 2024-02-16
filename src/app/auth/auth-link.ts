// import { ApolloLink } from '@apollo/client';
// import { HttpHeaders } from '@angular/common/http';
// import { AuthenticationService } from './auth.service';

// export function createAuthLink(authService: AuthenticationService): ApolloLink {
//   return new ApolloLink((operation, forward) => {
//     const token = authService.getToken();
//     operation.setContext({
//       headers: new HttpHeaders().append('Authorization', `Bearer ${token}`),
//     });
//     return forward(operation);
//   });
// }
