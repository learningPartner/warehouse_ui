import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IWarehouse, IWarehouseList } from '../../../core/models/interfaces/warehouse.model';
import { WarehouseService } from '../../../core/services/warehouse-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { CommonImports } from '../../../core/constant/common.imports';

@Component({
  selector: 'app-new-employee',
  imports: [CommonImports.FORM_IMPORTS],
  templateUrl: './new-employee.html',
  styleUrl: './new-employee.css',
})
export class NewEmployee {

  wareHouseList$: Observable<IWarehouseList[]> = new Observable<IWarehouseList[]>;

  constructor(private warehouseSr : WarehouseService) {
    this.wareHouseList$ = this.warehouseSr.getAllWareHouse().pipe(
      map((result: API_Response)=> result.data.sort((a:IWarehouse, b:IWarehouse) => a.title.localeCompare(b.title)))
    )
  }

}
