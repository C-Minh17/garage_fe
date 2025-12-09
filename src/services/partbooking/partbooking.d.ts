declare namespace MPartBooking {
  interface IRecord {
    id: string;
    bookingCode: string;
    supplierId: string;
    supplierCode: string;
    partId: string;
    partName: string;
    price: number;
    quantity: number;
    remainingStock: number;
    note: string;
    customerName: string;
    phone: string;
    address: string;
    isActive: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
  }

  interface IRequest {
    partId: string;
    supplierId: string;
    supplierCode: string;
    quantity: number;
    note: string;
    customerName: string;
    phone: string;
    address: string;
    isActive: boolean;
  }

  interface IResponse<T> {
    message: string;
    data: T;
  }
}