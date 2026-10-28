import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { BookingService } from '../../core/services/booking-service';
import { WarehouseService } from '../../core/services/warehouse-service';
import { catchError, map, Observable, of } from 'rxjs';
import { IWarehouseList } from '../../core/models/interfaces/warehouse.model';
import { API_Response } from '../../core/models/interfaces/common.model';
import {
  IBookingCalendarBooking,
  IBookingCalendarData,
  IBookingCalendarSpace,
  ICreateBookingRequest,
} from '../../core/models/interfaces/booking.model';
import { AsyncPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ClientService } from '../../core/services/client-service';
import { ClientModel } from '../../core/models/classes/client.model';
import { CommonService } from '../../core/services/common-service';

@Component({
  imports: [AsyncPipe, FormsModule],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {

  bookingSrv = inject(BookingService);
  wareHouseSrv = inject(WarehouseService);
  customerSrv = inject(ClientService);
  commonService = inject(CommonService);

  wareHoouseList$: Observable<IWarehouseList[]> = new Observable<IWarehouseList[]>;
  customerList$: Observable<ClientModel[]> = new Observable<ClientModel[]>();

  searchObj = {
    wareHouseId: '',
    fromDate: '',
    todate: '',
  };
  spaceList = signal<IBookingCalendarSpace[]>([]);
  datesList = signal<string[]>([]);
  customerLoadError = signal('');
  calendarError = signal('');
  isBookingModalOpen = signal(false);
  selectedSpace = signal<IBookingCalendarSpace | undefined>(undefined);
  selectedDate = signal('');
  isSavingBooking = signal(false);
  bookingError = signal('');
  bookingDraft: {
    customerId: number | null;
    bookingTillDate: string;
    sqftAreaNeeded: number;
    totalAmount: number;
  } = {
    customerId: null,
    bookingTillDate: '',
    sqftAreaNeeded: 0,
    totalAmount: 0,
  };

  ngOnInit(): void {
    this.wareHoouseList$ = this.wareHouseSrv.getAllWareHouse().pipe(
      map((response: API_Response<IWarehouseList[]>) => response.data),
    );
    this.customerList$ = this.customerSrv.getAllClients().pipe(
      map((response: API_Response<ClientModel[]>) => {
        if (!response.result) {
          this.customerLoadError.set(
            response.message || 'Unable to load customers.',
          );
          return [];
        }
        return response.data ?? [];
      }),
      catchError((error: HttpErrorResponse) => {
        this.customerLoadError.set(
          this.getRequestErrorMessage(error, 'Unable to load customers.'),
        );
        return of([]);
      }),
    );
  }

  loadBookings() {
    this.calendarError.set('');
    this.bookingSrv.getBookingCalander(this.searchObj.wareHouseId, this.searchObj.fromDate, this.searchObj.todate).subscribe({
      next:(res: API_Response<IBookingCalendarData>)=>{
        if (!res.result) {
          this.calendarError.set(res.message || 'Unable to load availability.');
          this.spaceList.set([]);
          this.datesList.set([]);
          return;
        }
        this.spaceList.set(res.data.spaces);
        this.datesList.set(res.data.dates)
      },
      error: (error: HttpErrorResponse) => {
        this.calendarError.set(
          this.getRequestErrorMessage(error, 'Unable to load availability.'),
        );
      }
    })
  }

  openBookingModal(spaceId: number, date: string): void {
    const space = this.spaceList().find((item) => item.spaceId === spaceId);
    const dateKey = this.toDateKey(date);
    if (!space || !dateKey) {
      this.calendarError.set('Unable to open a booking for this space and date.');
      return;
    }

    this.selectedSpace.set(space);
    this.selectedDate.set(dateKey);
    this.bookingDraft = {
      customerId: null,
      bookingTillDate: dateKey,
      sqftAreaNeeded: space.areaSqft,
      totalAmount: 0,
    };
    this.bookingError.set('');
    this.isBookingModalOpen.set(true);
  }

  closeBookingModal(): void {
    if (!this.isSavingBooking()) {
      this.isBookingModalOpen.set(false);
      this.bookingError.set('');
    }
  }

  onSaveBooking(form: NgForm): void {
    if (form.invalid || this.isSavingBooking()) {
      form.control.markAllAsTouched();
      return;
    }

    const warehouseId = Number(this.searchObj.wareHouseId);
    const customerId = Number(this.bookingDraft.customerId);
    const areaNeeded = Number(this.bookingDraft.sqftAreaNeeded);
    const totalAmount = Number(this.bookingDraft.totalAmount);
    const space = this.selectedSpace();
    const loggedInEmployee = this.commonService.getLoggedUserData();
    if (!Number.isInteger(warehouseId) || warehouseId <= 0 || !space) {
      this.bookingError.set('Select a warehouse and space before creating a booking.');
      return;
    }
    if (!loggedInEmployee || !Number.isInteger(loggedInEmployee.id) || loggedInEmployee.id <= 0) {
      this.bookingError.set('Unable to identify the logged-in employee. Please sign in again.');
      return;
    }
    if (!Number.isInteger(customerId) || customerId <= 0) {
      this.bookingError.set('Select a customer before creating a booking.');
      return;
    }
    if (
      !Number.isFinite(areaNeeded) ||
      areaNeeded < 1 ||
      areaNeeded > space.areaSqft
    ) {
      this.bookingError.set(
        `Enter an area from 1 to ${space.areaSqft} sq ft.`,
      );
      return;
    }
    if (!Number.isFinite(totalAmount) || totalAmount < 0) {
      this.bookingError.set('Enter a valid booking amount.');
      return;
    }
    if (this.bookingDraft.bookingTillDate < this.selectedDate()) {
      this.bookingError.set('The booking end date must be on or after the start date.');
      return;
    }

    const payload: ICreateBookingRequest = {
      customerId,
      warehouseId,
      spaceId: space.spaceId,
      bookingFromDate: this.toBookingDateTime(this.selectedDate()),
      bookingTillDate: this.toBookingDateTime(this.bookingDraft.bookingTillDate),
      sqftAreaNeeded: areaNeeded,
      totalAmount,
      bookingDoneBy: loggedInEmployee.id,
    };

    this.bookingError.set('');
    this.isSavingBooking.set(true);
    this.bookingSrv.addBooking(payload).subscribe({
      next: (response: API_Response) => {
        this.isSavingBooking.set(false);
        if (!response.result) {
          this.bookingError.set(response.message || 'Unable to create the booking.');
          return;
        }
        this.isBookingModalOpen.set(false);
        this.loadBookings();
      },
      error: (error: HttpErrorResponse) => {
        this.isSavingBooking.set(false);
        this.bookingError.set(
          this.getRequestErrorMessage(error, 'Unable to create the booking.'),
        );
      },
    });
  }

  getBookingBySpaceDate(
    spaceId: number,
    date: string,
  ): IBookingCalendarBooking | undefined {
    const space = this.spaceList().find((item) => item.spaceId === spaceId);
    if (!space) {
      return undefined;
    } 
    const dateKey = this.toDateKey(date);
    if (!dateKey) {
      return undefined;
    } 
    return space.bookings.find((booking) => {
      const visibleFromDate = this.toDateKey(booking.visibleFromDate);
      const visibleTillDate = this.toDateKey(booking.visibleTillDate);

      return (
        visibleFromDate !== undefined &&
        visibleTillDate !== undefined &&
        dateKey >= visibleFromDate &&
        dateKey <= visibleTillDate
      );
    });
  }

  private toDateKey(value: string): string | undefined {
    const dateKey = value.slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(dateKey) ? dateKey : undefined;
  }

  private toBookingDateTime(date: string): string {
    return `${date}T09:00:00Z`;
  }

  private getRequestErrorMessage(
    error: HttpErrorResponse,
    fallback: string,
  ): string {
    const apiMessage = error.error?.message;
    return typeof apiMessage === 'string' && apiMessage
      ? apiMessage
      : error.message || fallback;
  }
}
