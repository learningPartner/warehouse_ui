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
