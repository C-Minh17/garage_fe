declare module MPayment {
  interface IRecord {
    id: string,
    repairOrderId: string,
    repairOrder: MRepairOrder.IRecord,
    amount: number,
    method: string,
    status: string,
    createdAt: string,
    updatedAt: string
  }
}