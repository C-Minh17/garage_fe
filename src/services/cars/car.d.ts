declare namespace  MCar {
  export interface IRequest {
    plate: string;
    model: string;
    manufacturer: string;
    description?: string;
    customerId: string;
    active?: boolean;
  }

  export interface IResponse {
    id: string;
    plate: string;
    model: string;
    manufacturer: string;
    description: string;
    customerId: string;
    customerCode: string;
    active: boolean;
    createdAt?: string;
  }
}