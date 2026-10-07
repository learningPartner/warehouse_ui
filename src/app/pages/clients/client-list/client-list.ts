import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ClientService } from '../../../core/services/client-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientModel } from '../../../core/models/classes/client.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-list',
  imports: [],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList implements OnInit, OnDestroy {
  
  clientList: WritableSignal<ClientModel[]> =  signal<ClientModel[]>([])
  clientSrv = inject(ClientService)

  subScription!: Subscription;

  ngOnInit(): void {
    this.getAllClient();
  }

  getAllClient() {
   this.subScription = this.clientSrv.getAllClients().subscribe({
      next:(res:API_Response)=>{

      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }

  ngOnDestroy(): void {
    this.subScription.unsubscribe()
  }
}
