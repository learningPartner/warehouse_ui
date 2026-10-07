import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_Response } from '../models/interfaces/common.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { GLOBAL_CONSTANT } from '../constant/global.contant';
import { ClientModel } from '../models/classes/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  api_url: string =  environment.API_URL;


  http = inject(HttpClient)

  getAllClients(): Observable<API_Response> {
    return this.http.get<API_Response>(this.api_url + GLOBAL_CONSTANT.API_METHODS.GET_ALL_CLIENT)
  }

  saveClient(obj: ClientModel) :  Observable<API_Response>{
    return this.http.post<API_Response>(this.api_url + GLOBAL_CONSTANT.API_METHODS.SAVE_CLIENT,obj)
  }
}
