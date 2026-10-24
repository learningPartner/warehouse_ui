import { Component, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IWarehouse, IWarehouseList } from '../../../core/models/interfaces/warehouse.model';
import { WarehouseService } from '../../../core/services/warehouse-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { CommonImports } from '../../../core/constant/common.imports';
import { IEmployee } from '../../../core/models/interfaces/employee.model';
import { form, FormField } from '@angular/forms/signals';
import { GLOBAL_CONSTANT } from '../../../core/constant/global.contant';
import { EmployeeService } from '../../../core/services/employee-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-employee',
  imports: [CommonImports.FORM_IMPORTS, FormField],
  templateUrl: './new-employee.html',
  styleUrl: './new-employee.css',
})
export class NewEmployee {

  wareHouseList$: Observable<IWarehouseList[]> = new Observable<IWarehouseList[]>;
  empSignal  = signal<IEmployee>({
    mobileNo:'',
    name:'',
    password:'',
    role:'',
    userName:'',
    warehouseAssignedId:''
  })

  roleList: string[] =  GLOBAL_CONSTANT.ROLES;
  employeForm = form(this.empSignal);
  currentEmpId: number = 0;



  constructor(private warehouseSr : WarehouseService, private empSr : EmployeeService, private actiavteRoiute: ActivatedRoute) {
    this.wareHouseList$ = this.warehouseSr.getAllWareHouse().pipe(
      map((result: API_Response)=> result.data.sort((a:IWarehouse, b:IWarehouse) => a.title.localeCompare(b.title)))
    )
    this.actiavteRoiute.params.subscribe((res:any)=>{
      debugger;
      this.currentEmpId =  res.empid;
      if(this.currentEmpId != 0) {
        this.getEmp();
      }
    })
  }

  onSaveEmployee() {
    const formValue = this.employeForm().value();
    debugger;
    this.empSr.saveEmp(formValue).subscribe({
      next:(res:API_Response)=>{
        if(res.result){
          alert("Employee Created")
        } else {
          alert(res.message)
        }
      }, error:()=>{
        
      }
    })
  }

  onUpdateEmployee() {
    const formValue = this.employeForm().value()  as any;
    formValue.password = null;
    this.empSr.updateEmp(formValue, this.currentEmpId).subscribe({
      next:(res:API_Response)=>{
        if(res.result){
          alert("Employee Created")
        } else {
          alert(res.message)
        }
      }
    })
  }

  getEmp() {
    this.empSr.getEmpById(this.currentEmpId).subscribe({
      next:(res:API_Response) =>{ 
        const newObj: IEmployee = { 
          name: res.data.mobileNo,
          password: '',
          role: res.data.role,
          mobileNo: res.data.mobileNo,
          userName: res.data.userName,
          warehouseAssignedId: res.data.warehouseAssignedId 
        };
        this.empSignal.set(newObj)

      }
    })
  }

}
