import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WarehouseService } from '../../core/services/warehouse-service';
import { IWarehouse, IWarehouseList } from '../../core/models/interfaces/warehouse.model';
import { API_Response } from '../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-warehouse-master',
  imports: [ReactiveFormsModule],
  templateUrl: './warehouse-master.html',
  styleUrl: './warehouse-master.css',
})
export class WarehouseMaster implements OnInit {

  warehousForm!: FormGroup;

  formBuilder = inject(FormBuilder);
  warehouseSr = inject(WarehouseService);

  gridList= signal<IWarehouseList[]>([]);
  editId: number | undefined = 0;

  constructor() {
    this.initializeForm();
  }

  ngOnInit(){
    debugger;
    this.getAll()
  }

  getAll() {
    this.warehouseSr.getAllWareHouse().subscribe({
      next:(res:API_Response)=>{
        this.gridList.set(res.data)
      }
    })
  }
  initializeForm() {
    this.warehousForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      address1: [''],
      address2: [''],
      city: [''],
      totalArea: [''],
      isColdStorageAvailable: [''],
    });
  }

  onSave() {
    const formValue = this.warehousForm.value as IWarehouse; 
    this.warehouseSr.createNew(formValue).subscribe({
      next: (res: API_Response) => {
        if(res.result) {
          alert("WareHouser Created ")
        } 
      },
      error: (err: HttpErrorResponse) => {
      },
    });
  }

  onEdit(data: IWarehouseList) {
    debugger;
    this.editId =  data.id;
    delete data.id;
    this.warehousForm.setValue(data)
  }
}
