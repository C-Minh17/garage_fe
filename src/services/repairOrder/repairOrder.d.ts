declare module MRepairOrder {
  interface IRecord {
    id: string,
    orderCode: string,
    customerId: string,
    customer: ApiResponse<MCustomer.IRecord>,
    carId: string,
    car: MCar.IResponse,
    technicianIds: string[],
    technicians: MTechnician.IRecord[],
    note: string,
    parts: MRepairOrder.IParts[],
    serviceIds: string[],
    service: MService.IRecord[],
    estimatedTotal: number,
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "PAID",
    dateReceived: string,
    dateReturned: string
  }

  interface IParts {
    id: string,
    name: string,
    unitPrice: number,
    quantity: number,
    total: number
  }
}