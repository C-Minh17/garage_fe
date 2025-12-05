import { useEffect, useState } from "react"
import TableBase, { Column } from "../../../components/BaseTable"
import Button from "../../../components/Button"
import { AiOutlineEye } from "react-icons/ai"
import { getPayment } from "../../../services/api/paymentApi"
import BaseModal from "../../../components/baseModal"
import FormImport from "./formImport"

const ImportItem = () => {
  const [dataImportItem, setDataImportItem] = useState<MImportItem.IRecord[]>([])
  const [isModalDetail, setIsModalDetail] = useState<boolean>(false)
  const [isModalForm, setIsModalForm] = useState<boolean>(false)
  const [importItemDetail, setImportItemDetail] = useState<MImportItem.IRecord>()
  const [loading, setLoading] = useState<boolean>(true)


  const columns: Column<MImportItem.IRecord>[] = [
    {
      title: "Mã nhập hàng",
      dataIndex: "id",
      width: 170,
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplier",
      width: 250,
      render: (_, record) => (
        <div>{`${record.supplier.name} (${record.supplier.supplierCode})`}</div>
      )
    },
    {
      title: "Số loại phụ tùng",
      dataIndex: "quantityItem",
      width: 200,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      width: 200,
    },
    {
      title: "Ngày nhập",
      dataIndex: "importDate",
      render: (value, record) => (
        <div>{value}</div>
      )
    },
    {
      title: "Thao tác",
      width: 100,
      render: (value, record) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 5 }}>
          <Button onClick={() => { }} type="viewDetail" style={{ padding: 0, width: 23, height: 23 }}>
            <AiOutlineEye />
          </Button>
        </div>
      )
    },
  ]

  // useEffect(() => {
  //   setLoading(true)
  //   getPayment()
  //     .then(res => setDataPayment(res?.data ? res.data : []))
  //     .finally(() => setLoading(false))
  // }, [])

  return (
    <>
      <BaseModal
        isOpen={isModalForm}
        closeModal={() => setIsModalForm(false)}
      >
        <FormImport />
      </BaseModal>
      <div style={{
        margin: "40px 0"
      }}>
        <h4 style={{ margin: "10px 20px" }}>Lịch sửa thanh toán</h4>
        <div
          style={{
            margin: "10px 5px",
            textAlign: "end"
          }}
          onClick={() => setIsModalForm(true)}
        >
          <Button type="gradientPrimary">+ Thêm hóa đơn nhập hàng</Button>
        </div>
        <TableBase
          columns={columns}
          dataSource={dataImportItem}
        />
      </div>
    </>
  )
}

export default ImportItem