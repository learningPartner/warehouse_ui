 

export interface API_Response<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface IUser {
  userId: number
  emailId: string
  password: string
  createdDate: string
  projectName: string
  fullName: string
  mobileNo: string
  extraId: any
}
