 

export interface API_Response<T = any> {
  result: boolean;
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

export interface LoginEmployee {
  id: number;
  name: string;
  userName: string;
  role: string;
  warehouseAssignedId: number;
  warehouseName: string;
}

export interface LoginResponseData {
  token: string;
  tokenType: string;
  expiresAtUtc: string;
  employee: LoginEmployee;
}
