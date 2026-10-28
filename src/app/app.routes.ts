import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Layout } from './pages/auth/layout/layout';
import { ClientList } from './pages/clients/client-list/client-list';
import { ClientForm } from './pages/clients/client-form/client-form';
import { authGuard } from './core/guards/auth-guard';
import { WarehouseMaster } from './pages/warehouse-master/warehouse-master';
import { EmployeeList } from './pages/employee/employee-list/employee-list';
import { NewEmployee } from './pages/employee/new-employee/new-employee';
import { BookingForm } from './pages/bookings/booking-form/booking-form';
import { BookingList } from './pages/bookings/booking-list/booking-list';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'admin',
    component: Layout, 
   // canActivate: [authGuard],
    children: [
      {
       path: '',
       component: Dashboard,
       pathMatch: 'full',
     },
     {
        path: 'clinet-list',
        component: ClientList, 
      },
      {
        path: 'clinet-form/:id',
        component: ClientForm,
      },
      {
        path: 'warehouse-list',
        component: WarehouseMaster, 
      },
      {
        path: 'employees',
        component: EmployeeList, 
      },
      {
        path: 'employee-form/:empid',
        component: NewEmployee, 
      },
      {
        path: 'booking-form/:bookingid',
        component: BookingForm, 
      },
      {
        path: 'booking-list',
        component: BookingList, 
      },
      {
        path: 'dashboard',
        component: Dashboard, 
      }
    ],
  },
];
