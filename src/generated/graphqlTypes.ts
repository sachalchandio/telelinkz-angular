import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Suspended = 'SUSPENDED',
  Unverified = 'UNVERIFIED'
}

export type Comment = {
  __typename?: 'Comment';
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Field the comment is about */
  fieldName: SaleField;
  /** Primary ID */
  id: Scalars['ID']['output'];
  parentComment?: Maybe<Comment>;
  replies?: Maybe<Array<Comment>>;
  sale?: Maybe<XfinitySale>;
  /** Resolved status of the comment */
  status: CommentStatus;
  /** Leave a note */
  text: Scalars['String']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

/** Possible statuses of a comment */
export enum CommentStatus {
  Resolved = 'RESOLVED',
  Unresolved = 'UNRESOLVED'
}

export type CreateCommentInput = {
  fieldName: SaleField;
  parentCommentId?: InputMaybe<Scalars['ID']['input']>;
  saleId: Scalars['ID']['input'];
  status?: CommentStatus;
  text: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateXfinitySaleInput = {
  HMS: XfinityHomeSecurity;
  Internet: XfinityInternet;
  Phone: XfinityHomePhone;
  TV: XfinityTv;
  agentId: Scalars['String']['input'];
  city: Scalars['String']['input'];
  comcastTpvStatus: TpvStatus;
  concertOrderId: Scalars['String']['input'];
  cx_firstName: Scalars['String']['input'];
  cx_lastName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  installation: InstallationType;
  installationDate: Scalars['String']['input'];
  installationTime: Scalars['String']['input'];
  orderDate: Scalars['String']['input'];
  orderNumber: Scalars['String']['input'];
  packageSold: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  phoneNumber_second?: InputMaybe<Scalars['String']['input']>;
  product: Scalars['String']['input'];
  socialSecurityNumber?: InputMaybe<Scalars['String']['input']>;
  state: UsState;
  streetAddress: Scalars['String']['input'];
  streetAddressLine2?: InputMaybe<Scalars['String']['input']>;
  zipcode: Scalars['String']['input'];
};

/** Possible statuses of Installation */
export enum InstallationType {
  Complete = 'COMPLETE',
  ProInstallation = 'PRO_INSTALLATION',
  SelfInstallation = 'SELF_INSTALLATION',
  Undetermined = 'UNDETERMINED'
}

export type LoginUserInput = {
  /** User email */
  email: Scalars['String']['input'];
  /** User password */
  password: Scalars['String']['input'];
};

export type LoginUserResponse = {
  __typename?: 'LoginUserResponse';
  /** User JWT token */
  accessToken: Scalars['String']['output'];
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  profileImageURL?: Maybe<Scalars['String']['output']>;
  userType?: Maybe<UserType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changeSaleStage: Scalars['Boolean']['output'];
  createComment: Comment;
  createXfinitySale: XfinitySale;
  registerUser: RegisterUserResponseDto;
  removeComment: Scalars['Boolean']['output'];
  seedUsers?: Maybe<Array<User>>;
  updateComment: Comment;
  updateUser: UserDto;
};


export type MutationChangeSaleStageArgs = {
  newStage: SaleFlag;
  saleId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationCreateXfinitySaleArgs = {
  input: CreateXfinitySaleInput;
};


export type MutationRegisterUserArgs = {
  registerUserInput: RegisterUserInput;
};


export type MutationRemoveCommentArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCommentArgs = {
  id: Scalars['String']['input'];
  updateCommentInput: UpdateCommentInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  comment: Comment;
  comments: Array<Comment>;
  currentUser: UserDto;
  findAllSalesByAgentName: Array<XfinitySaleDto>;
  findSalesWithComplexFilter: Array<XfinitySaleDto>;
  getAllAgents: Array<UserDto>;
  getXfinitySaleById: XfinitySale;
  loginUser: LoginUserResponse;
};


export type QueryCommentArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindAllSalesByAgentNameArgs = {
  agentName: Scalars['String']['input'];
};


export type QueryFindSalesWithComplexFilterArgs = {
  filter: XfinitySaleFilterInputDto;
};


export type QueryGetXfinitySaleByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLoginUserArgs = {
  loginUserInput: LoginUserInput;
};

export type RegisterUserInput = {
  /** User confirmPassword */
  confirmPassword: Scalars['String']['input'];
  /** User email */
  email: Scalars['String']['input'];
  /** User name */
  name: Scalars['String']['input'];
  /** User password */
  password: Scalars['String']['input'];
  /** User type: "Developer" | "Admin" | "Manager" */
  userType: UserType;
};

export type RegisterUserResponseDto = {
  __typename?: 'RegisterUserResponseDto';
  /** User JWT token */
  accessToken: Scalars['String']['output'];
  /** User email */
  email: Scalars['String']['output'];
  /** User name */
  name: Scalars['String']['output'];
  /** User type */
  userType: UserType;
};

/** Possible statuses of a comment */
export enum SaleField {
  AgentId = 'AGENT_ID',
  City = 'CITY',
  CxFirstName = 'CX_FIRST_NAME',
  CxLastName = 'CX_LAST_NAME',
  Email = 'EMAIL',
  Hms = 'HMS',
  Installation = 'INSTALLATION',
  InstallationDate = 'INSTALLATION_DATE',
  InstallationTime = 'INSTALLATION_TIME',
  Internet = 'INTERNET',
  OrderDate = 'ORDER_DATE',
  OrderId = 'ORDER_ID',
  OrderNumber = 'ORDER_NUMBER',
  PackageSold = 'PACKAGE_SOLD',
  Phone = 'PHONE',
  PhoneNumber = 'PHONE_NUMBER',
  PhoneNumberSecond = 'PHONE_NUMBER_SECOND',
  Product = 'PRODUCT',
  SaleFlag = 'SALE_FLAG',
  SaleState = 'SALE_STATE',
  SocialSecurityNumber = 'SOCIAL_SECURITY_NUMBER',
  State = 'STATE',
  StreetAddress = 'STREET_ADDRESS',
  StreetAddressLine2 = 'STREET_ADDRESS_LINE2',
  TpvStatus = 'TPV_STATUS',
  Tv = 'TV',
  Zipcode = 'ZIPCODE'
}

/** Possible statuses of a sale */
export enum SaleFlag {
  Built = 'BUILT',
  Cancelled = 'CANCELLED',
  Complete = 'COMPLETE',
  OnHold = 'ON_HOLD',
  PendingInstall = 'PENDING_INSTALL',
  Sold = 'SOLD',
  Unassigned = 'UNASSIGNED'
}

export type SaleStageHistory = {
  __typename?: 'SaleStageHistory';
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** Sale that the stage change is associated with */
  sale: XfinitySale;
  /** Stage of the sale */
  stage: SaleFlag;
  /** Timestamp of the change */
  timestamp: Scalars['DateTime']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User who made the change */
  user: User;
};

/** TPV Status to confirm if it was completed successfully */
export enum TpvStatus {
  Complete = 'COMPLETE',
  Error = 'ERROR',
  Incomplete = 'INCOMPLETE',
  Pending = 'PENDING'
}

/** Possible US State */
export enum UsState {
  Ak = 'AK',
  Al = 'AL',
  Ar = 'AR',
  Az = 'AZ',
  Ca = 'CA',
  Co = 'CO',
  Ct = 'CT',
  De = 'DE',
  Fl = 'FL',
  Ga = 'GA',
  Hi = 'HI',
  Ia = 'IA',
  Id = 'ID',
  Il = 'IL',
  In = 'IN',
  Ks = 'KS',
  Ky = 'KY',
  La = 'LA',
  Ma = 'MA',
  Md = 'MD',
  Me = 'ME',
  Mi = 'MI',
  Mn = 'MN',
  Mo = 'MO',
  Ms = 'MS',
  Mt = 'MT',
  Nc = 'NC',
  Nd = 'ND',
  Ne = 'NE',
  Nh = 'NH',
  Nj = 'NJ',
  Nm = 'NM',
  Nv = 'NV',
  Ny = 'NY',
  Oh = 'OH',
  Ok = 'OK',
  Or = 'OR',
  Pa = 'PA',
  Ri = 'RI',
  Sc = 'SC',
  Sd = 'SD',
  Tn = 'TN',
  Tx = 'TX',
  Undetermined = 'UNDETERMINED',
  Ut = 'UT',
  Va = 'VA',
  Vt = 'VT',
  Wa = 'WA',
  Wi = 'WI',
  Wv = 'WV',
  Wy = 'WY'
}

export type UpdateCommentInput = {
  fieldName?: InputMaybe<SaleField>;
  parentCommentId?: InputMaybe<Scalars['ID']['input']>;
  saleId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<CommentStatus>;
  text?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateUserInput = {
  dateOfBirth?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  profileImageURL?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  /** User's account status: 'Active' | 'Deleted' | 'Suspended' | 'Unverified' */
  accountStatus: AccountStatus;
  /** User contact number */
  contactNumber?: Maybe<Scalars['Float']['output']>;
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Date of birth */
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  /** User's email */
  email: Scalars['String']['output'];
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** User's name */
  name: Scalars['String']['output'];
  /** User's password */
  password: Scalars['String']['output'];
  /** Profile Image URL */
  profileImageURL?: Maybe<Scalars['String']['output']>;
  /** The agent responsible for the sale */
  sale: XfinitySale;
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User type: 'Admin' | 'Manager' | 'QA' | 'Agent' */
  userType: Scalars['String']['output'];
};

export type UserDto = {
  __typename?: 'UserDto';
  dateOfBirth?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  profileImageURL?: Maybe<Scalars['String']['output']>;
  userType: UserType;
};

/** type of user that describes privileges */
export enum UserType {
  Admin = 'ADMIN',
  Agent = 'AGENT',
  Manager = 'MANAGER',
  Qa = 'QA'
}

/** Xfinity Home Phone options */
export enum XfinityHomePhone {
  None = 'NONE',
  XfinityVoice = 'XFINITY_VOICE'
}

/** Xfinity Home Security packages */
export enum XfinityHomeSecurity {
  HmsProtection = 'HMS_PROTECTION',
  HmsProtectionPlus = 'HMS_PROTECTION_PLUS',
  None = 'NONE'
}

/** List of available Xfinity Internet packages */
export enum XfinityInternet {
  Connect_75 = 'CONNECT_75',
  ConnectMore_200 = 'CONNECT_MORE_200',
  Fast_400 = 'FAST_400',
  Gigabit_1000 = 'GIGABIT_1000',
  GigabitExtra_1200 = 'GIGABIT_EXTRA_1200',
  GigabitX2_2000 = 'GIGABIT_X2_2000',
  None = 'NONE',
  Superfast_800 = 'SUPERFAST_800'
}

export type XfinitySale = {
  __typename?: 'XfinitySale';
  /** Xfinity HMS Package */
  HMS: Scalars['String']['output'];
  /** Xfinity Internet Package */
  Internet: Scalars['String']['output'];
  /** Xfinity Phone Package */
  Phone: Scalars['String']['output'];
  /** Xfinity TV Package */
  TV: Scalars['String']['output'];
  /** The agent responsible for the sale */
  agent: User;
  /** City of the installation address */
  city: Scalars['String']['output'];
  /** Comcast TPV status of the sale */
  comcastTpvStatus: Scalars['String']['output'];
  /** Comments related to the sale */
  comments: Array<Comment>;
  /** The unique concert order ID associated with the sale */
  concertOrderId: Scalars['String']['output'];
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The customer's first name */
  cx_firstName: Scalars['String']['output'];
  /** The customer's last name */
  cx_lastName: Scalars['String']['output'];
  /** Email address associated with the sale */
  email: Scalars['String']['output'];
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** Type of installation */
  installation: Scalars['String']['output'];
  /** The date when the installation is scheduled */
  installationDate: Scalars['DateTime']['output'];
  /** The time when the installation is scheduled */
  installationTime: Scalars['String']['output'];
  /** The date and time when the customer called and purchased services */
  orderDate: Scalars['DateTime']['output'];
  /** The unique order number associated with the sale */
  orderNumber: Scalars['String']['output'];
  /** Package sold with the sale */
  packageSold: Scalars['String']['output'];
  /** Phone number associated with the sale */
  phoneNumber: Scalars['String']['output'];
  /** Second Phone number associated with the sale */
  phoneNumber_second?: Maybe<Scalars['String']['output']>;
  /** Product associated with the sale */
  product: Scalars['String']['output'];
  /** Current state of the sale */
  saleState: SaleFlag;
  /** Social Security Number associated with the sale */
  socialSecurityNumber?: Maybe<Scalars['String']['output']>;
  /** History of stage changes */
  stageHistory?: Maybe<Array<SaleStageHistory>>;
  /** State of the installation address */
  state: Scalars['String']['output'];
  /** Street address for the installation */
  streetAddress: Scalars['String']['output'];
  /** Secondary line for street address (if applicable) */
  streetAddressLine2?: Maybe<Scalars['String']['output']>;
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Postal or Zip code of the installation address */
  zipcode: Scalars['String']['output'];
};

export type XfinitySaleDto = {
  __typename?: 'XfinitySaleDTO';
  HMS: XfinityHomeSecurity;
  Internet: XfinityInternet;
  Phone: XfinityHomePhone;
  TV: XfinityTv;
  agentName: Scalars['String']['output'];
  city: Scalars['String']['output'];
  comcastTpvStatus: TpvStatus;
  concertOrderId: Scalars['String']['output'];
  cx_firstName: Scalars['String']['output'];
  cx_lastName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  installation: Scalars['String']['output'];
  installationDateFormatted: Scalars['String']['output'];
  installationTime: Scalars['String']['output'];
  orderDate: Scalars['DateTime']['output'];
  orderNumber: Scalars['String']['output'];
  packageSold: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  phoneNumber_second?: Maybe<Scalars['String']['output']>;
  product: Scalars['String']['output'];
  socialSecurityNumber?: Maybe<Scalars['String']['output']>;
  state: UsState;
  streetAddress: Scalars['String']['output'];
  streetAddressLine2?: Maybe<Scalars['String']['output']>;
  zipcode: Scalars['String']['output'];
};

export type XfinitySaleFilterInputDto = {
  HMS?: InputMaybe<XfinityHomeSecurity>;
  Internet?: InputMaybe<XfinityInternet>;
  Phone?: InputMaybe<XfinityHomePhone>;
  TV?: InputMaybe<XfinityTv>;
  agentName?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  comcastTpvStatus?: InputMaybe<TpvStatus>;
  concertOrderId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  cx_firstName?: InputMaybe<Scalars['String']['input']>;
  cx_lastName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  installation?: InputMaybe<InstallationType>;
  installationDate?: InputMaybe<Scalars['String']['input']>;
  installationTime?: InputMaybe<Scalars['String']['input']>;
  orderDate?: InputMaybe<Scalars['String']['input']>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  packageSold?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  phoneNumber_second?: InputMaybe<Scalars['String']['input']>;
  product?: InputMaybe<Scalars['String']['input']>;
  socialSecurityNumber?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<UsState>;
  streetAddress?: InputMaybe<Scalars['String']['input']>;
  streetAddressLine2?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['String']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
};

/** List of available Xfinity TV packages */
export enum XfinityTv {
  Choice_10 = 'CHOICE_10',
  None = 'NONE',
  PopularTv_125 = 'POPULAR_TV_125',
  UltimateTv_185 = 'ULTIMATE_TV_185'
}

export type CreateXfinitySaleMutationVariables = Exact<{
  input: CreateXfinitySaleInput;
}>;


export type CreateXfinitySaleMutation = { __typename?: 'Mutation', createXfinitySale: { __typename?: 'XfinitySale', id: string, orderDate: any, cx_firstName: string, cx_lastName: string, orderNumber: string, installationDate: any, installationTime: string, installation: string, streetAddress: string, streetAddressLine2?: string | null, city: string, state: string, zipcode: string, phoneNumber: string, phoneNumber_second?: string | null, socialSecurityNumber?: string | null, email: string, product: string, packageSold: string, comcastTpvStatus: string, concertOrderId: string, Internet: string, TV: string, Phone: string, HMS: string, agent: { __typename?: 'User', id: string } } };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'RegisterUserResponseDto', email: string, name: string, accessToken: string, userType: UserType } };

export type CreateCommentMutationVariables = Exact<{
  createCommentInput: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, text: string, fieldName: SaleField, status: CommentStatus, user: { __typename?: 'User', id: string, name: string }, sale?: { __typename?: 'XfinitySale', id: string } | null, parentComment?: { __typename?: 'Comment', id: string, text: string } | null, replies?: Array<{ __typename?: 'Comment', id: string, text: string }> | null } };

export type UpdateCommentMutationVariables = Exact<{
  id: Scalars['String']['input'];
  updateCommentInput: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'Comment', id: string, text: string, fieldName: SaleField, status: CommentStatus, user: { __typename?: 'User', id: string, name: string }, sale?: { __typename?: 'XfinitySale', id: string } | null, parentComment?: { __typename?: 'Comment', id: string, text: string } | null, replies?: Array<{ __typename?: 'Comment', id: string, text: string }> | null } };

export type LoginUserQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserQuery = { __typename?: 'Query', loginUser: { __typename?: 'LoginUserResponse', id?: string | null, accessToken: string, name?: string | null, email?: string | null, userType?: UserType | null, profileImageURL?: string | null, dateOfBirth?: string | null } };

export type GetAllAgentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAgentsQuery = { __typename?: 'Query', getAllAgents: Array<{ __typename?: 'UserDto', id: string, name: string }> };

export type FindAllSalesByAgentNameQueryVariables = Exact<{
  agentName: Scalars['String']['input'];
}>;


export type FindAllSalesByAgentNameQuery = { __typename?: 'Query', findAllSalesByAgentName: Array<{ __typename?: 'XfinitySaleDTO', id: string, orderDate: any, agentName: string, cx_firstName: string, cx_lastName: string, orderNumber: string, installationDateFormatted: string, installationTime: string, installation: string, streetAddress: string, streetAddressLine2?: string | null, city: string, state: UsState, zipcode: string, phoneNumber: string, phoneNumber_second?: string | null, socialSecurityNumber?: string | null, email: string, product: string, packageSold: string, comcastTpvStatus: TpvStatus, concertOrderId: string, Internet: XfinityInternet, TV: XfinityTv, Phone: XfinityHomePhone, HMS: XfinityHomeSecurity }> };

export type FindSalesWithComplexFilterQueryVariables = Exact<{
  filter: XfinitySaleFilterInputDto;
}>;


export type FindSalesWithComplexFilterQuery = { __typename?: 'Query', findSalesWithComplexFilter: Array<{ __typename?: 'XfinitySaleDTO', id: string, orderDate: any, cx_firstName: string, cx_lastName: string, orderNumber: string, installationDateFormatted: string, installationTime: string, installation: string, streetAddress: string, streetAddressLine2?: string | null, city: string, state: UsState, zipcode: string, phoneNumber: string, phoneNumber_second?: string | null, socialSecurityNumber?: string | null, email: string, product: string, packageSold: string, comcastTpvStatus: TpvStatus, concertOrderId: string, Internet: XfinityInternet, TV: XfinityTv, Phone: XfinityHomePhone, HMS: XfinityHomeSecurity, agentName: string }> };

export const CreateXfinitySaleDocument = gql`
    mutation CreateXfinitySale($input: CreateXfinitySaleInput!) {
  createXfinitySale(input: $input) {
    id
    orderDate
    agent {
      id
    }
    cx_firstName
    cx_lastName
    orderNumber
    installationDate
    installationTime
    installation
    streetAddress
    streetAddressLine2
    city
    state
    zipcode
    phoneNumber
    phoneNumber_second
    socialSecurityNumber
    email
    product
    packageSold
    comcastTpvStatus
    concertOrderId
    Internet
    TV
    Phone
    HMS
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateXfinitySaleGQL extends Apollo.Mutation<CreateXfinitySaleMutation, CreateXfinitySaleMutationVariables> {
    document = CreateXfinitySaleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegisterUserDocument = gql`
    mutation RegisterUser($input: RegisterUserInput!) {
  registerUser(registerUserInput: $input) {
    email
    name
    accessToken
    userType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterUserGQL extends Apollo.Mutation<RegisterUserMutation, RegisterUserMutationVariables> {
    document = RegisterUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateCommentDocument = gql`
    mutation CreateComment($createCommentInput: CreateCommentInput!) {
  createComment(createCommentInput: $createCommentInput) {
    id
    text
    fieldName
    status
    user {
      id
      name
    }
    sale {
      id
    }
    parentComment {
      id
      text
    }
    replies {
      id
      text
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCommentGQL extends Apollo.Mutation<CreateCommentMutation, CreateCommentMutationVariables> {
    document = CreateCommentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateCommentDocument = gql`
    mutation UpdateComment($id: String!, $updateCommentInput: UpdateCommentInput!) {
  updateComment(id: $id, updateCommentInput: $updateCommentInput) {
    id
    text
    fieldName
    status
    user {
      id
      name
    }
    sale {
      id
    }
    parentComment {
      id
      text
    }
    replies {
      id
      text
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCommentGQL extends Apollo.Mutation<UpdateCommentMutation, UpdateCommentMutationVariables> {
    document = UpdateCommentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginUserDocument = gql`
    query LoginUser($email: String!, $password: String!) {
  loginUser(loginUserInput: {email: $email, password: $password}) {
    id
    accessToken
    name
    email
    userType
    profileImageURL
    dateOfBirth
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginUserGQL extends Apollo.Query<LoginUserQuery, LoginUserQueryVariables> {
    document = LoginUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllAgentsDocument = gql`
    query GetAllAgents {
  getAllAgents {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllAgentsGQL extends Apollo.Query<GetAllAgentsQuery, GetAllAgentsQueryVariables> {
    document = GetAllAgentsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindAllSalesByAgentNameDocument = gql`
    query findAllSalesByAgentName($agentName: String!) {
  findAllSalesByAgentName(agentName: $agentName) {
    id
    orderDate
    agentName
    cx_firstName
    cx_lastName
    orderNumber
    installationDateFormatted
    installationTime
    installation
    streetAddress
    streetAddressLine2
    city
    state
    zipcode
    phoneNumber
    phoneNumber_second
    socialSecurityNumber
    email
    product
    packageSold
    comcastTpvStatus
    concertOrderId
    Internet
    TV
    Phone
    HMS
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindAllSalesByAgentNameGQL extends Apollo.Query<FindAllSalesByAgentNameQuery, FindAllSalesByAgentNameQueryVariables> {
    document = FindAllSalesByAgentNameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindSalesWithComplexFilterDocument = gql`
    query FindSalesWithComplexFilter($filter: XfinitySaleFilterInputDto!) {
  findSalesWithComplexFilter(filter: $filter) {
    id
    orderDate
    cx_firstName
    cx_lastName
    orderNumber
    installationDateFormatted
    installationTime
    installation
    streetAddress
    streetAddressLine2
    city
    state
    zipcode
    phoneNumber
    phoneNumber_second
    socialSecurityNumber
    email
    product
    packageSold
    comcastTpvStatus
    concertOrderId
    Internet
    TV
    Phone
    HMS
    agentName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindSalesWithComplexFilterGQL extends Apollo.Query<FindSalesWithComplexFilterQuery, FindSalesWithComplexFilterQueryVariables> {
    document = FindSalesWithComplexFilterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }