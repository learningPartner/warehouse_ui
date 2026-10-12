export interface IWarehouse { 
  title: string
  address1: string
  address2: string
  city: string
  totalArea: number
  isColdStorageAvailable: boolean
}


export interface IWarehouseList extends IWarehouse{
  id?: number
}


