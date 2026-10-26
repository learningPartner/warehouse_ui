export class WarehouseSpaceModel {
  id?: number
  name: string
  areaSqft: number
  description: string
  isActive: boolean

  constructor() {
    this.id = 0;
    this.areaSqft = 0;
    this.description = '';
    this.isActive = false;
    this.name= '';
  }
}
