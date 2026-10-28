import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WarehouseService } from '../../core/services/warehouse-service';
import { IWarehouse, IWarehouseList } from '../../core/models/interfaces/warehouse.model';
import { API_Response } from '../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonImports } from '../../core/constant/common.imports';
import { WarehouseSpaceModel } from '../../core/models/classes/warehoouse.model';
import { CommonService } from '../../core/services/common-service';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ClientSideRowModelModule, GridApi, GridReadyEvent, PaginationModule, type CellClickedEvent, type ColDef, type RowSelectionOptions } from 'ag-grid-community'; // Column Definition Type Interface

 

@Component({
  selector: 'app-warehouse-master',
  imports: [CommonImports.FORM_IMPORTS,AgGridAngular],
  templateUrl: './warehouse-master.html',
  styleUrl: './warehouse-master.css',
})
export class WarehouseMaster implements OnInit {
  warehousForm!: FormGroup;

  private gridApi!: GridApi;

  formBuilder = inject(FormBuilder);
  warehouseSr = inject(WarehouseService);
  commonService =  inject(CommonService);

  gridList = signal<IWarehouseList[]>([]);
  editId: number | undefined = 0;
  totlArea: number = 0;
  coldStoargeLength: number = 0;
  openWareHouseDetail!: IWarehouseList;
  spaceList = signal<any[]>([]);
  newSpaceObj: WarehouseSpaceModel = new WarehouseSpaceModel();

  @ViewChild('spaceModal') spaceModal!: ElementRef;

  rowSelection: RowSelectionOptions = {
    mode: "singleRow",
    checkboxes: true,
    enableClickSelection: true,
  };

   colDefs: ColDef[] = [
        { field: "title", headerName:"Title", editable: true },
        { field: "address1" , headerName:"Address" },
        { field: "address2" , headerName:"Address 2"  },
        { field: "city" , headerName:"City Name" },
        { field: "totalArea" , headerName:"Total Area",
          filter: "agNumberColumnFilter",
          cellRenderer:(data:any) => `${data.data.totalArea} sqFt` 
         },
        { field:'isColdStorageAvailable',
          headerName:'Cold Storage',
        //   cellRenderer: (params:any) => {
        //     debugger;
        //     // put the value in bold
        //     return (params.isColdStorageAvailable  == true ? "Yes" : "No")
        // }
          cellRenderer: (params:any) => params.data.isColdStorageAvailable  == true ? "Yes" : "No"
         // cellRenderer:(item: any)=> item.isColdStorageAvailable ? "Yes":"No"  
        },
        {
          headerName:"Actions",
          cellRenderer: () => '<button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button>',
           onCellClicked: (event: CellClickedEvent) => {
        // only react if the button itself was clicked
        if ((event.event?.target as HTMLElement).closest('.edit-btn')) {
          this.onEdit(event.data);
        }
        if ((event.event?.target as HTMLElement).closest('.delete-btn')) {
          this.onDeleteWareHouse(event.data);
        }
      },
          
        }
    ];

    defaultColDef: ColDef = {

flex: 1,

    minWidth: 150,

    filter: "agTextColumnFilter",

    suppressHeaderMenuButton: true,

    suppressHeaderContextMenu: true,


  };


  constructor() {
    this.initializeForm();
  }


  onGridReady(params: GridReadyEvent) {

    this.gridApi = params.api;

  }

  onBtnExport() {

    this.gridApi.exportDataAsCsv();

  }


  onEdit2(data:any) {
    debugger;
    alert("sdfsd")
  }

  ngOnInit() {
    debugger;
    this.getAll();
  }

  getAll() {
    this.warehouseSr.getAllWareHouse().subscribe({
      next: (res: API_Response) => {
        this.gridList.set(res.data);

        // this.gridList().forEach(element => {
        //     this.totlArea =  this.totlArea + element.totalArea;
        // });
        this.coldStoargeLength = this.gridList().filter(
          (m) => m.isColdStorageAvailable == true,
        ).length;

        this.totlArea = this.gridList().reduce((acc, cur) => {
          return acc + cur.totalArea;
        }, 0);
      },
    });
  }
  initializeForm() {
    this.warehousForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      address1: [''],
      address2: [''],
      city: [''],
      totalArea: [''],
      isColdStorageAvailable: [false],
    });
  }

  onSave() {
    this.commonService.showLoader$.next(true)
    const formValue = this.warehousForm.value as IWarehouse;
    this.warehouseSr.createNew(formValue).subscribe({
      next: (res: API_Response) => {
        this.commonService.showLoader$.next(false)
        if (res.result) {
          alert('WareHouser Created ');
         // this.getAll();
          this.gridList.update(oldList =>  [res.data,...oldList,])
        } else {
          alert(res.message)
        }
      },
      error: (err: HttpErrorResponse) => {
         this.commonService.showLoader$.next(false)
      },
    });
  }

  onEdit(data: IWarehouseList) {
    debugger;
    this.editId = data.id;
    delete data.id;
    this.warehousForm.setValue(data);
  }

  openModal(data: IWarehouseList) {
    if (this.spaceModal != undefined) {
      this.newSpaceObj.id = data.id;
      this.spaceModal.nativeElement.style.display = 'block';
      this.openWareHouseDetail = data;
      if (this.openWareHouseDetail.id != undefined) {
        this.warehouseSr.getSpaceByWarehouseId(this.openWareHouseDetail.id).subscribe({
          next: (res: API_Response) => {
            this.spaceList.set(res.data);
          },
        });
      }
    }
  }

  closeModal() {
    if (this.spaceModal != undefined) {
      this.spaceModal.nativeElement.style.display = 'none';
    }
  }

  onSaveSpace() {
    debugger;
    this.warehouseSr.saveSpace(this.newSpaceObj).subscribe({
      next:(res:API_Response)=>{
        if(res.result) {
          alert("Space Addedd") 
          this.spaceList.update(oldData => [...oldData, res.data])
        }
      }
    })
  }

  onDeleteWareHouse(data: any) {
    debugger;
  }
}
