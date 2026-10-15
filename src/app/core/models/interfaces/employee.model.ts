export interface IEmployee {
  name: string
  warehouseAssignedId: string
  mobileNo: string
  role: string
  userName: string
  password: string
}

export interface IEmployeeList extends IEmployee {
  id: number  
  warehouseName: string
  warehouseCity: string 
}


