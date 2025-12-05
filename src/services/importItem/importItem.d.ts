declare module MImportItem {
  interface IRecord {
    id: string,
    supplierId: string,
    supplier: MSupplier.IRecord,
    parts: MImportItem.IParts[],
    importDate: string,
    quantityItem: number,
    total: number,
    note: string,
    createdAt: string,
    updatedAt: string
  }

  interface IParts {
    id: string,
    name: string,
    unitPrice: number,
    quantity: number,
    total: number,
  }
}