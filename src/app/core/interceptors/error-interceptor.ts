import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err:HttpErrorResponse)=>{
      debugger;
      if(err.status == 400) {
        alert("Invalid Body / Bad Request")
      } else if (err.status ==500) {
        alert("API error")
      } else if (err.status == 401) {
        alert("Unauthoirized")
      } else if (err.status ==403) {
        alert("Invalid User role")
      }
      return throwError(err);
    })
  );
};
