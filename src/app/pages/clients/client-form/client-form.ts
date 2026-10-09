import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupName, ReactiveFormsModule, Validators } from '@angular/forms';
import { GLOBAL_CONSTANT } from '../../../core/constant/global.contant';
import { UserLoginModel } from '../../../core/models/classes/user.model';
import { API_Response, IUser } from '../../../core/models/interfaces/common.model';
import { ClientService } from '../../../core/services/client-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  imports: [ReactiveFormsModule],
  templateUrl: './client-form.html',
  styleUrl: './client-form.css',
})
export class ClientForm {

  logeedUser!: IUser;
  currentEditId: number = 0;

  clientForm!: FormGroup;

  formBuilder = inject(FormBuilder);
  clientSrv = inject(ClientService);
  router= inject(Router);
  activatedRoute = inject(ActivatedRoute);




  constructor() {
    const localUserData =  localStorage.getItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY);
    if(localUserData) {
      this.logeedUser =  JSON.parse(localUserData) 
    }
    this.activatedRoute.params.subscribe({
      next:(res:any)=>{
        debugger;
        if(res.id != 0) {
          this.currentEditId =  res.id;
          this.getClientById()
        }
      }
    })
    this.intializeForm(); 
  }

  intializeForm() {
    this.clientForm = this.formBuilder.group({
      clientId: [0],
      clientName: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      emailAddress: ['',Validators.required],
      isActive: ['',Validators.required],
      createdAt: [new Date(),Validators.required],
      createdBy: [this.logeedUser.userId,Validators.required],
      updatedAt: [new Date(),Validators.required],
      updatedBy: [this.logeedUser.userId,Validators.required],
      clientAddress: ['']
    })
  }

  getClientById() {
    this.clientSrv.getClientById(this.currentEditId).subscribe({
      next:(res:API_Response)=>{
        this.clientForm.setValue(res.data);
      }
    })
  }

  onSaveClient() {
    debugger;
    const  formValue = this.clientForm.value;
    formValue.isActive =  formValue.isActive == "true" ? true: false; 
    this.clientSrv.saveClient(formValue).subscribe({
      next:(res:API_Response)=>{
        if(res.result) {
          alert("Client Created Success");
          this.router.navigateByUrl('/admin/clinet-list')
        } else {
          alert(res.message)
        }
      },
      error:(err:HttpErrorResponse)=>{
        alert(err.message)
      }
    })
  }

  onUpdateClient() {
    const formValue = this.clientForm.value;
    formValue.updatedBy = this.logeedUser.userId;
    formValue.updatedAt = new Date();
    formValue.isActive =  formValue.isActive == "true" ? true: false; 
    this.clientSrv.updateClient(formValue).subscribe({
      next:(res:API_Response)=>{
        if(res.result) {
          alert("Client Update Success");
          this.router.navigateByUrl('/admin/clinet-list')
        } else {
          alert(res.message)
        }
      },
      error:(err:HttpErrorResponse)=>{
        alert(err.message)
      }
    })
  }
 

}
