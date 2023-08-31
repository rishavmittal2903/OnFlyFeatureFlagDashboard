export interface IUserState {
  firstName: string;
  lastName?:string;
  mobileNumber?: string;
  dateOfBirth?: string
  gender?: string;
  email:string
  organizationId?: string;
  isAuthenticated?:boolean;
  password?:string
}
