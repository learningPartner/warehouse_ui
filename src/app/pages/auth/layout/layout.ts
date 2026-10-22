import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginEmployee } from '../../../core/models/interfaces/common.model';
import { GLOBAL_CONSTANT } from '../../../core/constant/global.contant';
import { BookingForm } from '../../bookings/booking-form/booking-form';
import { CommonService } from '../../../core/services/common-service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  isLoading = false;
  loggedUser: LoginEmployee | undefined = undefined;
  router= inject(Router);
  commonService  =  inject(CommonService);
  isShowLoader = signal<boolean>(false)
  
  constructor() {
    this.loggedUser = this.commonService.getLoggedUserData();
    this.commonService.showLoader$.subscribe({
      next:(flag: boolean) =>{
        debugger;
        this.isShowLoader.set(flag)
      }
    })
  }

  onLogOff() {
    localStorage.removeItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY);
    localStorage.removeItem(GLOBAL_CONSTANT.LOCAL_TOKEN_KEY);
    this.router.navigateByUrl('/login')
  }

}
