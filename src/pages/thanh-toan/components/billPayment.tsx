import { useEffect, useState } from "react"
import TableBase, { Column } from "../../../components/BaseTable"
import Tag from "../../../components/Tag"
import Button from "../../../components/Button"
import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineMinus } from "react-icons/ai"
import { deleteRepairOrder, getRepairOrder, putRepairOrderPay } from "../../../services/api/repairOrderApi"
import BaseModal from "../../../components/baseModal"
import ConfirmDelete from "../../../components/confirmDelete"
import { notify } from "../../../components/Notification"
import FormCompleteOrder from "../../tiep-nhan-xe/components/formCompleted"
import { postPayment } from "../../../services/api/paymentApi"
import maQR from "../../../assets/z7296071919244_943f2176917a6293f86a0f9d2a9e0b2d.jpg"
import { formatVNTime } from "../../../utils/formatTime"

const BillPaymentd = () => {
  const [dataRepairOrder, setDataRepairOrder] = useState<MRepairOrder.IRecord[]>([])
  const [dataRepairOrderId, setDataRepairOrderId] = useState<MRepairOrder.IRecord>()
  const [isLoading, setIsloading] = useState<boolean>(true)
  const [idRepairOrder, setIdRepairOrder] = useState<string>('')
  const [isModalDel, setIsModalDel] = useState<boolean>(false)
  const [isModalComplete, setIsModalComplete] = useState<boolean>(false)
  const [isReload, setIsReload] = useState<boolean>(false)
  const [methodPayment, setMethodPayment] = useState<"BANKING" | "COD">("COD")
  const [isModalConfirmPayment, setIsModalConfirmPayment] = useState<boolean>(false)

  const columns: Column<MRepairOrder.IRecord>[] = [
    {
      title: "Mã hóa đơn",
      dataIndex: "orderCode",
      width: 100
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      width: 250,
      render: (value, record) => (
        <div>{`${record.customer.data?.name} (${record.customer.data?.customerCode})`}</div>
      )
    },
    {
      title: "Xe",
      dataIndex: "car",
      width: 250,
      render: (_, record) => (
        <div>{record.car ? `${record.car?.model} (${record.car?.plate})` : "Xe không tồn tại"}</div>
      )
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 250,
      render: (value) => (
        value === "COMPLETED" ?
          <Tag color={"green"}>Hoàn thành</Tag>
          : <Tag color={"orange"}>Đang sửa</Tag>
      )
    },
    {
      title: "Ngày tạo",
      dataIndex: "dateReceived",
      width: 250,
      render: (value, record) => (
        <div>{formatVNTime(value, true)}</div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>Thao tác</div>,
      width: 200,
      render: (value, record, index) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 5 }}>
          {record.status === "COMPLETED" ?
            <>
              <Button type="gradientPrimary" onClick={() => { setIsModalConfirmPayment(true); setDataRepairOrderId(record) }}>Thanh toán</Button>
            </> :
            <>
              <Button onClick={() => { setIdRepairOrder(record?.id); setIsModalDel(true) }} type="error" style={{ padding: 0, width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AiOutlineMinus />
              </Button>
              <Button onClick={() => { setIsModalComplete(true); setDataRepairOrderId(record) }} type="success" style={{ padding: 0, width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }} >
                <AiOutlineCheck />
              </Button>
            </>
          }
        </div>
      )
    },
  ]

  const confirmPayment = async () => {
    const res = await putRepairOrderPay(dataRepairOrderId?.id || "")
    if (!res.status) {
      const dataPayment = {
        repairOrderId: dataRepairOrderId?.id,
        method: methodPayment,
      }
      const res = await postPayment(dataPayment)
      if (!res.status) {
        notify({ title: "Delete", type: "success", description: "Xác nhận thanh toán thành công" })
        setIsModalConfirmPayment(false)
        setIsReload(!isReload)
      } else {
        notify({ title: "Delete", type: "error", description: " không thành công" })
        setIsModalConfirmPayment(false)
        setIsReload(!isReload)
      }
    } else {
      notify({ title: "Delete", type: "error", description: " không thành công" })
      setIsModalConfirmPayment(false)
      setIsReload(!isReload)
    }
  }

  const delModal = async (id: string) => {
    const res = await deleteRepairOrder(id)
    if (!res.status) {
      notify({ title: "Delete", type: "success", description: "Thông tin nhà cung cấp đã được xóa thành công" })
      setIsModalDel(false)
      setIsReload(!isReload)
    } else {
      notify({ title: "Delete", type: "error", description: "Xóa thông tin không thành công" })
      setIsModalDel(false)
      setIsReload(!isReload)
    }
  }

  useEffect(() => {
    setIsloading(true)
    getRepairOrder()
      .then(res => setDataRepairOrder(res.data ? res.data.filter(item => item.status !== "PAID") : []))
      .finally(() => setIsloading(false))
  }, [isReload])

  console.log("mmm", dataRepairOrder)

  return (
    <>
      <BaseModal
        isOpen={isModalDel}
        closeModal={() => setIsModalDel(false)}
      >
        <ConfirmDelete
          onCancel={() => setIsModalDel(false)}
          onConfirm={() => delModal(idRepairOrder)}
        />
      </BaseModal>

      <BaseModal
        isOpen={isModalConfirmPayment}
        closeModal={() => setIsModalConfirmPayment(false)}
      >
        <div style={{ padding: "20px 10px" }}>
          <h3 style={{ margin: "15px 0", color: "#333", textAlign: "center" }}>Xác nhận thanh toán</h3>
          <div style={{ textAlign: "center", marginBottom: "20px", display: methodPayment === "BANKING" ? "block" : "none" }}>
            <img
              src={maQR}
              style={{ width: "200px", height: "auto", display: "block", margin: "0 auto" }}
            />
          </div>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginBottom: "25px"
          }}>
            <div style={{
              flex: 1,
              border: methodPayment === "COD" ? "1px solid #1890ff" : "1px solid #d9d9d9",
              borderRadius: "8px",
              padding: "15px 10px",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: methodPayment === "COD" ? "#e6f7ff" : "#fafafa",
              transition: "all 0.3s"
            }}
              onClick={() => setMethodPayment("COD")}
            >
              <div style={{ fontWeight: "bold", color: methodPayment === "COD" ? "#1890ff" : "#555" }}>💵 Tiền mặt</div>
            </div>

            <div style={{
              flex: 1,
              border: methodPayment === "BANKING" ? "1px solid #1890ff" : "1px solid #d9d9d9",
              borderRadius: "8px",
              padding: "15px 10px",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: methodPayment === "BANKING" ? "#e6f7ff" : "#fafafa",
              transition: "all 0.3s",
            }}
              onClick={() => setMethodPayment("BANKING")}
            >
              <div style={{ fontWeight: "bold", color: methodPayment === "BANKING" ? "#1890ff" : "#555" }}>🏦 Banking</div>
            </div>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "10px"
          }}>
            <Button
              style={{
                width: "200px",
                height: "40px",
                borderRadius: "6px"
              }}
              onClick={() => setIsModalConfirmPayment(false)}
            >
              Hủy
            </Button>
            <Button
              style={{
                width: "200px",
                height: "40px",
                borderRadius: "6px",
                fontWeight: "bold"
              }}
              type="primary"
              onClick={confirmPayment}
            >
              Xác nhận đã thanh toán
            </Button>
          </div>

        </div>
      </BaseModal>

      <BaseModal
        isOpen={isModalComplete}
        closeModal={() => setIsModalComplete(false)}
      >
        <FormCompleteOrder orderData={dataRepairOrderId} isReload={isReload} setIsReload={setIsReload} setIsModal={setIsModalComplete} />
      </BaseModal>

      <div style={{
        margin: "40px 0"
      }}>
        <TableBase
          columns={columns}
          dataSource={dataRepairOrder}
          loading={isLoading}
        />
      </div>
    </>
  )
}

export default BillPaymentd