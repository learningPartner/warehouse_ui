export interface IBookingListItem {
  id: number;
  customerId: number;
  customerName: string;
  customerMobile: string;
  customerEmail: string;
  warehouseId: number;
  warehouseName: string;
  warehouseCity: string;
  spaceId: number;
  spaceName: string;
  bookingFromDate: string;
  bookingTillDate: string;
  bookingDate: string;
  sqftAreaNeeded: number;
  totalAmount: number;
  bookingDoneBy: number;
  bookingDoneByName: string;
}

export interface ICreateBookingRequest {
  customerId: number;
  warehouseId: number;
  spaceId: number;
  bookingFromDate: string;
  bookingTillDate: string;
  sqftAreaNeeded: number;
  totalAmount: number;
  bookingDoneBy: number;
}

export interface IBookingCalendarBooking {
  bookingId: number;
  customerId: number;
  customerName: string;
  spaceId: number;
  bookingFromDate: string;
  bookingTillDate: string;
  visibleFromDate: string;
  visibleTillDate: string;
  sqftAreaNeeded: number;
}

export interface IBookingCalendarSpace {
  spaceId: number;
  name: string;
  areaSqft: number;
  bookings: IBookingCalendarBooking[];
  isActive: boolean;
}

export interface IBookingCalendarData {
  spaces: IBookingCalendarSpace[];
  dates: string[];
}
