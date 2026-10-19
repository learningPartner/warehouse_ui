import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { IBookingListItem } from '../../../core/models/interfaces/booking.model';
import { BookingService } from '../../../core/services/booking-service';

@Component({
  selector: 'app-booking-list',
  imports: [DatePipe, CurrencyPipe, RouterLink],
  templateUrl: './booking-list.html',
  styleUrl: './booking-list.css',
})
export class BookingList implements OnInit, OnDestroy {
  private readonly bookingService = inject(BookingService);

  readonly bookings = signal<IBookingListItem[]>([]);
  readonly isLoading = signal(true);
  readonly errorMessage = signal('');

  private bookingsSubscription?: Subscription;

  ngOnInit(): void {
    this.loadBookings();
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

  ngOnDestroy(): void {
    this.bookingsSubscription?.unsubscribe();
  }
}
