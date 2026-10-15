import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_Response } from '../models/interfaces/common.model';
import { environment } from '../../../environments/environment.development';
import { GLOBAL_CONSTANT } from '../constant/global.contant';
import { IWarehouse } from '../models/interfaces/warehouse.model';
import { WarehouseSpaceModel } from '../models/classes/warehoouse.model';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {

  http = inject(HttpClient);


  getAllWareHouse() : Observable<API_Response>{
    return this.http.get<API_Response>(environment.API_URL + GLOBAL_CONSTANT.API_METHODS.GET_ALL_WAREHOUSE)
  }

  createNew(obj: IWarehouse) {
     return this.http.post<API_Response>(environment.API_URL + GLOBAL_CONSTANT.API_METHODS.CREATE_WAREHOUS, obj)
  }

  getWarehouseById(id: number){
    return this.http.get<API_Response>(environment.API_URL + GLOBAL_CONSTANT.API_METHODS.GET_SINGLE_WAREHOUS + id)
  }

  getSpaceByWarehouseId(id: number){
    return this.http.get<API_Response>(environment.API_URL + GLOBAL_CONSTANT.API_METHODS.GET_SPACE_BY_WAREHOUSE_ID + id)
  }

   saveSpace(obj: WarehouseSpaceModel) {
     return this.http.post<API_Response>(environment.API_URL + GLOBAL_CONSTANT.API_METHODS.ADD_SPACE, obj)
  }
}
