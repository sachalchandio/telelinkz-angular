export interface OriginalError {
  statusCode: number;
  error: string;
  message: string[];
}

export interface GraphQLErrorExtensions {
  code: string;
  stacktrace: string[];
  originalError: OriginalError;
}

export interface GraphQLError {
  message: string;
  locations: { line: number; column: number }[];
  path: string[];
  extensions: GraphQLErrorExtensions;
}

export interface GraphQLResponse {
  graphQLErrors: GraphQLError[];
  // other properties...
}
