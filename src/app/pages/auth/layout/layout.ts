import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IUser } from '../../../core/models/interfaces/common.model';
import { GLOBAL_CONSTANT } from '../../../core/constant/global.contant';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {


  loggedUser!:IUser;
  router= inject(Router);

  constructor() {
    const localData = localStorage.getItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY);
    if(localData != null) {
      this.loggedUser =  JSON.parse(localData)
    } 
  }

  onLogOff() {
    localStorage.removeItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY);
    this.router.navigateByUrl('/login')
  }

}
