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

export type AuditForm = {
  __typename?: 'AuditForm';
  agentEnergeticBehavior?: Maybe<Scalars['String']['output']>;
  anyFalsifications?: Maybe<Scalars['String']['output']>;
  anyUpselling?: Maybe<Scalars['String']['output']>;
  auditBy: Scalars['String']['output'];
  auditDate: Scalars['String']['output'];
  auditType: Scalars['String']['output'];
  cabletvPackage?: Maybe<Scalars['String']['output']>;
  callDisposition: Scalars['String']['output'];
  callDuration: Scalars['String']['output'];
  callType?: Maybe<Scalars['String']['output']>;
  consentForCallback?: Maybe<Scalars['String']['output']>;
  contractTermMentioned?: Maybe<Scalars['String']['output']>;
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  creditCheckConsent?: Maybe<Scalars['String']['output']>;
  customerUsageProbing?: Maybe<Scalars['String']['output']>;
  deadAirMoreThanNormal?: Maybe<Scalars['String']['output']>;
  findings?: Maybe<Scalars['String']['output']>;
  /** Primary ID */
  id: Scalars['ID']['output'];
  improvementAreas?: Maybe<Scalars['String']['output']>;
  packageDetailsExplained?: Maybe<Scalars['String']['output']>;
  paymentCartTotalMentioned?: Maybe<Scalars['String']['output']>;
  phoneAdded?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  recordedLine?: Maybe<Scalars['String']['output']>;
  sale: XfinitySale;
  tookTooMuchTimeInAddressCheck?: Maybe<Scalars['String']['output']>;
  topDownSelling?: Maybe<Scalars['String']['output']>;
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

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
  saleId: Scalars['String']['output'];
  saleType: SaleType;
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

export type CreateAuditFormInput = {
  agentEnergeticBehavior?: InputMaybe<Scalars['String']['input']>;
  anyFalsifications?: InputMaybe<Scalars['String']['input']>;
  anyUpselling?: InputMaybe<Scalars['String']['input']>;
  auditBy: Scalars['String']['input'];
  auditDate: Scalars['String']['input'];
  auditType: Scalars['String']['input'];
  cabletvPackage?: InputMaybe<Scalars['String']['input']>;
  callDisposition: Scalars['String']['input'];
  callDuration: Scalars['String']['input'];
  callType?: InputMaybe<Scalars['String']['input']>;
  consentForCallback?: InputMaybe<Scalars['String']['input']>;
  contractTermMentioned?: InputMaybe<Scalars['String']['input']>;
  creditCheckConsent?: InputMaybe<Scalars['String']['input']>;
  customerUsageProbing?: InputMaybe<Scalars['String']['input']>;
  deadAirMoreThanNormal?: InputMaybe<Scalars['String']['input']>;
  findings?: InputMaybe<Scalars['String']['input']>;
  improvementAreas?: InputMaybe<Scalars['String']['input']>;
  packageDetailsExplained?: InputMaybe<Scalars['String']['input']>;
  paymentCartTotalMentioned?: InputMaybe<Scalars['String']['input']>;
  phoneAdded?: InputMaybe<Scalars['String']['input']>;
  provider: Scalars['String']['input'];
  recordedLine?: InputMaybe<Scalars['String']['input']>;
  saleId: Scalars['String']['input'];
  tookTooMuchTimeInAddressCheck?: InputMaybe<Scalars['String']['input']>;
  topDownSelling?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCommentInput = {
  fieldName: SaleField;
  parentCommentId?: InputMaybe<Scalars['ID']['input']>;
  saleId: Scalars['ID']['input'];
  saleType: SaleType;
  status?: CommentStatus;
  text: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type CreateSaleStageInput = {
  saleId: Scalars['ID']['input'];
  saleType: SaleType;
  stage: SaleFlag;
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
  createAuditForm: AuditForm;
  createComment: Comment;
  createSaleStage: SaleStage;
  createSaleStageHistory: SaleStageHistory;
  createXfinitySale: XfinitySale;
  registerUser: RegisterUserResponseDto;
  removeAuditForm: Scalars['Boolean']['output'];
  removeComment: Scalars['Boolean']['output'];
  removeSaleStage: Scalars['Boolean']['output'];
  removeSaleStageHistory: Scalars['Boolean']['output'];
  seedUsers?: Maybe<Array<User>>;
  setSaleStage: SaleStage;
  updateAuditForm: AuditForm;
  updateComment: Comment;
  updateSaleStage: SaleStage;
  updateUser: UserDto;
};


export type MutationCreateAuditFormArgs = {
  CreateAuditFormInput: CreateAuditFormInput;
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationCreateSaleStageArgs = {
  createSaleStageInput: CreateSaleStageInput;
  userId: Scalars['ID']['input'];
};


export type MutationCreateSaleStageHistoryArgs = {
  saleId: Scalars['ID']['input'];
  saleType: SaleType;
  stage: SaleFlag;
  userId: Scalars['ID']['input'];
};


export type MutationCreateXfinitySaleArgs = {
  input: CreateXfinitySaleInput;
};


export type MutationRegisterUserArgs = {
  registerUserInput: RegisterUserInput;
};


export type MutationRemoveAuditFormArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveCommentArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveSaleStageArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveSaleStageHistoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSetSaleStageArgs = {
  saleId: Scalars['ID']['input'];
  saleType: SaleType;
  stage: SaleFlag;
  userId: Scalars['ID']['input'];
};


export type MutationUpdateAuditFormArgs = {
  UpdateAuditFormInput: UpdateAuditFormInput;
};


export type MutationUpdateCommentArgs = {
  id: Scalars['String']['input'];
  updateCommentInput: UpdateCommentInput;
};


export type MutationUpdateSaleStageArgs = {
  id: Scalars['ID']['input'];
  updateSaleStageInput: UpdateSaleStageInput;
  userId: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type PaginatedSales = {
  __typename?: 'PaginatedSales';
  sales: Array<XfinitySaleDto>;
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  auditForm: AuditForm;
  auditForms: Array<AuditForm>;
  comment: Comment;
  comments: Array<Comment>;
  commentsBySale: Array<Comment>;
  currentUser: UserDto;
  findAllSalesByAgentName: Array<XfinitySaleDto>;
  findSalesWithComplexFilter: PaginatedSales;
  getAllAgents: Array<UserDto>;
  getSaleFlag: SaleFlag;
  getSaleHistory: Array<SaleStageHistory>;
  getXfinitySaleById: XfinitySale;
  loginUser: LoginUserResponse;
  saleStage: SaleStage;
  saleStageHistories: Array<SaleStageHistory>;
  saleStageHistory: SaleStageHistory;
  saleStages: Array<SaleStage>;
};


export type QueryAuditFormArgs = {
  id: Scalars['String']['input'];
};


export type QueryCommentArgs = {
  id: Scalars['String']['input'];
};


export type QueryCommentsBySaleArgs = {
  saleId: Scalars['ID']['input'];
  saleType: Scalars['String']['input'];
};


export type QueryFindAllSalesByAgentNameArgs = {
  agentName: Scalars['String']['input'];
};


export type QueryFindSalesWithComplexFilterArgs = {
  filter: XfinitySaleFilterInputDto;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetSaleFlagArgs = {
  saleId: Scalars['ID']['input'];
  saleType: SaleType;
};


export type QueryGetSaleHistoryArgs = {
  saleId: Scalars['String']['input'];
};


export type QueryGetXfinitySaleByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLoginUserArgs = {
  loginUserInput: LoginUserInput;
};


export type QuerySaleStageArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySaleStageHistoryArgs = {
  id: Scalars['ID']['input'];
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

export type SaleStage = {
  __typename?: 'SaleStage';
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** Identifier of the sale */
  saleId: Scalars['String']['output'];
  saleType: SaleType;
  /** Stage of the sale */
  stage: Scalars['String']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SaleStageHistory = {
  __typename?: 'SaleStageHistory';
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Primary ID */
  id: Scalars['ID']['output'];
  saleId: Scalars['String']['output'];
  saleType: SaleType;
  /** Stage of the sale */
  stage: SaleFlag;
  /** Timestamp of the change */
  timestamp: Scalars['DateTime']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User who made the change */
  user: User;
};

/** Which provider does the sale belong to */
export enum SaleType {
  SpectrumSale = 'SPECTRUM_SALE',
  XfinitySale = 'XFINITY_SALE'
}

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

export type UpdateAuditFormInput = {
  agentEnergeticBehavior?: InputMaybe<Scalars['String']['input']>;
  anyFalsifications?: InputMaybe<Scalars['String']['input']>;
  anyUpselling?: InputMaybe<Scalars['String']['input']>;
  auditBy?: InputMaybe<Scalars['String']['input']>;
  auditDate?: InputMaybe<Scalars['String']['input']>;
  auditType?: InputMaybe<Scalars['String']['input']>;
  cabletvPackage?: InputMaybe<Scalars['String']['input']>;
  callDisposition?: InputMaybe<Scalars['String']['input']>;
  callDuration?: InputMaybe<Scalars['String']['input']>;
  callType?: InputMaybe<Scalars['String']['input']>;
  consentForCallback?: InputMaybe<Scalars['String']['input']>;
  contractTermMentioned?: InputMaybe<Scalars['String']['input']>;
  creditCheckConsent?: InputMaybe<Scalars['String']['input']>;
  customerUsageProbing?: InputMaybe<Scalars['String']['input']>;
  deadAirMoreThanNormal?: InputMaybe<Scalars['String']['input']>;
  findings?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  improvementAreas?: InputMaybe<Scalars['String']['input']>;
  packageDetailsExplained?: InputMaybe<Scalars['String']['input']>;
  paymentCartTotalMentioned?: InputMaybe<Scalars['String']['input']>;
  phoneAdded?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  recordedLine?: InputMaybe<Scalars['String']['input']>;
  saleId?: InputMaybe<Scalars['String']['input']>;
  tookTooMuchTimeInAddressCheck?: InputMaybe<Scalars['String']['input']>;
  topDownSelling?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCommentInput = {
  fieldName?: InputMaybe<SaleField>;
  parentCommentId?: InputMaybe<Scalars['ID']['input']>;
  saleId?: InputMaybe<Scalars['ID']['input']>;
  saleType?: InputMaybe<SaleType>;
  status?: InputMaybe<CommentStatus>;
  text?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateSaleStageInput = {
  saleId?: InputMaybe<Scalars['ID']['input']>;
  saleType?: InputMaybe<SaleType>;
  stage?: InputMaybe<SaleFlag>;
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
  auditForms?: Maybe<Array<AuditForm>>;
  /** City of the installation address */
  city: Scalars['String']['output'];
  /** Comcast TPV status of the sale */
  comcastTpvStatus: Scalars['String']['output'];
  comments?: Maybe<Array<Comment>>;
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


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string, text: string, fieldName: SaleField, status: CommentStatus, saleId: string, saleType: SaleType, user: { __typename?: 'User', id: string, name: string }, parentComment?: { __typename?: 'Comment', id: string, text: string } | null, replies?: Array<{ __typename?: 'Comment', id: string, text: string }> | null } };

export type UpdateCommentMutationVariables = Exact<{
  id: Scalars['String']['input'];
  updateCommentInput: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'Comment', id: string, text: string, fieldName: SaleField, status: CommentStatus, saleId: string, saleType: SaleType, user: { __typename?: 'User', id: string, name: string }, parentComment?: { __typename?: 'Comment', id: string, text: string } | null, replies?: Array<{ __typename?: 'Comment', id: string, text: string }> | null } };

export type SetSaleStageMutationVariables = Exact<{
  saleId: Scalars['ID']['input'];
  saleType: SaleType;
  stage: SaleFlag;
  userId: Scalars['ID']['input'];
}>;


export type SetSaleStageMutation = { __typename?: 'Mutation', setSaleStage: { __typename?: 'SaleStage', id: string, stage: string, saleId: string, saleType: SaleType } };

export type CreateSaleStageMutationVariables = Exact<{
  createSaleStageInput: CreateSaleStageInput;
  userId: Scalars['ID']['input'];
}>;


export type CreateSaleStageMutation = { __typename?: 'Mutation', createSaleStage: { __typename?: 'SaleStage', id: string, stage: string, saleId: string, saleType: SaleType } };

export type UpdateSaleStageMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  updateSaleStageInput: UpdateSaleStageInput;
  userId: Scalars['ID']['input'];
}>;


export type UpdateSaleStageMutation = { __typename?: 'Mutation', updateSaleStage: { __typename?: 'SaleStage', id: string, stage: string, saleId: string, saleType: SaleType } };

export type CreateAuditFormMutationVariables = Exact<{
  CreateAuditFormInput: CreateAuditFormInput;
}>;


export type CreateAuditFormMutation = { __typename?: 'Mutation', createAuditForm: { __typename?: 'AuditForm', id: string, auditDate: string, auditBy: string, auditType: string, callType?: string | null, provider: string, callDuration: string, callDisposition: string, findings?: string | null, cabletvPackage?: string | null, phoneAdded?: string | null, recordedLine?: string | null, consentForCallback?: string | null, creditCheckConsent?: string | null, contractTermMentioned?: string | null, anyFalsifications?: string | null, topDownSelling?: string | null, customerUsageProbing?: string | null, packageDetailsExplained?: string | null, paymentCartTotalMentioned?: string | null, anyUpselling?: string | null, agentEnergeticBehavior?: string | null, deadAirMoreThanNormal?: string | null, tookTooMuchTimeInAddressCheck?: string | null, improvementAreas?: string | null, sale: { __typename?: 'XfinitySale', id: string } } };

export type UpdateAuditFormMutationVariables = Exact<{
  UpdateAuditFormInput: UpdateAuditFormInput;
}>;


export type UpdateAuditFormMutation = { __typename?: 'Mutation', updateAuditForm: { __typename?: 'AuditForm', id: string, auditDate: string, auditBy: string, auditType: string, callType?: string | null, provider: string, callDuration: string, callDisposition: string, findings?: string | null, cabletvPackage?: string | null, phoneAdded?: string | null, recordedLine?: string | null, consentForCallback?: string | null, creditCheckConsent?: string | null, contractTermMentioned?: string | null, anyFalsifications?: string | null, topDownSelling?: string | null, customerUsageProbing?: string | null, packageDetailsExplained?: string | null, paymentCartTotalMentioned?: string | null, anyUpselling?: string | null, agentEnergeticBehavior?: string | null, deadAirMoreThanNormal?: string | null, tookTooMuchTimeInAddressCheck?: string | null, improvementAreas?: string | null, sale: { __typename?: 'XfinitySale', id: string } } };

export type RemoveAuditFormMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveAuditFormMutation = { __typename?: 'Mutation', removeAuditForm: boolean };

export type LoginUserQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserQuery = { __typename?: 'Query', loginUser: { __typename?: 'LoginUserResponse', id?: string | null, accessToken: string, name?: string | null, email?: string | null, userType?: UserType | null, profileImageURL?: string | null, dateOfBirth?: string | null } };

export type GetAllAgentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAgentsQuery = { __typename?: 'Query', getAllAgents: Array<{ __typename?: 'UserDto', id: string, name: string }> };

export type GetSaleStageQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSaleStageQuery = { __typename?: 'Query', saleStage: { __typename?: 'SaleStage', id: string, stage: string, saleId: string, saleType: SaleType } };

export type GetSaleFlagQueryVariables = Exact<{
  saleId: Scalars['ID']['input'];
  saleType: SaleType;
}>;


export type GetSaleFlagQuery = { __typename?: 'Query', getSaleFlag: SaleFlag };

export type FindAllSalesByAgentNameQueryVariables = Exact<{
  agentName: Scalars['String']['input'];
}>;


export type FindAllSalesByAgentNameQuery = { __typename?: 'Query', findAllSalesByAgentName: Array<{ __typename?: 'XfinitySaleDTO', id: string, orderDate: any, agentName: string, cx_firstName: string, cx_lastName: string, orderNumber: string, installationDateFormatted: string, installationTime: string, installation: string, streetAddress: string, streetAddressLine2?: string | null, city: string, state: UsState, zipcode: string, phoneNumber: string, phoneNumber_second?: string | null, socialSecurityNumber?: string | null, email: string, product: string, packageSold: string, comcastTpvStatus: TpvStatus, concertOrderId: string, Internet: XfinityInternet, TV: XfinityTv, Phone: XfinityHomePhone, HMS: XfinityHomeSecurity }> };

export type GetSaleHistoryQueryVariables = Exact<{
  saleId: Scalars['String']['input'];
}>;


export type GetSaleHistoryQuery = { __typename?: 'Query', getSaleHistory: Array<{ __typename?: 'SaleStageHistory', stage: SaleFlag, timestamp: any, saleId: string, saleType: SaleType, user: { __typename?: 'User', name: string } }> };

export type FindSalesWithComplexFilterQueryVariables = Exact<{
  filter: XfinitySaleFilterInputDto;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindSalesWithComplexFilterQuery = { __typename?: 'Query', findSalesWithComplexFilter: { __typename?: 'PaginatedSales', total: number, sales: Array<{ __typename?: 'XfinitySaleDTO', id: string, orderDate: any, agentName: string, cx_firstName: string, cx_lastName: string, orderNumber: string, installationDateFormatted: string, installationTime: string, installation: string, streetAddress: string, streetAddressLine2?: string | null, city: string, state: UsState, zipcode: string, phoneNumber: string, phoneNumber_second?: string | null, socialSecurityNumber?: string | null, email: string, product: string, packageSold: string, comcastTpvStatus: TpvStatus, concertOrderId: string, Internet: XfinityInternet, TV: XfinityTv, Phone: XfinityHomePhone, HMS: XfinityHomeSecurity }> } };

export type CommentsBySaleQueryVariables = Exact<{
  saleId: Scalars['ID']['input'];
  saleType: Scalars['String']['input'];
}>;


export type CommentsBySaleQuery = { __typename?: 'Query', commentsBySale: Array<{ __typename?: 'Comment', id: string, text: string, fieldName: SaleField, status: CommentStatus, saleId: string, saleType: SaleType, user: { __typename?: 'User', id: string, name: string }, parentComment?: { __typename?: 'Comment', id: string, text: string } | null, replies?: Array<{ __typename?: 'Comment', id: string, text: string }> | null }> };

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
    saleId
    saleType
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
    saleId
    saleType
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
export const SetSaleStageDocument = gql`
    mutation SetSaleStage($saleId: ID!, $saleType: SaleType!, $stage: SaleFlag!, $userId: ID!) {
  setSaleStage(
    saleId: $saleId
    saleType: $saleType
    stage: $stage
    userId: $userId
  ) {
    id
    stage
    saleId
    saleType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SetSaleStageGQL extends Apollo.Mutation<SetSaleStageMutation, SetSaleStageMutationVariables> {
    document = SetSaleStageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateSaleStageDocument = gql`
    mutation CreateSaleStage($createSaleStageInput: CreateSaleStageInput!, $userId: ID!) {
  createSaleStage(createSaleStageInput: $createSaleStageInput, userId: $userId) {
    id
    stage
    saleId
    saleType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSaleStageGQL extends Apollo.Mutation<CreateSaleStageMutation, CreateSaleStageMutationVariables> {
    document = CreateSaleStageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateSaleStageDocument = gql`
    mutation UpdateSaleStage($id: ID!, $updateSaleStageInput: UpdateSaleStageInput!, $userId: ID!) {
  updateSaleStage(
    id: $id
    updateSaleStageInput: $updateSaleStageInput
    userId: $userId
  ) {
    id
    stage
    saleId
    saleType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateSaleStageGQL extends Apollo.Mutation<UpdateSaleStageMutation, UpdateSaleStageMutationVariables> {
    document = UpdateSaleStageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateAuditFormDocument = gql`
    mutation CreateAuditForm($CreateAuditFormInput: CreateAuditFormInput!) {
  createAuditForm(CreateAuditFormInput: $CreateAuditFormInput) {
    id
    auditDate
    auditBy
    auditType
    callType
    provider
    callDuration
    callDisposition
    findings
    cabletvPackage
    phoneAdded
    recordedLine
    consentForCallback
    creditCheckConsent
    contractTermMentioned
    anyFalsifications
    topDownSelling
    customerUsageProbing
    packageDetailsExplained
    paymentCartTotalMentioned
    anyUpselling
    agentEnergeticBehavior
    deadAirMoreThanNormal
    tookTooMuchTimeInAddressCheck
    improvementAreas
    sale {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateAuditFormGQL extends Apollo.Mutation<CreateAuditFormMutation, CreateAuditFormMutationVariables> {
    document = CreateAuditFormDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateAuditFormDocument = gql`
    mutation UpdateAuditForm($UpdateAuditFormInput: UpdateAuditFormInput!) {
  updateAuditForm(UpdateAuditFormInput: $UpdateAuditFormInput) {
    id
    auditDate
    auditBy
    auditType
    callType
    provider
    callDuration
    callDisposition
    findings
    cabletvPackage
    phoneAdded
    recordedLine
    consentForCallback
    creditCheckConsent
    contractTermMentioned
    anyFalsifications
    topDownSelling
    customerUsageProbing
    packageDetailsExplained
    paymentCartTotalMentioned
    anyUpselling
    agentEnergeticBehavior
    deadAirMoreThanNormal
    tookTooMuchTimeInAddressCheck
    improvementAreas
    sale {
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateAuditFormGQL extends Apollo.Mutation<UpdateAuditFormMutation, UpdateAuditFormMutationVariables> {
    document = UpdateAuditFormDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemoveAuditFormDocument = gql`
    mutation RemoveAuditForm($id: String!) {
  removeAuditForm(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveAuditFormGQL extends Apollo.Mutation<RemoveAuditFormMutation, RemoveAuditFormMutationVariables> {
    document = RemoveAuditFormDocument;
    
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
export const GetSaleStageDocument = gql`
    query GetSaleStage($id: ID!) {
  saleStage(id: $id) {
    id
    stage
    saleId
    saleType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSaleStageGQL extends Apollo.Query<GetSaleStageQuery, GetSaleStageQueryVariables> {
    document = GetSaleStageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetSaleFlagDocument = gql`
    query GetSaleFlag($saleId: ID!, $saleType: SaleType!) {
  getSaleFlag(saleId: $saleId, saleType: $saleType)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSaleFlagGQL extends Apollo.Query<GetSaleFlagQuery, GetSaleFlagQueryVariables> {
    document = GetSaleFlagDocument;
    
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
export const GetSaleHistoryDocument = gql`
    query GetSaleHistory($saleId: String!) {
  getSaleHistory(saleId: $saleId) {
    stage
    timestamp
    user {
      name
    }
    saleId
    saleType
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSaleHistoryGQL extends Apollo.Query<GetSaleHistoryQuery, GetSaleHistoryQueryVariables> {
    document = GetSaleHistoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindSalesWithComplexFilterDocument = gql`
    query FindSalesWithComplexFilter($filter: XfinitySaleFilterInputDto!, $limit: Int!, $offset: Int!, $search: String) {
  findSalesWithComplexFilter(
    filter: $filter
    limit: $limit
    offset: $offset
    search: $search
  ) {
    sales {
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
    total
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
export const CommentsBySaleDocument = gql`
    query CommentsBySale($saleId: ID!, $saleType: String!) {
  commentsBySale(saleId: $saleId, saleType: $saleType) {
    id
    text
    fieldName
    status
    user {
      id
      name
    }
    saleId
    saleType
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
  export class CommentsBySaleGQL extends Apollo.Query<CommentsBySaleQuery, CommentsBySaleQueryVariables> {
    document = CommentsBySaleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }