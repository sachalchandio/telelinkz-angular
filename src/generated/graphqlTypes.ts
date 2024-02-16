import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Suspended = 'SUSPENDED',
  Unverified = 'UNVERIFIED',
}

export type CvFramework = {
  __typename?: 'CVFramework';
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** Programming framework name - CV */
  name: Scalars['String']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CvFrameworkInputDto = {
  name: Scalars['String']['input'];
};

export type CvLang = {
  __typename?: 'CVLang';
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** Programming Language name */
  name: Scalars['String']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CvLangInputDto = {
  name: Scalars['String']['input'];
};

export type Certificate = {
  __typename?: 'Certificate';
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Certificate End Date */
  endDate: Scalars['String']['output'];
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** link to certificate */
  link?: Maybe<Scalars['String']['output']>;
  /** Certificate Start Date */
  startDate: Scalars['String']['output'];
  /** Certificate TItle */
  title: Scalars['String']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CertificateInputDto = {
  endDate: Scalars['String']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  createdAt: Scalars['DateTime']['output'];
  fromUser: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  session: ChatSession;
  text: Scalars['String']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ChatSession = {
  __typename?: 'ChatSession';
  closedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Primary ID */
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ContactForm = {
  __typename?: 'ContactForm';
  Date: Scalars['String']['output'];
  Time: Scalars['String']['output'];
  TimeZone: Scalars['String']['output'];
  /** Name of your company */
  companyName: Scalars['String']['output'];
  /** Website of your Company */
  companyWebsite?: Maybe<Scalars['String']['output']>;
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  devRates: Scalars['String']['output'];
  /** Email */
  email: Scalars['String']['output'];
  /** First Name */
  firstName: Scalars['String']['output'];
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** Last Name */
  lastName: Scalars['String']['output'];
  noDevsHire: Scalars['String']['output'];
  /** Number of Employees in Company */
  noEmployees: Scalars['String']['output'];
  projAge: Scalars['String']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ContactFormDto = {
  CompanySize: Scalars['String']['input'];
  DevsHire: Scalars['String']['input'];
  HourlyRates: Scalars['String']['input'];
  callTimezone: Scalars['String']['input'];
  companyName: Scalars['String']['input'];
  companyWebsite: Scalars['String']['input'];
  customSize: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  meetingDate: Scalars['String']['input'];
  projDuration: Scalars['String']['input'];
  selectedTime: Scalars['String']['input'];
};

export type CreateShortContactInput = {
  email: Scalars['String']['input'];
  meeting_date?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

export type Institution = {
  __typename?: 'Institution';
  /** Degree End Date */
  EndDate: Scalars['String']['output'];
  /** Degree Start Date */
  StartDate: Scalars['String']['output'];
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** link to certificate */
  degree: Scalars['String']['output'];
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** Certificate TItle */
  title: Scalars['String']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type InstitutionDto = {
  EndDate?: InputMaybe<Scalars['String']['input']>;
  StartDate?: InputMaybe<Scalars['String']['input']>;
  degree?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type JobExperience = {
  __typename?: 'JobExperience';
  /** Name of the company you have worked with */
  companyName: Scalars['String']['output'];
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Your Role in the company */
  designation: Scalars['String']['output'];
  /** endYear */
  endYear: Scalars['String']['output'];
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** Your Responsibilities in the company */
  jobResponsibility: Scalars['String']['output'];
  /** startYear */
  startYear: Scalars['String']['output'];
  /** Write breif info about the technologies you have worked with */
  technologies: Scalars['String']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type JobExperienceDto = {
  companyName: Scalars['String']['input'];
  designation: Scalars['String']['input'];
  endYear: Scalars['String']['input'];
  jobResponsibility: Scalars['String']['input'];
  startYear: Scalars['String']['input'];
  technologies: Scalars['String']['input'];
};

export type Library = {
  __typename?: 'Library';
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** Programming Language name */
  name: Scalars['String']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type LibraryInputDto = {
  name: Scalars['String']['input'];
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
  /** Resume ID */
  resume_id: Scalars['String']['output'];
  userType?: Maybe<UserType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  closeChatSession: ChatSession;
  createChatMessage: ChatMessage;
  createChatSession: ChatSession;
  createContactForm: ContactForm;
  createResume: Resume;
  createServiceSelectionForm: ServiceSelectionForm;
  createShortContactForm: ShortContactForm;
  registerUser: RegisterUserResponseDto;
  removeResume: Resume;
  seedUsers?: Maybe<Array<User>>;
  updateUser: UserDto;
};

export type MutationCloseChatSessionArgs = {
  sessionId: Scalars['String']['input'];
};

export type MutationCreateChatMessageArgs = {
  fromUser: Scalars['Boolean']['input'];
  sessionId: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type MutationCreateContactFormArgs = {
  input: ContactFormDto;
};

export type MutationCreateResumeArgs = {
  resumeInput: ResumeInputDto;
};

export type MutationCreateServiceSelectionFormArgs = {
  input: ServiceSelectionDto;
};

export type MutationCreateShortContactFormArgs = {
  input: CreateShortContactInput;
};

export type MutationRegisterUserArgs = {
  registerUserInput: RegisterUserInput;
};

export type MutationRemoveResumeArgs = {
  id: Scalars['String']['input'];
};

export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Paradigm = {
  __typename?: 'Paradigm';
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** Programming paradigm name */
  name: Scalars['String']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ParadigmInputDto = {
  name: Scalars['String']['input'];
};

export type Platform = {
  __typename?: 'Platform';
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** Programming platform name */
  name: Scalars['String']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type PlatformInputDto = {
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  currentUser: UserDto;
  getChatSession?: Maybe<ChatSession>;
  getResume: Resume;
  loginUser: LoginUserResponse;
  resumes: Array<Resume>;
};

export type QueryGetChatSessionArgs = {
  id: Scalars['String']['input'];
};

export type QueryGetResumeArgs = {
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

export type Resume = {
  __typename?: 'Resume';
  /** About Me as a developer */
  aboutMe: Scalars['String']['output'];
  /** Availability -> Part Time or Full Time */
  availability: Scalars['String']['output'];
  /** Short Bio - as in habits */
  bio: Scalars['String']['output'];
  /** FileName in the S3 Bucket */
  bucket_filename: Scalars['String']['output'];
  certificates: Array<Certificate>;
  /** City Name */
  city: Scalars['String']['output'];
  /** Country Name */
  country: Scalars['String']['output'];
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  cvframeworks: Array<CvFramework>;
  cvlangs: Array<CvLang>;
  /** link to Resume Document */
  designation: Scalars['String']['output'];
  /** Number of years in development */
  devExpYears: Scalars['String']['output'];
  /** link to Resume Document */
  fullName: Scalars['String']['output'];
  /** Dev hourly Price */
  hourly_rate: Scalars['String']['output'];
  /** Primary ID */
  id: Scalars['ID']['output'];
  institutions: Array<Institution>;
  /** If the CV is to be shown or not has to be approved first */
  isAllowed: Scalars['Boolean']['output'];
  jobExperiences: Array<JobExperience>;
  libraries: Array<Library>;
  /** Number Of Orders Compeleted */
  orders_completed: Scalars['String']['output'];
  /** others */
  others: Scalars['String']['output'];
  paradigms: Array<Paradigm>;
  /** link to Photo Document */
  photo_url: Scalars['String']['output'];
  platforms: Array<Platform>;
  /** link to Resume Document */
  resume_pdf_url: Scalars['String']['output'];
  /** Availability -> Part Time or Full Time */
  role: Scalars['String']['output'];
  storages: Array<Storage>;
  /** Timezone */
  timezone: Scalars['String']['output'];
  tools: Array<Tool>;
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ResumeInputDto = {
  aboutMe: Scalars['String']['input'];
  availability: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  certificates: Array<CertificateInputDto>;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  cvframeworks: Array<CvFrameworkInputDto>;
  cvlangs: Array<CvLangInputDto>;
  designation: Scalars['String']['input'];
  devExpYears: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  institutions: Array<InstitutionDto>;
  isAllowed: Scalars['Boolean']['input'];
  jobExperiences: Array<JobExperienceDto>;
  libraries: Array<LibraryInputDto>;
  others: Scalars['String']['input'];
  paradigms: Array<ParadigmInputDto>;
  photo_url: Scalars['String']['input'];
  platforms: Array<PlatformInputDto>;
  resume_pdf_url: Scalars['String']['input'];
  role: Scalars['String']['input'];
  storages: Array<StorageInputDto>;
  timezone: Scalars['String']['input'];
  tools: Array<ToolInputDto>;
};

export type ServiceSelectionDto = {
  business_name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  service_selected: Scalars['String']['input'];
};

export type ServiceSelectionForm = {
  __typename?: 'ServiceSelectionForm';
  /** Business name */
  business_name: Scalars['String']['output'];
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** User's Email */
  email: Scalars['String']['output'];
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** User's name */
  name: Scalars['String']['output'];
  /** Phone Number */
  phone_number: Scalars['String']['output'];
  /** The type of service required by user */
  service_required: Scalars['String']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ShortContactForm = {
  __typename?: 'ShortContactForm';
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Email */
  email: Scalars['String']['output'];
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** First Name */
  name: Scalars['String']['output'];
  /** Last Name */
  phoneNumber: Scalars['String']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Storage = {
  __typename?: 'Storage';
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** Programming Storage name */
  name: Scalars['String']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type StorageInputDto = {
  name: Scalars['String']['input'];
};

export type Tool = {
  __typename?: 'Tool';
  /** Created at Date */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Primary ID */
  id: Scalars['ID']['output'];
  /** Programming Tool name */
  name: Scalars['String']['output'];
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ToolInputDto = {
  name: Scalars['String']['input'];
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
  /** Updated at Date */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** User type: 'Admin' | 'Developer' */
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
  Developer = 'DEVELOPER',
}

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;

export type RegisterUserMutation = {
  __typename?: 'Mutation';
  registerUser: {
    __typename?: 'RegisterUserResponseDto';
    email: string;
    name: string;
    accessToken: string;
    userType: UserType;
  };
};

export type CreateServiceSelectionFormMutationVariables = Exact<{
  input: ServiceSelectionDto;
}>;

export type CreateServiceSelectionFormMutation = {
  __typename?: 'Mutation';
  createServiceSelectionForm: {
    __typename?: 'ServiceSelectionForm';
    id: string;
    name: string;
    email: string;
    phone_number: string;
    service_required: string;
    createdAt?: any | null;
    updatedAt?: any | null;
  };
};

export type CreateShortContactFormMutationVariables = Exact<{
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  email: Scalars['String']['input'];
  meeting_date?: InputMaybe<Scalars['String']['input']>;
}>;

export type CreateShortContactFormMutation = {
  __typename?: 'Mutation';
  createShortContactForm: {
    __typename?: 'ShortContactForm';
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    createdAt?: any | null;
    updatedAt?: any | null;
  };
};

export type CreateContactFormMutationVariables = Exact<{
  input: ContactFormDto;
}>;

export type CreateContactFormMutation = {
  __typename?: 'Mutation';
  createContactForm: {
    __typename?: 'ContactForm';
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    companyWebsite?: string | null;
    noEmployees: string;
    noDevsHire: string;
    devRates: string;
    projAge: string;
    Date: string;
    Time: string;
    TimeZone: string;
  };
};

export type CreateResumeMutationVariables = Exact<{
  resumeInput: ResumeInputDto;
}>;

export type CreateResumeMutation = {
  __typename?: 'Mutation';
  createResume: {
    __typename?: 'Resume';
    id: string;
    isAllowed: boolean;
    photo_url: string;
    resume_pdf_url: string;
    fullName: string;
    designation: string;
    country: string;
    city: string;
    timezone: string;
    aboutMe: string;
    bio: string;
    devExpYears: string;
    availability: string;
    role: string;
    others: string;
    certificates: Array<{
      __typename?: 'Certificate';
      title: string;
      startDate: string;
      endDate: string;
    }>;
    institutions: Array<{
      __typename?: 'Institution';
      title: string;
      degree: string;
    }>;
    jobExperiences: Array<{
      __typename?: 'JobExperience';
      companyName: string;
      designation: string;
      technologies: string;
      startYear: string;
      endYear: string;
      jobResponsibility: string;
    }>;
    tools: Array<{ __typename?: 'Tool'; name: string }>;
    platforms: Array<{ __typename?: 'Platform'; name: string }>;
    paradigms: Array<{ __typename?: 'Paradigm'; name: string }>;
    storages: Array<{ __typename?: 'Storage'; name: string }>;
    libraries: Array<{ __typename?: 'Library'; name: string }>;
    cvframeworks: Array<{ __typename?: 'CVFramework'; name: string }>;
    cvlangs: Array<{ __typename?: 'CVLang'; name: string }>;
  };
};

export type CreateChatSessionMutationVariables = Exact<{
  [key: string]: never;
}>;

export type CreateChatSessionMutation = {
  __typename?: 'Mutation';
  createChatSession: {
    __typename?: 'ChatSession';
    id: string;
    isActive: boolean;
    createdAt?: any | null;
  };
};

export type CloseChatSessionMutationVariables = Exact<{
  sessionId: Scalars['String']['input'];
}>;

export type CloseChatSessionMutation = {
  __typename?: 'Mutation';
  closeChatSession: {
    __typename?: 'ChatSession';
    id: string;
    isActive: boolean;
    closedAt?: any | null;
  };
};

export type CreateChatMessageMutationVariables = Exact<{
  sessionId: Scalars['String']['input'];
  text: Scalars['String']['input'];
  fromUser: Scalars['Boolean']['input'];
}>;

export type CreateChatMessageMutation = {
  __typename?: 'Mutation';
  createChatMessage: {
    __typename?: 'ChatMessage';
    id: string;
    text: string;
    fromUser: boolean;
    createdAt: any;
  };
};

export type LoginUserQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginUserQuery = {
  __typename?: 'Query';
  loginUser: {
    __typename?: 'LoginUserResponse';
    id?: string | null;
    accessToken: string;
    name?: string | null;
    email?: string | null;
    userType?: UserType | null;
    profileImageURL?: string | null;
    dateOfBirth?: string | null;
    resume_id: string;
  };
};

export type GetResumeQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetResumeQuery = {
  __typename?: 'Query';
  getResume: {
    __typename?: 'Resume';
    id: string;
    createdAt?: any | null;
    photo_url: string;
    hourly_rate: string;
    orders_completed: string;
    resume_pdf_url: string;
    fullName: string;
    designation: string;
    country: string;
    city: string;
    timezone: string;
    aboutMe: string;
    bio: string;
    devExpYears: string;
    availability: string;
    role: string;
    others: string;
    bucket_filename: string;
    certificates: Array<{
      __typename?: 'Certificate';
      id: string;
      link?: string | null;
      title: string;
      startDate: string;
      endDate: string;
    }>;
    institutions: Array<{
      __typename?: 'Institution';
      id: string;
      createdAt?: any | null;
      title: string;
      degree: string;
      StartDate: string;
      EndDate: string;
    }>;
    jobExperiences: Array<{
      __typename?: 'JobExperience';
      id: string;
      createdAt?: any | null;
      companyName: string;
      designation: string;
      startYear: string;
      endYear: string;
      jobResponsibility: string;
      technologies: string;
    }>;
    tools: Array<{
      __typename?: 'Tool';
      id: string;
      createdAt?: any | null;
      name: string;
    }>;
    cvlangs: Array<{
      __typename?: 'CVLang';
      id: string;
      createdAt?: any | null;
      name: string;
    }>;
    cvframeworks: Array<{
      __typename?: 'CVFramework';
      id: string;
      createdAt?: any | null;
      name: string;
    }>;
    platforms: Array<{
      __typename?: 'Platform';
      id: string;
      createdAt?: any | null;
      name: string;
    }>;
    paradigms: Array<{
      __typename?: 'Paradigm';
      id: string;
      createdAt?: any | null;
      name: string;
    }>;
    storages: Array<{
      __typename?: 'Storage';
      id: string;
      createdAt?: any | null;
      name: string;
    }>;
    libraries: Array<{
      __typename?: 'Library';
      id: string;
      createdAt?: any | null;
      name: string;
    }>;
  };
};

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
  providedIn: 'root',
})
export class RegisterUserGQL extends Apollo.Mutation<
  RegisterUserMutation,
  RegisterUserMutationVariables
> {
  override document = RegisterUserDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateServiceSelectionFormDocument = gql`
  mutation createServiceSelectionForm($input: ServiceSelectionDTO!) {
    createServiceSelectionForm(input: $input) {
      id
      name
      email
      phone_number
      service_required
      createdAt
      updatedAt
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateServiceSelectionFormGQL extends Apollo.Mutation<
  CreateServiceSelectionFormMutation,
  CreateServiceSelectionFormMutationVariables
> {
  override document = CreateServiceSelectionFormDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateShortContactFormDocument = gql`
  mutation CreateShortContactForm(
    $name: String!
    $phoneNumber: String!
    $email: String!
    $meeting_date: String
  ) {
    createShortContactForm(
      input: {
        name: $name
        phoneNumber: $phoneNumber
        email: $email
        meeting_date: $meeting_date
      }
    ) {
      id
      name
      phoneNumber
      email
      createdAt
      updatedAt
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateShortContactFormGQL extends Apollo.Mutation<
  CreateShortContactFormMutation,
  CreateShortContactFormMutationVariables
> {
  override document = CreateShortContactFormDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateContactFormDocument = gql`
  mutation CreateContactForm($input: ContactFormDTO!) {
    createContactForm(input: $input) {
      id
      firstName
      lastName
      email
      companyName
      companyWebsite
      noEmployees
      noDevsHire
      devRates
      projAge
      Date
      Time
      TimeZone
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateContactFormGQL extends Apollo.Mutation<
  CreateContactFormMutation,
  CreateContactFormMutationVariables
> {
  override document = CreateContactFormDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateResumeDocument = gql`
  mutation CreateResume($resumeInput: ResumeInputDTO!) {
    createResume(resumeInput: $resumeInput) {
      id
      isAllowed
      photo_url
      resume_pdf_url
      fullName
      designation
      country
      city
      timezone
      aboutMe
      bio
      devExpYears
      availability
      role
      others
      certificates {
        title
        startDate
        endDate
      }
      institutions {
        title
        degree
      }
      jobExperiences {
        companyName
        designation
        technologies
        startYear
        endYear
        jobResponsibility
      }
      tools {
        name
      }
      platforms {
        name
      }
      paradigms {
        name
      }
      storages {
        name
      }
      libraries {
        name
      }
      cvframeworks {
        name
      }
      cvlangs {
        name
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateResumeGQL extends Apollo.Mutation<
  CreateResumeMutation,
  CreateResumeMutationVariables
> {
  override document = CreateResumeDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateChatSessionDocument = gql`
  mutation CreateChatSession {
    createChatSession {
      id
      isActive
      createdAt
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateChatSessionGQL extends Apollo.Mutation<
  CreateChatSessionMutation,
  CreateChatSessionMutationVariables
> {
  override document = CreateChatSessionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CloseChatSessionDocument = gql`
  mutation CloseChatSession($sessionId: String!) {
    closeChatSession(sessionId: $sessionId) {
      id
      isActive
      closedAt
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CloseChatSessionGQL extends Apollo.Mutation<
  CloseChatSessionMutation,
  CloseChatSessionMutationVariables
> {
  override document = CloseChatSessionDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const CreateChatMessageDocument = gql`
  mutation CreateChatMessage(
    $sessionId: String!
    $text: String!
    $fromUser: Boolean!
  ) {
    createChatMessage(sessionId: $sessionId, text: $text, fromUser: $fromUser) {
      id
      text
      fromUser
      createdAt
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateChatMessageGQL extends Apollo.Mutation<
  CreateChatMessageMutation,
  CreateChatMessageMutationVariables
> {
  override document = CreateChatMessageDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const LoginUserDocument = gql`
  query LoginUser($email: String!, $password: String!) {
    loginUser(loginUserInput: { email: $email, password: $password }) {
      id
      accessToken
      name
      email
      userType
      profileImageURL
      dateOfBirth
      resume_id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class LoginUserGQL extends Apollo.Query<
  LoginUserQuery,
  LoginUserQueryVariables
> {
  override document = LoginUserDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
export const GetResumeDocument = gql`
  query GetResume($id: String!) {
    getResume(id: $id) {
      id
      createdAt
      photo_url
      hourly_rate
      orders_completed
      resume_pdf_url
      fullName
      designation
      country
      city
      timezone
      aboutMe
      bio
      devExpYears
      availability
      role
      others
      bucket_filename
      certificates {
        id
        link
        title
        startDate
        endDate
      }
      institutions {
        id
        createdAt
        title
        degree
        StartDate
        EndDate
      }
      jobExperiences {
        id
        createdAt
        companyName
        designation
        startYear
        endYear
        jobResponsibility
        technologies
      }
      tools {
        id
        createdAt
        name
      }
      cvlangs {
        id
        createdAt
        name
      }
      cvframeworks {
        id
        createdAt
        name
      }
      platforms {
        id
        createdAt
        name
      }
      paradigms {
        id
        createdAt
        name
      }
      storages {
        id
        createdAt
        name
      }
      libraries {
        id
        createdAt
        name
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetResumeGQL extends Apollo.Query<
  GetResumeQuery,
  GetResumeQueryVariables
> {
  override document = GetResumeDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
