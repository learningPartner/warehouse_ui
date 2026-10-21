import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { API_Response, IUser, LoginEmployee } from '../../../core/models/interfaces/common.model';
import { IBookingListItem } from '../../../core/models/interfaces/booking.model';
import { BookingService } from '../../../core/services/booking-service';
import { FormsModule } from '@angular/forms';
import { GLOBAL_CONSTANT } from '../../../core/constant/global.contant';

@Component({
  selector: 'app-booking-list',
  imports: [DatePipe, CurrencyPipe, RouterLink, FormsModule],
  templateUrl: './booking-list.html',
  styleUrl: './booking-list.css',
})
export class BookingList implements OnInit, OnDestroy {
  private readonly bookingService = inject(BookingService);

  readonly bookings = signal<IBookingListItem[]>([]);
  readonly isLoading = signal(true);
  readonly errorMessage = signal('');

  private bookingsSubscription?: Subscription;

  @ViewChild('pyamentModal') peymentModalEle!: ElementRef;

  paymentObj: any = {
    bookingId: 0,
    paymentDate: '',
    amount: 0,
    mode: '',
    narration: '',
    status: '',
    receivedId: 0,
  };
  currentBooking: any;
  paymentList = signal<any[]>([]);
  loggedUserData!: LoginEmployee;

  ngOnInit(): void {
    this.loadBookings();
    const localUser = localStorage.getItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY);
    if (localUser != null) {
      this.loggedUserData = JSON.parse(localUser); 
    }
  }

  loadBookings(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.bookingsSubscription = this.bookingService.getAllBookings().subscribe({
      next: (response: API_Response<IBookingListItem[]>) => {
        if (!response.result) {
          this.errorMessage.set(response.message || 'Unable to load bookings.');
          this.bookings.set([]);
          this.isLoading.set(false);
          return;
        }

        this.bookings.set(response.data ?? []);
        this.isLoading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage.set(error.message || 'Unable to load bookings.');
        this.isLoading.set(false);
      },
    });
  }

  openPaymentModal(obj: any) {
    debugger;
    if (this.peymentModalEle) {
      debugger;
      this.currentBooking = obj;
      this.paymentObj = {
        bookingId: 0,
        paymentDate: '',
        amount: 0,
        mode: '',
        narration: '',
        status: '',
        receivedId: this.loggedUserData.id
      };
      this.paymentObj.bookingId = obj.id;
      this.loadPayemntById();
      this.peymentModalEle.nativeElement.style.display = 'block';
    }
  }

  loadPayemntById() {
    this.bookingService.getAllPaymentByBookingId(this.currentBooking.id).subscribe({
      next: (res: API_Response) => {
        this.paymentList.set(res.data);
      },
    });
  }

  closePaymentModal() {
    if (this.peymentModalEle) {
      this.peymentModalEle.nativeElement.style.display = 'none';
    }
  }

  onSavePayment() {
    this.bookingService.addPayment(this.paymentObj).subscribe({
      next: (res: API_Response) => {
        if (res.result) {
          alert('Payment');
          this.loadPayemntById();
        } else {
          alert(res.message);
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.bookingsSubscription?.unsubscribe();
  }
}
