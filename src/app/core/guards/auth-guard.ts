import { CanActivateFn, Router } from '@angular/router';
import { GLOBAL_CONSTANT } from '../constant/global.contant';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  debugger;
  const router = inject(Router);
  const isLocaDataPresent =  localStorage.getItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY);
  if(isLocaDataPresent != null) {
     return true;
  } else {
     router.navigateByUrl("/login")
     return false;
  }

 
};
