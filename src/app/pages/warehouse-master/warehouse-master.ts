import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WarehouseService } from '../../core/services/warehouse-service';
import { IWarehouse, IWarehouseList } from '../../core/models/interfaces/warehouse.model';
import { API_Response } from '../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http'; 
import { CommonImports } from '../../core/constant/common.imports';

@Component({
  selector: 'app-warehouse-master',
  imports: [CommonImports.FORM_IMPORTS],
  templateUrl: './warehouse-master.html',
  styleUrl: './warehouse-master.css',
})
export class WarehouseMaster implements OnInit {

  warehousForm!: FormGroup;

  formBuilder = inject(FormBuilder);
  warehouseSr = inject(WarehouseService);

  gridList= signal<IWarehouseList[]>([]);
  editId: number | undefined = 0;
  totlArea: number = 0;
  coldStoargeLength: number = 0;

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
        this.gridList.set(res.data);  

        // this.gridList().forEach(element => {
        //     this.totlArea =  this.totlArea + element.totalArea;
        // });
        this.coldStoargeLength =  this.gridList().filter(m=>m.isColdStorageAvailable == true).length;


        this.totlArea =  this.gridList().reduce((acc, cur)=>{
          return acc + cur.totalArea
        },0)
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
