export class ClientModel {
  clientId: number;
  clientName: string;
  phoneNumber: string;
  emailAddress: string;
  clientAddress: string;
  isActive: boolean;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;

  constructor() {
    this.clientId = 0;
    this.clientName = '';
    this.phoneNumber = '';
    this.clientAddress = '';
    this.emailAddress = '';
    this.createdAt = '';
    this.isActive = false;
    this.createdBy = 0;
    this.updatedBy = 0;
    this.updatedAt = '';
  }
}


