import { inject, Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { environment } from '../../../environments/environment.development';
import { GLOBAL_CONSTANT } from '../constant/global.contant';
import { map, Observable } from 'rxjs';
import { API_Response } from '../models/interfaces/common.model';
import { IEmployee, IEmployeeList } from '../models/interfaces/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  apiService = inject(ApiService);

  getAllEmployee(): Observable<IEmployeeList[]> {
    return this.apiService.get(environment.API_URL +  GLOBAL_CONSTANT.API_METHODS.GET_ALL_EMPLOYEE).pipe(
      map((result:API_Response)=> result.data)
    )
  }

  getEmpById(id: number) : Observable<API_Response> {
     return this.apiService.get(environment.API_URL +  GLOBAL_CONSTANT.API_METHODS.GET_EMPLOYEE_BY_ID + id) 
  }
  saveEmp(obj: IEmployee) : Observable<API_Response> {
    return this.apiService.post<API_Response>(environment.API_URL +  GLOBAL_CONSTANT.API_METHODS.SAVE_EMPLOYEE,obj) 
  }

  updateEmp(obj: IEmployee, id: number) : Observable<API_Response> {
    return this.apiService.put<API_Response>(environment.API_URL +  GLOBAL_CONSTANT.API_METHODS.UPDATE_EMPLOYEE + id,obj) 
  }


}
