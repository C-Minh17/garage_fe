import { useEffect, useState } from "react"
import TableBase, { Column } from "../../../components/BaseTable"
import Button from "../../../components/Button"
import { AiOutlineEye } from "react-icons/ai"
import { getPayment } from "../../../services/api/paymentApi"
import BaseModal from "../../../components/baseModal"
import PaymentDetailInline from "./historyDetail"
import { formatVNTime } from "../../../utils/formatTime"

const HistoryPayment = () => {
  const [dataPayment, setDataPayment] = useState<MPayment.IRecord[]>([])
  const [isModalDetail, setIsModalDetail] = useState<boolean>(false)
  const [paymentDetail, setPaymentDetail] = useState<MPayment.IRecord>()
  const [loading, setLoading] = useState<boolean>(true)


  const columns: Column<MPayment.IRecord>[] = [
    {
      title: "Mã Thanh toán",
      dataIndex: "repairOrder",
      width: 170,
      render: (_, record) => (
        <div>{record?.repairOrder?.orderCode}</div>
      )
    },
    {
      title: "Khách hành",
      dataIndex: "repairOrder",
      width: 250,
      render: (_, record) => (
        <div>{`${record?.repairOrder.customer.data?.name} (${record.repairOrder.customer.data?.customerCode})`}</div>
      )
    },
    {
      title: "Xe",
      dataIndex: "repairOrder",
      width: 200,
      render: (_, record) => (
        <div>{`${record?.repairOrder.car.model} (${record?.repairOrder.car.plate})`}</div>
      )
    },
    {
      title: "Tổng tiền",
      dataIndex: "amount",
      width: 200,
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "createdAt",
      render: (value, record) => (
        <div>{formatVNTime(value, true)}</div>
      )
    },
    {
      title: "Thao tác",
      width: 100,
      render: (value, record) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 5 }}>
          <Button onClick={() => { setPaymentDetail(record); setIsModalDetail(true) }} type="viewDetail" style={{ padding: 0, width: 23, height: 23 }}>
            <AiOutlineEye />
          </Button>
        </div>
      )
    },
  ]

  useEffect(() => {
    setLoading(true)
    getPayment()
      .then(res => setDataPayment(res?.data ? res.data : []))
      .finally(() => setLoading(false))
  }, [])


  return (
    <>
      <BaseModal
        isOpen={isModalDetail}
        closeModal={() => setIsModalDetail(false)}
      >
        {paymentDetail ? <PaymentDetailInline data={paymentDetail} /> : <></>}
      </BaseModal>
      <div style={{
        margin: "40px 0"
      }}>
        <h4 style={{ margin: "10px 20px" }}>Lịch sửa thanh toán</h4>
        <TableBase
          columns={columns}
          dataSource={dataPayment}
          loading={loading}
        />
      </div>
    </>
  )
}

export default HistoryPayment