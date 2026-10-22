import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GLOBAL_CONSTANT } from '../constant/global.contant';
import { LoginEmployee } from '../models/interfaces/common.model';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  showLoader$: Subject<boolean> = new Subject<boolean>();

  getLoggedUserData() :LoginEmployee | undefined {
    const localData = localStorage.getItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY);
    if (localData != null) {
      const user = JSON.parse(localData) as LoginEmployee;
      return user;
    } else {
      return undefined;
    }
  }
}
