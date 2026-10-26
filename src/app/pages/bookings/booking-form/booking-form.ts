import { Component, inject, signal } from '@angular/core';
import { WarehouseService } from '../../../core/services/warehouse-service';
import { ClientService } from '../../../core/services/client-service';
import { map, Observable } from 'rxjs';
import { IWarehouseList } from '../../../core/models/interfaces/warehouse.model';
import { API_Response, LoginEmployee } from '../../../core/models/interfaces/common.model';
import { AsyncPipe } from '@angular/common';
import { ClientModel } from '../../../core/models/classes/client.model';
import { FormsModule } from '@angular/forms';
import { GLOBAL_CONSTANT } from '../../../core/constant/global.contant';
import { WarehouseSpaceModel } from '../../../core/models/classes/warehoouse.model';
import { BookingService } from '../../../core/services/booking-service';
import { CommonService } from '../../../core/services/common-service';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';


@Component({
  selector: 'app-booking-form',
  imports: [AsyncPipe, FormsModule, DatePickerModule, SelectModule],
  templateUrl: './booking-form.html',
  styleUrl: './booking-form.css',
})
export class BookingForm {
  wareHosuSrv = inject(WarehouseService);
  customerSrv = inject(ClientService);
  commonService =  inject(CommonService);
  bookingSrv = inject(BookingService);

  customerList$: Observable<ClientModel[]> = new Observable<ClientModel[]>();
  wareHouseList$: Observable<IWarehouseList[]> = new Observable<IWarehouseList[]>();
  spaceList = signal<WarehouseSpaceModel[]>([])

  bookingObj: any = {
    customerId: 0,
    warehouseId: 0,
    spaceId: 0,
    bookingFromDate: '2026-01-01T09:00:00Z',
    bookingTillDate: '2026-01-01T09:00:00Z',
    sqftAreaNeeded: 121,
    totalAmount: 0,
    bookingDoneBy: 0,
  };
  minDate: Date =  new Date();

  constructor() {
    this.minDate =   new Date();
   this.minDate.setDate(this.minDate.getDate() - 2); 
    const localData = this.commonService.getLoggedUserData();
    if (localData != undefined) { 
      this.bookingObj.bookingDoneBy = localData.id;
    }

    this.customerList$ = this.customerSrv
      .getAllClients()
      .pipe(map((res: API_Response) => res.data));
    this.wareHouseList$ = this.wareHosuSrv
      .getAllWareHouse()
      .pipe(map((res: API_Response) => res.data));
  }

  onChangeWarehouse() {
    this.wareHosuSrv.getSpaceByWarehouseId(this.bookingObj.warehouseId).subscribe({
      next:(res:API_Response)=>{
        this.spaceList.set(res.data)
      }
    })
  }

  onSaveBooking() {
    debugger;
    this.bookingSrv.addBooking(this.bookingObj).subscribe({
      next:(res:API_Response)=>{
        if(res.result) {
          alert("Booking Success")
        } else {
          alert(res.message)
        }
      }
    })
  }
}
