import { HttpInterceptorFn } from '@angular/common/http';
import { GLOBAL_CONSTANT } from '../constant/global.contant';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  const router = inject(Router)
  console.log('tokenInterceptor executed');
  if (req.url.includes('login')) {
    return next(req);
  } else {
    const token = localStorage.getItem(GLOBAL_CONSTANT.LOCAL_TOKEN_KEY);
    const cloneRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }); 
    return next(cloneRequest);
  }
};
