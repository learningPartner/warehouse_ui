import { inject, Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { environment } from '../../../environments/environment.development';
import { GLOBAL_CONSTANT } from '../constant/global.contant';
import { Observable } from 'rxjs';
import { API_Response } from '../models/interfaces/common.model';
import { IBookingListItem } from '../models/interfaces/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {

  apiSrv  = inject(ApiService)

  addBooking(obj:any) {
    return this.apiSrv.post(environment.API_URL + GLOBAL_CONSTANT.API_METHODS.ADD_BOOKING,obj)
  }

  getAllBookings(): Observable<API_Response<IBookingListItem[]>> {
    return this.apiSrv.get(environment.API_URL + GLOBAL_CONSTANT.API_METHODS.GET_ALL_BOOKINGS);
  }
}
