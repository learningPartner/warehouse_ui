import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ClientService } from '../../../core/services/client-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientModel } from '../../../core/models/classes/client.model';
import { Subscription } from 'rxjs';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-list',
  imports: [NgClass,DatePipe, RouterLink],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList implements OnInit, OnDestroy {
  
  clientList: WritableSignal<ClientModel[]> =  signal<ClientModel[]>([])
  clientSrv = inject(ClientService)

  subScription!: Subscription;
  isCardView: boolean = false;

  ngOnInit(): void {
    this.getAllClient();
  }

  getAllClient() {
   this.subScription = this.clientSrv.getAllClients().subscribe({
      next:(res:API_Response)=>{
        this.clientList.set(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }

  onDeleteClient(id: number) {
    const isDelete = confirm("Are you Sure want to Delete");
    if(isDelete) {
      this.clientSrv.deleteClient(id).subscribe({
        next:(res:API_Response)=>{
          if(res.result) {
            alert("Client Deleyted Success")
            this.getAllClient();
          }
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.subScription.unsubscribe()
  }
}
