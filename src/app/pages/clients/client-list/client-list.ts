import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ClientService } from '../../../core/services/client-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientModel } from '../../../core/models/classes/client.model';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
 import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
@Component({
  selector: 'app-client-list',
  imports: [NgClass, RouterLink, ConfirmDialogModule,TableModule,IconFieldModule,InputIconModule],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
  providers:[]
})
export class ClientList implements OnInit, OnDestroy {
  clientList: WritableSignal<ClientModel[]> = signal<ClientModel[]>([]);
  clientSrv = inject(ClientService);
  private confirmationService = inject(ConfirmationService);

   private messageService = inject(MessageService);

  subScription!: Subscription;
  isCardView: boolean = false;

  ngOnInit(): void {
    this.getAllClient();
  }

  getAllClient() {
    this.subScription = this.clientSrv.getAllClients().subscribe({
      next: (res: API_Response) => {
        this.clientList.set(res.data);
      },
      error: (err: HttpErrorResponse) => {},
    });
  }

  onDeleteClient(id: number) {
    debugger;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
      },
      accept: () => {
        debugger
        this.clientSrv.deleteClient(id).subscribe({
          next: (res: API_Response) => {
            if (res.result) {
               this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Client Has been Deleted' });
              //alert('Client Deleyted Success');
              this.getAllClient();
            }
          },
        });
      },
      reject:()=>{
        debugger;
      }
    });

    // const isDelete = confirm('Are you Sure want to Delete');
    // if (isDelete) {
    //   this.clientSrv.deleteClient(id).subscribe({
    //     next: (res: API_Response) => {
    //       if (res.result) {
    //         alert('Client Deleyted Success');
    //         this.getAllClient();
    //       }
    //     },
    //   });
    // }
  }

  ngOnDestroy(): void {
    this.subScription.unsubscribe();
  }
}
