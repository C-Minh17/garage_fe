import { useEffect, useState } from "react"
import TableBase, { Column } from "../../../components/BaseTable"
import Button from "../../../components/Button"
import { AiOutlineEye } from "react-icons/ai"
import { getPayment } from "../../../services/api/paymentApi"
import BaseModal from "../../../components/baseModal"
import FormImport from "./formImport"
import { getImportItem } from "../../../services/api/importItemApi"

const ImportItem = () => {
  const [dataImportItem, setDataImportItem] = useState<MImportItem.IRecord[]>([])
  const [isModalDetail, setIsModalDetail] = useState<boolean>(false)
  const [isModalForm, setIsModalForm] = useState<boolean>(false)
  const [importItemDetail, setImportItemDetail] = useState<MImportItem.IRecord>()
  const [loading, setLoading] = useState<boolean>(true)
  const [isReload, setIsReload] = useState<boolean>(true)


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
        <div>{`${record.supplier.supplierName} (${record.supplier.supplierCode})`}</div>
      )
    },
    {
      title: "Số loại phụ tùng",
      dataIndex: "quantity",
      width: 200,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      width: 200,
    },
    {
      title: "Ngày nhập",
      dataIndex: "date",
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

  useEffect(() => {
    setLoading(true)
    getImportItem()
      .then(res => setDataImportItem(res?.data ? res.data : []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <BaseModal
        isOpen={isModalForm}
        closeModal={() => setIsModalForm(false)}
      >
        <FormImport setIsModal={setIsModalForm} isReload={isReload} setIsReload={setIsReload} />
      </BaseModal>
      <div style={{
        margin: "40px 0"
      }}>
        <h4 style={{ margin: "10px 20px" }}>Lịch sửa nhập hàng</h4>
        <div
          style={{
            margin: "10px 5px",
            textAlign: "end"
          }}
        >
          <Button onClick={() => setIsModalForm(true)} type="gradientPrimary">+ Thêm hóa đơn nhập hàng</Button>
        </div>
        <TableBase
          columns={columns}
          dataSource={dataImportItem}
          loading={loading}
        />
      </div>
    </>
  )
}

export default ImportItem