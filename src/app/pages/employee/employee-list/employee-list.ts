import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployeeList } from '../../../core/models/interfaces/employee.model';
import { EmployeeService } from '../../../core/services/employee-service'; 
import { CommonImports } from '../../../core/constant/common.imports';

@Component({
  selector: 'app-employee-list',
  imports: [CommonImports.FORM_IMPORTS],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {


  employeeList$ : Observable<IEmployeeList[]> = new Observable<IEmployeeList[]>;
  empService =  inject(EmployeeService);

  constructor() {
    this.employeeList$ = this.empService.getAllEmployee();
  }

}
