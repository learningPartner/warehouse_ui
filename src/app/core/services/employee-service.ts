import { inject, Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { environment } from '../../../environments/environment.development';
import { GLOBAL_CONSTANT } from '../constant/global.contant';
import { map, Observable } from 'rxjs';
import { API_Response } from '../models/interfaces/common.model';
import { IEmployeeList } from '../models/interfaces/employee.model';

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
}
