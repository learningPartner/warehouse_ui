import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { API_Response } from '../../../core/models/interfaces/common.model';
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

  currentEditId: number = 0;

  clientForm!: FormGroup;

  formBuilder = inject(FormBuilder);
  clientSrv = inject(ClientService);
  router= inject(Router);
  activatedRoute = inject(ActivatedRoute);

  constructor() {
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
      customerId: [0],
      name: ['', Validators.required],
      address: [''],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      gstNo: [''],
    })
  }

  getClientById() {
    this.clientSrv.getClientById(this.currentEditId).subscribe({
      next:(res:API_Response)=>{
        this.clientForm.patchValue(res.data);
      }
    })
  }

  onSaveClient() {
    debugger;
    const  formValue = this.clientForm.value;
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
    this.clientSrv.updateClient(this.currentEditId,formValue).subscribe({
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
