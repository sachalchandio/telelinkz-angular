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

export type AtntPaginatedSales = {
  __typename?: 'ATNTPaginatedSales';
  sales: Array<AtntSaleDto>;
  total: Scalars['Int']['output'];
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Suspended = 'SUSPENDED',
  Unverified = 'UNVERIFIED'
}

/** The type of customer risk level */
export enum AtntCustomerType {
  HighRisk = 'HIGH_RISK',
  LowRisk = 'LOW_RISK',
  MediumRisk = 'MEDIUM_RISK',
  Ncvc = 'NCVC',
  UnknownRisk = 'UNKNOWN_RISK'
}

/** List of available Atnt Internet packages */
export enum AtntInternet {
  AtntCopper_5 = 'ATNT_COPPER_5',
  AtntCopper_10 = 'ATNT_COPPER_10',
  AtntCopper_15 = 'ATNT_COPPER_15',
  AtntCopper_18 = 'ATNT_COPPER_18',
  AtntCopper_25 = 'ATNT_COPPER_25',
  AtntCopper_50 = 'ATNT_COPPER_50',
  AtntCopper_75 = 'ATNT_COPPER_75',
  AtntCopperBasic = 'ATNT_COPPER_BASIC',
  AtntFiber_100 = 'ATNT_FIBER_100',
  AtntFiber_300 = 'ATNT_FIBER_300',
  AtntFiber_500 = 'ATNT_FIBER_500',
  AtntFiber_1000 = 'ATNT_FIBER_1000',
  AtntFiber_2000 = 'ATNT_FIBER_2000',
  AtntFiber_5000 = 'ATNT_FIBER_5000',
  AtntUndetermined = 'ATNT_UNDETERMINED',
  None = 'NONE'
}

/** Atnt Home Phone options  */
export enum AtntPhone {
  CompleteChoiceEnhanced = 'COMPLETE_CHOICE_ENHANCED',
  None = 'NONE',
  TraditionalHomephone = 'TRADITIONAL_HOMEPHONE'
}

export type AtntSale = {
  __typename?: 'AtntSale';
  /** AT&T Internet Package */
  Internet: Scalars['String']['output'];
  /** AT&T Phone Package */
  Phone: Scalars['String']['output'];
  /** Account Number */
  accountNumber: Scalars['String']['output'];
  /** The agent responsible for the sale */
  agent: User;
  /** AT&T TPV Status */
  attTpvStatus: Scalars['String']['output'];
  auditForms?: Maybe<Array<AuditForm>>;
  /** City of the installation address */
  city: Scalars['String']['output'];
  comments?: Maybe<Array<Comment>>;
  /** concertOrderID */
  concertOrderID: Scalars['String']['output'];
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** AT&T Customer Type */
  customerType: Scalars['String']['output'];
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
  /** Sara Plus AT & T User ID */
  saraPlusAT_TUserID: Scalars['String']['output'];
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

export type AtntSaleDto = {
  __typename?: 'AtntSaleDTO';
  Internet: AtntInternet;
  Phone: AtntPhone;
  accountNumber: Scalars['String']['output'];
  agentName: Scalars['String']['output'];
  attTpvStatus: TpvStatus;
  city: Scalars['String']['output'];
  concertOrderID: Scalars['String']['output'];
  customerType: AtntCustomerType;
  cx_firstName: Scalars['String']['output'];
  cx_lastName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  installation: InstallationType;
  installationDateFormatted: Scalars['String']['output'];
  installationTime: Scalars['String']['output'];
  orderDate: Scalars['DateTime']['output'];
  orderNumber: Scalars['String']['output'];
  packageSold: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  phoneNumber_second?: Maybe<Scalars['String']['output']>;
  product: Scalars['String']['output'];
  saraPlusAT_TUserID: SaraPlusAt_TUserId;
  socialSecurityNumber?: Maybe<Scalars['String']['output']>;
  state: UsState;
  streetAddress: Scalars['String']['output'];
  streetAddressLine2?: Maybe<Scalars['String']['output']>;
  zipcode: Scalars['String']['output'];
};

export type AtntSaleFilterInputDto = {
  Internet?: InputMaybe<AtntInternet>;
  Phone?: InputMaybe<AtntPhone>;
  accountNumber?: InputMaybe<Scalars['String']['input']>;
  agentId?: InputMaybe<Scalars['String']['input']>;
  agentName?: InputMaybe<Scalars['String']['input']>;
  attTpvStatus?: InputMaybe<TpvStatus>;
  city?: InputMaybe<Scalars['String']['input']>;
  customerType?: InputMaybe<AtntCustomerType>;
  cx_firstName?: InputMaybe<Scalars['String']['input']>;
  cx_lastName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  installationDate?: InputMaybe<Scalars['String']['input']>;
  installationTime?: InputMaybe<Scalars['String']['input']>;
  orderDate?: InputMaybe<Scalars['String']['input']>;
  orderID?: InputMaybe<Scalars['String']['input']>;
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  packageSold?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  product?: InputMaybe<Scalars['String']['input']>;
  saraPlusAT_TUserID?: InputMaybe<SaraPlusAt_TUserId>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<UsState>;
  streetAddress?: InputMaybe<Scalars['String']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
};

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

export type CreateAtntSaleInput = {
  Email?: InputMaybe<Scalars['String']['input']>;
  Internet: AtntInternet;
  Phone: AtntPhone;
  accountNumber: Scalars['String']['input'];
  agentName: Scalars['String']['input'];
  attTpvStatus?: InputMaybe<TpvStatus>;
  city: Scalars['String']['input'];
  customerType: AtntCustomerType;
  cx_firstName: Scalars['String']['input'];
  cx_lastName: Scalars['String']['input'];
  installation: InstallationType;
  installationDateFormatted: Scalars['String']['input'];
  installationTime: Scalars['String']['input'];
  orderDate: Scalars['String']['input'];
  orderNumber: Scalars['String']['input'];
  order_id: Scalars['String']['input'];
  packageDetails?: InputMaybe<Scalars['String']['input']>;
  phoneNumber: Scalars['String']['input'];
  product?: InputMaybe<Scalars['String']['input']>;
  saleStatus: SaleFlag;
  saraPlusAT_TUserID: SaraPlusAt_TUserId;
  state: UsState;
  streetAddress: Scalars['String']['input'];
  streetAddressLine2?: InputMaybe<Scalars['String']['input']>;
  submissionDate: Scalars['String']['input'];
  zipcode: Scalars['String']['input'];
};

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

export type CreateBatchAtntSaleInput = {
  sales: Array<CreateAtntSaleInput>;
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

export type CreateInterestedCustomerInput = {
  /** Address of the customer */
  address: Scalars['String']['input'];
  /** Callback date for the customer */
  callbackDate: Scalars['String']['input'];
  /** Callback time for the customer */
  callbackTime: Scalars['String']['input'];
  /** City of the customer */
  city: Scalars['String']['input'];
  /** Additional comments */
  comments: Scalars['String']['input'];
  /** Date of birth of the customer */
  dob: Scalars['String']['input'];
  /** Email address of the customer */
  email: Scalars['String']['input'];
  /** First name of the customer */
  firstName: Scalars['String']['input'];
  /** Last name of the customer */
  lastName: Scalars['String']['input'];
  /** Phone number of the customer */
  phoneNumber: Scalars['String']['input'];
  /** Provider selected by the customer */
  provider: Provider;
  /** Social Security Number of the customer */
  ssn: Scalars['String']['input'];
  /** State of the customer */
  state: Scalars['String']['input'];
  /** Zip code of the customer */
  zipCode: Scalars['String']['input'];
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
  concertOrderID: Scalars['String']['input'];
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

export type InterestedCustomer = {
  __typename?: 'InterestedCustomer';
  /** Address of the customer */
  address: Scalars['String']['output'];
  /** Callback date for the customer */
  callbackDate: Scalars['String']['output'];
  /** Callback time for the customer */
  callbackTime: Scalars['String']['output'];
  /** City of the customer */
  city: Scalars['String']['output'];
  /** Additional comments */
  comments: Scalars['String']['output'];
  /** Date of birth of the customer */
  dob: Scalars['String']['output'];
  /** Email address of the customer */
  email: Scalars['String']['output'];
  /** First name of the customer */
  firstName: Scalars['String']['output'];
  /** Unique identifier for the interested customer */
  id: Scalars['Int']['output'];
  /** Last name of the customer */
  lastName: Scalars['String']['output'];
  /** Phone number of the customer */
  phoneNumber: Scalars['String']['output'];
  /** Provider selected by the customer */
  provider: Provider;
  /** Social Security Number of the customer */
  ssn: Scalars['String']['output'];
  /** State of the customer */
  state: Scalars['String']['output'];
  /** Zip code of the customer */
  zipCode: Scalars['String']['output'];
};

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
  createAtntSale: AtntSale;
  createAtntSaleBulk: Array<AtntSale>;
  createAuditForm: AuditForm;
  createComment: Comment;
  createInterestedCustomer: InterestedCustomer;
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


export type MutationCreateAtntSaleArgs = {
  input: CreateAtntSaleInput;
};


export type MutationCreateAtntSaleBulkArgs = {
  input: CreateBatchAtntSaleInput;
};


export type MutationCreateAuditFormArgs = {
  CreateAuditFormInput: CreateAuditFormInput;
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationCreateInterestedCustomerArgs = {
  createInterestedCustomerInput: CreateInterestedCustomerInput;
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

export enum Provider {
  Adt = 'ADT',
  Att = 'ATT',
  AltaFiber = 'AltaFiber',
  AstoundBusiness = 'Astound_Business',
  Breezeline = 'Breezeline',
  BreezelineBusiness = 'Breezeline_Business',
  BrightSpeedBusiness = 'BrightSpeed_Business',
  Brightspeed = 'Brightspeed',
  ComcastBusiness = 'Comcast_Business',
  ComcastXfinity = 'Comcast_Xfinity',
  Cox = 'Cox',
  CoxBusiness = 'Cox_Business',
  CreditCheckFailed = 'Credit_Check_Failed',
  Directv = 'DIRECTV',
  DirecTvBusiness = 'DirecTV_Business',
  Earthlink = 'Earthlink',
  FidiumConsolidated = 'Fidium_Consolidated',
  Frontier = 'Frontier',
  FrontierBusiness = 'Frontier_Business',
  HughesNet = 'HughesNet',
  Mediacom = 'Mediacom',
  MediacomBusiness = 'Mediacom_Business',
  MetroNet = 'MetroNet',
  OptimumBusiness = 'Optimum_Business',
  OptimumSuddenlink = 'Optimum_Suddenlink',
  Spectrum = 'Spectrum',
  SpectrumBusiness = 'Spectrum_Business',
  TMobile = 'T_Mobile',
  TMobileBusiness = 'T_Mobile_Business',
  TidioLeadsTracking = 'Tidio_Leads_Tracking',
  VerizonBusiness = 'Verizon_Business',
  VerizonWireless = 'Verizon_Wireless',
  Viasat = 'Viasat',
  Vivint = 'Vivint',
  Wow = 'WOW',
  WowBusiness = 'WOW_Business',
  WindStream = 'WindStream',
  WindstreamBusiness = 'Windstream_Business',
  ZiplyFiber = 'Ziply_Fiber'
}

export type Query = {
  __typename?: 'Query';
  auditForm: AuditForm;
  auditForms: Array<AuditForm>;
  comment: Comment;
  comments: Array<Comment>;
  commentsBySale: Array<Comment>;
  currentUser: UserDto;
  findAllSalesByAgentNameATNT: Array<AtntSaleDto>;
  findAllSalesByAgentNameXfinity: Array<XfinitySaleDto>;
  findSalesWithComplexFilterATNT: AtntPaginatedSales;
  findSalesWithComplexFilterXfinity: XfinityPaginatedSales;
  getAllAgents: Array<UserDto>;
  getAtntSaleById: AtntSale;
  getSaleFlag: SaleFlag;
  getSaleHistory: Array<SaleStageHistory>;
  getXfinitySaleById: XfinitySale;
  interestedCustomer: InterestedCustomer;
  interestedCustomers: Array<InterestedCustomer>;
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


export type QueryFindAllSalesByAgentNameAtntArgs = {
  agentName: Scalars['String']['input'];
};


export type QueryFindAllSalesByAgentNameXfinityArgs = {
  agentName: Scalars['String']['input'];
};


export type QueryFindSalesWithComplexFilterAtntArgs = {
  filter: AtntSaleFilterInputDto;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFindSalesWithComplexFilterXfinityArgs = {
  filter: XfinitySaleFilterInputDto;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAtntSaleByIdArgs = {
  id: Scalars['String']['input'];
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


export type QueryInterestedCustomerArgs = {
  id: Scalars['Int']['input'];
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
  AdtBusinessSale = 'ADT_BUSINESS_SALE',
  AltafiberSale = 'ALTAFIBER_SALE',
  AstoundBusinessSale = 'ASTOUND_BUSINESS_SALE',
  AtntSale = 'ATNT_SALE',
  BreezelineSale = 'BREEZELINE_SALE',
  BreezlineBusinessSale = 'BREEZLINE_BUSINESS_SALE',
  BrightspeedBusinessSale = 'BRIGHTSPEED_BUSINESS_SALE',
  BrightspeedSale = 'BRIGHTSPEED_SALE',
  ComcastSale = 'COMCAST_SALE',
  CoxBusinessSale = 'COX_BUSINESS_SALE',
  CoxSale = 'COX_SALE',
  DirecttvSale = 'DIRECTTV_SALE',
  DirectvBusinessSale = 'DIRECTV_BUSINESS_SALE',
  EarthlinkSale = 'EARTHLINK_SALE',
  FidiumSale = 'FIDIUM_SALE',
  FrontierBusinessSale = 'FRONTIER_BUSINESS_SALE',
  FrontierSale = 'FRONTIER_SALE',
  HughesnetSale = 'HUGHESNET_SALE',
  MediacomBusinessSale = 'MEDIACOM_BUSINESS_SALE',
  MediacomSale = 'MEDIACOM_SALE',
  MetronetSale = 'METRONET_SALE',
  OptimumBusinessSale = 'OPTIMUM_BUSINESS_SALE',
  OptimumSale = 'OPTIMUM_SALE',
  SpectrumBusinessSale = 'SPECTRUM_BUSINESS_SALE',
  SpectrumSale = 'SPECTRUM_SALE',
  TidioLeads = 'TIDIO_LEADS',
  TmobileBusinessSale = 'TMOBILE_BUSINESS_SALE',
  TmobileSale = 'TMOBILE_SALE',
  VerizonBusinessSale = 'VERIZON_BUSINESS_SALE',
  VerizonSale = 'VERIZON_SALE',
  ViasatSale = 'VIASAT_SALE',
  VivintSale = 'VIVINT_SALE',
  WindstreamBusinessSale = 'WINDSTREAM_BUSINESS_SALE',
  WindstreamSale = 'WINDSTREAM_SALE',
  WowBusinessSale = 'WOW_BUSINESS_SALE',
  WowSale = 'WOW_SALE',
  XfinityBusinessSale = 'XFINITY_BUSINESS_SALE',
  XfinitySale = 'XFINITY_SALE',
  ZiplySale = 'ZIPLY_SALE'
}

/** The ID of the Sara Plus user */
export enum SaraPlusAt_TUserId {
  None = 'NONE',
  NotAllowed = 'NOT_ALLOWED',
  SaraPlus_1 = 'SARA_PLUS_1',
  SaraPlus_2 = 'SARA_PLUS_2',
  SaraPlus_3 = 'SARA_PLUS_3',
  SaraPlus_4 = 'SARA_PLUS_4',
  SaraPlus_5 = 'SARA_PLUS_5'
}

/** TPV Status to confirm if it was completed successfully */
export enum TpvStatus {
  Complete = 'COMPLETE',
  Error = 'ERROR',
  Incomplete = 'INCOMPLETE',
  NotApplicable = 'NOT_APPLICABLE',
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

export type XfinityPaginatedSales = {
  __typename?: 'XfinityPaginatedSales';
  sales: Array<XfinitySaleDto>;
  total: Scalars['Int']['output'];
};

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
  concertOrderID: Scalars['String']['output'];
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
  concertOrderID: Scalars['String']['output'];
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
  concertOrderID?: InputMaybe<Scalars['String']['input']>;
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


export type CreateXfinitySaleMutation = { __typename?: 'Mutation', createXfinitySale: { __typename?: 'XfinitySale', id: string, orderDate: any, cx_firstName: string, cx_lastName: string, orderNumber: string, installationDate: any, installationTime: string, installation: string, streetAddress: string, streetAddressLine2?: string | null, city: string, state: string, zipcode: string, phoneNumber: string, phoneNumber_second?: string | null, socialSecurityNumber?: string | null, email: string, product: string, packageSold: string, comcastTpvStatus: string, concertOrderID: string, Internet: string, TV: string, Phone: string, HMS: string, agent: { __typename?: 'User', id: string } } };

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

export type CreateAtntSaleMutationVariables = Exact<{
  input: CreateAtntSaleInput;
}>;


export type CreateAtntSaleMutation = { __typename?: 'Mutation', createAtntSale: { __typename?: 'AtntSale', id: string, orderDate: any, state: string, cx_firstName: string, cx_lastName: string, concertOrderID: string, accountNumber: string, customerType: string, saraPlusAT_TUserID: string, orderNumber: string, installationDate: any, installationTime: string, installation: string, attTpvStatus: string, Internet: string, Phone: string, streetAddress: string, streetAddressLine2?: string | null, city: string, zipcode: string, phoneNumber: string, phoneNumber_second?: string | null, socialSecurityNumber?: string | null, email: string, product: string, packageSold: string, agent: { __typename?: 'User', id: string } } };

export type CreateAtntSaleBulkMutationVariables = Exact<{
  input: CreateBatchAtntSaleInput;
}>;


export type CreateAtntSaleBulkMutation = { __typename?: 'Mutation', createAtntSaleBulk: Array<{ __typename?: 'AtntSale', id: string, orderDate: any, state: string, cx_firstName: string, cx_lastName: string, concertOrderID: string, accountNumber: string, customerType: string, saraPlusAT_TUserID: string, orderNumber: string, installationDate: any, installationTime: string, installation: string, attTpvStatus: string, Internet: string, Phone: string, streetAddress: string, streetAddressLine2?: string | null, city: string, zipcode: string, phoneNumber: string, phoneNumber_second?: string | null, socialSecurityNumber?: string | null, email: string, product: string, packageSold: string, agent: { __typename?: 'User', id: string } }> };

export type CreateInterestedCustomerMutationVariables = Exact<{
  input: CreateInterestedCustomerInput;
}>;


export type CreateInterestedCustomerMutation = { __typename?: 'Mutation', createInterestedCustomer: { __typename?: 'InterestedCustomer', id: number, firstName: string, lastName: string, ssn: string, dob: string, callbackDate: string, callbackTime: string, phoneNumber: string, email: string, provider: Provider, address: string, city: string, state: string, zipCode: string, comments: string } };

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

export type FindAllSalesByAgentNameXfinityQueryVariables = Exact<{
  agentName: Scalars['String']['input'];
}>;


export type FindAllSalesByAgentNameXfinityQuery = { __typename?: 'Query', findAllSalesByAgentNameXfinity: Array<{ __typename?: 'XfinitySaleDTO', id: string, orderDate: any, agentName: string, cx_firstName: string, cx_lastName: string, orderNumber: string, installationDateFormatted: string, installationTime: string, installation: string, streetAddress: string, streetAddressLine2?: string | null, city: string, state: UsState, zipcode: string, phoneNumber: string, phoneNumber_second?: string | null, socialSecurityNumber?: string | null, email: string, product: string, packageSold: string, comcastTpvStatus: TpvStatus, concertOrderID: string, Internet: XfinityInternet, TV: XfinityTv, Phone: XfinityHomePhone, HMS: XfinityHomeSecurity }> };

export type GetSaleHistoryQueryVariables = Exact<{
  saleId: Scalars['String']['input'];
}>;


export type GetSaleHistoryQuery = { __typename?: 'Query', getSaleHistory: Array<{ __typename?: 'SaleStageHistory', stage: SaleFlag, timestamp: any, saleId: string, saleType: SaleType, user: { __typename?: 'User', name: string } }> };

export type FindSalesWithComplexFilterXfinityQueryVariables = Exact<{
  filter: XfinitySaleFilterInputDto;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindSalesWithComplexFilterXfinityQuery = { __typename?: 'Query', findSalesWithComplexFilterXfinity: { __typename?: 'XfinityPaginatedSales', total: number, sales: Array<{ __typename?: 'XfinitySaleDTO', id: string, orderDate: any, agentName: string, cx_firstName: string, cx_lastName: string, orderNumber: string, installationDateFormatted: string, installationTime: string, installation: string, streetAddress: string, streetAddressLine2?: string | null, city: string, state: UsState, zipcode: string, phoneNumber: string, phoneNumber_second?: string | null, socialSecurityNumber?: string | null, email: string, product: string, packageSold: string, comcastTpvStatus: TpvStatus, concertOrderID: string, Internet: XfinityInternet, TV: XfinityTv, Phone: XfinityHomePhone, HMS: XfinityHomeSecurity }> } };

export type CommentsBySaleQueryVariables = Exact<{
  saleId: Scalars['ID']['input'];
  saleType: Scalars['String']['input'];
}>;


export type CommentsBySaleQuery = { __typename?: 'Query', commentsBySale: Array<{ __typename?: 'Comment', id: string, text: string, fieldName: SaleField, status: CommentStatus, saleId: string, saleType: SaleType, user: { __typename?: 'User', id: string, name: string }, parentComment?: { __typename?: 'Comment', id: string, text: string } | null, replies?: Array<{ __typename?: 'Comment', id: string, text: string }> | null }> };

export type FindAllSalesByAgentNameAtntQueryVariables = Exact<{
  agentName: Scalars['String']['input'];
}>;


export type FindAllSalesByAgentNameAtntQuery = { __typename?: 'Query', findAllSalesByAgentNameATNT: Array<{ __typename?: 'AtntSaleDTO', id: string, orderDate: any, agentName: string, cx_firstName: string, cx_lastName: string, concertOrderID: string, accountNumber: string, customerType: AtntCustomerType, saraPlusAT_TUserID: SaraPlusAt_TUserId, orderNumber: string, installationDateFormatted: string, installationTime: string, installation: InstallationType, streetAddress: string, streetAddressLine2?: string | null, city: string, state: UsState, zipcode: string, phoneNumber: string, phoneNumber_second?: string | null, email: string, product: string, packageSold: string, attTpvStatus: TpvStatus, Internet: AtntInternet, Phone: AtntPhone }> };

export type FindSalesWithComplexFilterAtntQueryVariables = Exact<{
  filter: AtntSaleFilterInputDto;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindSalesWithComplexFilterAtntQuery = { __typename?: 'Query', findSalesWithComplexFilterATNT: { __typename?: 'ATNTPaginatedSales', total: number, sales: Array<{ __typename?: 'AtntSaleDTO', id: string, orderDate: any, agentName: string, cx_firstName: string, cx_lastName: string, concertOrderID: string, accountNumber: string, customerType: AtntCustomerType, saraPlusAT_TUserID: SaraPlusAt_TUserId, orderNumber: string, installationDateFormatted: string, installationTime: string, installation: InstallationType, streetAddress: string, streetAddressLine2?: string | null, city: string, state: UsState, zipcode: string, phoneNumber: string, phoneNumber_second?: string | null, email: string, product: string, packageSold: string, attTpvStatus: TpvStatus, Internet: AtntInternet, Phone: AtntPhone }> } };

export type GetAtntSaleByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAtntSaleByIdQuery = { __typename?: 'Query', getAtntSaleById: { __typename?: 'AtntSale', id: string, orderDate: any, cx_firstName: string, cx_lastName: string, concertOrderID: string, accountNumber: string, customerType: string, saraPlusAT_TUserID: string, orderNumber: string, installationDate: any, installationTime: string, installation: string, streetAddress: string, streetAddressLine2?: string | null, city: string, state: string, zipcode: string, phoneNumber: string, phoneNumber_second?: string | null, email: string, product: string, packageSold: string, attTpvStatus: string, Internet: string, Phone: string, agent: { __typename?: 'User', id: string } } };

export type InterestedCustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type InterestedCustomersQuery = { __typename?: 'Query', interestedCustomers: Array<{ __typename?: 'InterestedCustomer', id: number, firstName: string, lastName: string, ssn: string, dob: string, callbackDate: string, callbackTime: string, phoneNumber: string, email: string, provider: Provider, address: string, city: string, state: string, zipCode: string, comments: string }> };

export type InterestedCustomerQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type InterestedCustomerQuery = { __typename?: 'Query', interestedCustomer: { __typename?: 'InterestedCustomer', id: number, firstName: string, lastName: string, ssn: string, dob: string, callbackDate: string, callbackTime: string, phoneNumber: string, email: string, provider: Provider, address: string, city: string, state: string, zipCode: string, comments: string } };

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
    concertOrderID
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
export const CreateAtntSaleDocument = gql`
    mutation CreateAtntSale($input: CreateAtntSaleInput!) {
  createAtntSale(input: $input) {
    id
    orderDate
    state
    agent {
      id
    }
    cx_firstName
    cx_lastName
    concertOrderID
    accountNumber
    customerType
    saraPlusAT_TUserID
    orderNumber
    installationDate
    installationTime
    installation
    attTpvStatus
    Internet
    Phone
    streetAddress
    streetAddressLine2
    city
    zipcode
    phoneNumber
    phoneNumber_second
    socialSecurityNumber
    email
    product
    packageSold
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateAtntSaleGQL extends Apollo.Mutation<CreateAtntSaleMutation, CreateAtntSaleMutationVariables> {
    document = CreateAtntSaleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateAtntSaleBulkDocument = gql`
    mutation CreateAtntSaleBulk($input: CreateBatchAtntSaleInput!) {
  createAtntSaleBulk(input: $input) {
    id
    orderDate
    state
    agent {
      id
    }
    cx_firstName
    cx_lastName
    concertOrderID
    accountNumber
    customerType
    saraPlusAT_TUserID
    orderNumber
    installationDate
    installationTime
    installation
    attTpvStatus
    Internet
    Phone
    streetAddress
    streetAddressLine2
    city
    zipcode
    phoneNumber
    phoneNumber_second
    socialSecurityNumber
    email
    product
    packageSold
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateAtntSaleBulkGQL extends Apollo.Mutation<CreateAtntSaleBulkMutation, CreateAtntSaleBulkMutationVariables> {
    document = CreateAtntSaleBulkDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateInterestedCustomerDocument = gql`
    mutation CreateInterestedCustomer($input: CreateInterestedCustomerInput!) {
  createInterestedCustomer(createInterestedCustomerInput: $input) {
    id
    firstName
    lastName
    ssn
    dob
    callbackDate
    callbackTime
    phoneNumber
    email
    provider
    address
    city
    state
    zipCode
    comments
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateInterestedCustomerGQL extends Apollo.Mutation<CreateInterestedCustomerMutation, CreateInterestedCustomerMutationVariables> {
    document = CreateInterestedCustomerDocument;
    
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
export const FindAllSalesByAgentNameXfinityDocument = gql`
    query findAllSalesByAgentNameXfinity($agentName: String!) {
  findAllSalesByAgentNameXfinity(agentName: $agentName) {
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
    concertOrderID
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
  export class FindAllSalesByAgentNameXfinityGQL extends Apollo.Query<FindAllSalesByAgentNameXfinityQuery, FindAllSalesByAgentNameXfinityQueryVariables> {
    document = FindAllSalesByAgentNameXfinityDocument;
    
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
export const FindSalesWithComplexFilterXfinityDocument = gql`
    query FindSalesWithComplexFilterXfinity($filter: XfinitySaleFilterInputDto!, $limit: Int!, $offset: Int!, $search: String) {
  findSalesWithComplexFilterXfinity(
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
      concertOrderID
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
  export class FindSalesWithComplexFilterXfinityGQL extends Apollo.Query<FindSalesWithComplexFilterXfinityQuery, FindSalesWithComplexFilterXfinityQueryVariables> {
    document = FindSalesWithComplexFilterXfinityDocument;
    
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
export const FindAllSalesByAgentNameAtntDocument = gql`
    query FindAllSalesByAgentNameATNT($agentName: String!) {
  findAllSalesByAgentNameATNT(agentName: $agentName) {
    id
    orderDate
    agentName
    cx_firstName
    cx_lastName
    concertOrderID
    accountNumber
    customerType
    saraPlusAT_TUserID
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
    email
    product
    packageSold
    attTpvStatus
    Internet
    Phone
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindAllSalesByAgentNameAtntGQL extends Apollo.Query<FindAllSalesByAgentNameAtntQuery, FindAllSalesByAgentNameAtntQueryVariables> {
    document = FindAllSalesByAgentNameAtntDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const FindSalesWithComplexFilterAtntDocument = gql`
    query FindSalesWithComplexFilterATNT($filter: AtntSaleFilterInputDto!, $limit: Int!, $offset: Int!, $search: String) {
  findSalesWithComplexFilterATNT(
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
      concertOrderID
      accountNumber
      customerType
      saraPlusAT_TUserID
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
      email
      product
      packageSold
      attTpvStatus
      Internet
      Phone
    }
    total
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FindSalesWithComplexFilterAtntGQL extends Apollo.Query<FindSalesWithComplexFilterAtntQuery, FindSalesWithComplexFilterAtntQueryVariables> {
    document = FindSalesWithComplexFilterAtntDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAtntSaleByIdDocument = gql`
    query GetAtntSaleById($id: String!) {
  getAtntSaleById(id: $id) {
    id
    orderDate
    agent {
      id
    }
    cx_firstName
    cx_lastName
    concertOrderID
    accountNumber
    customerType
    saraPlusAT_TUserID
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
    email
    product
    packageSold
    attTpvStatus
    Internet
    Phone
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAtntSaleByIdGQL extends Apollo.Query<GetAtntSaleByIdQuery, GetAtntSaleByIdQueryVariables> {
    document = GetAtntSaleByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const InterestedCustomersDocument = gql`
    query InterestedCustomers {
  interestedCustomers {
    id
    firstName
    lastName
    ssn
    dob
    callbackDate
    callbackTime
    phoneNumber
    email
    provider
    address
    city
    state
    zipCode
    comments
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class InterestedCustomersGQL extends Apollo.Query<InterestedCustomersQuery, InterestedCustomersQueryVariables> {
    document = InterestedCustomersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const InterestedCustomerDocument = gql`
    query InterestedCustomer($id: Int!) {
  interestedCustomer(id: $id) {
    id
    firstName
    lastName
    ssn
    dob
    callbackDate
    callbackTime
    phoneNumber
    email
    provider
    address
    city
    state
    zipCode
    comments
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class InterestedCustomerGQL extends Apollo.Query<InterestedCustomerQuery, InterestedCustomerQueryVariables> {
    document = InterestedCustomerDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }