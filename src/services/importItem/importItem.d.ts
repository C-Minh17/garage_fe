declare module MImportItem {
  interface IRecord {
    id: string,
    invoiceId: string,
    importInvoiceItemCode: string,
    supplier: {
      supplierId: string,
      supplierName: string,
      supplierCode: string,
      supplierAddress: string,
      supplierEmail: string,
      supplierPhone: string,
      supplierDescription: string,
      parts: MImportItem.IParts[],
    },
    part: MImportItem.IParts,
    date: string,
    quantity: number,
    unitPrice: number,
    total: number,
    invoiceTotal: number,
    note: string,
    createdAt: string,
    updatedAt: string,
  }

  interface IImportReq {
    invoiceId: string,
    supplierId: string,
    date: string,
    parts: MImportItem.IParts[]
  }

  interface IParts {
    partId: string,
    name: string,
    quantity: number,
    unitPrice: number,
  }

  interface IPartsResponse {
    partId: string,
    partName: string,
    partCode: string,
    price: number,
    stock: number,
    description: string,
    unitPrice: number
  }
}