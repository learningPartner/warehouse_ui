import { Component, inject } from '@angular/core';
import { UserLoginModel } from '../../../core/models/classes/user.model';
import {FormsModule} from '@angular/forms'
import { User } from '../../../core/services/user';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { GLOBAL_CONSTANT } from '../../../core/constant/global.contant';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginObj: UserLoginModel = new UserLoginModel();

  userService =  inject(User);
  router =  inject(Router);


  onLogin() {
    this.userService.loginUser(this.loginObj).subscribe({
      next:(res: API_Response)=>{
        if(res.result) {
          localStorage.setItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY, JSON.stringify(res.data))
          this.router.navigate(['admin/clinet-list'])
        } else {
          alert(res.message)
        }
      },
      error:(err: HttpErrorResponse)=>{

      }
    })
  }

}
