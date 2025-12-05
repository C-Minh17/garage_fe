import { Col, Row, Table } from "react-bootstrap";
import Form, { Input } from "../../../components/FormBase";
import SelectTechnician from "../../ky-thuat-vien/components/selectTechnician";
import SelectServices from "../../dich-vu/components/selectServices";
import Button from "../../../components/Button";
import { AiOutlineArrowLeft, AiOutlineDelete, AiOutlineDownCircle, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import TableBase, { Column } from "../../../components/BaseTable";
import BaseModal from "../../../components/baseModal";
import SelectPart from "../../phu-tung/components/selectPart";
import { putRepairOrder } from "../../../services/api/repairOrderApi";
import { notify } from "../../../components/Notification";

interface IFormCompleteOrder {
  orderData?: MRepairOrder.IRecord,
  setIsReload?: (a: boolean) => void,
  setIsModal?: (a: boolean) => void,
  isReload?: boolean,
}

interface IPartItem {
  id: string,
  name: string,
  unitPrice: number,
  quantity: number,
  total: number
}

const FormCompleteOrder = (props: IFormCompleteOrder) => {
  const { orderData, setIsModal, setIsReload, isReload } = props
  const [parts, setParts] = useState<IPartItem[]>([])
  const [isModalPart, setIsModalPart] = useState<boolean>(false)
  const [orderId, setOrderId] = useState<MRepairOrder.IRecord>()

  const onSubmit = async (e: any) => {
    const dataPay = {
      ...e,
      parts: parts,
      status: "COMPLETED"
    }
    // console.log("dataa---", dataPay)
    const res = await putRepairOrder(dataPay.id, dataPay)
    if (res.success) {
      notify({ title: "Success", type: "success", description: "Hóa đơn đã hoàn thành" })
      setIsReload?.(!isReload)
      setIsModal?.(false)
    } else {
      notify({ title: "Error", type: "error", description: res.message })
    }
  }

  const onAddPart = (e: any) => {
    const dataNameId = e.nameId.split("&&")
    const dataPart = {
      id: dataNameId[0],
      name: dataNameId[1],
      unitPrice: dataNameId[2],
      quantity: e.quantity,
      total: e.quantity * dataNameId[2]
    }
    setParts([...parts, dataPart])
    setIsModalPart(false)
  }

  const columnsPart: Column<IPartItem>[] = [
    {
      title: "Tên vật tư",
      dataIndex: "name"
    },
    {
      title: "số lượng",
      dataIndex: "quantity"
    },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      render: (value) => (
        <div>{value.toLocaleString("vi-VN")}</div>
      )
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      render: (value) => (
        <div>{value.toLocaleString("vi-VN")}</div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>Thao tác</div>,
      render: (value, record, index) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 5 }}>
          <Button onClick={() => {
            setParts(pre => pre.filter(item => item.id !== record.id))
          }}
            type="error"
            style={{ padding: 0, width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <AiOutlineMinus />
          </Button>
        </div>
      )
    }
  ]

  return (
    <>
      <BaseModal
        isOpen={isModalPart}
        closeModal={() => setIsModalPart(false)}
      >
        <div style={{ width: 650 }}>
          <Form onFinish={onAddPart}>
            <Row className="gy-2 gx-2">
              <Col xs={12} sm={6}>
                <label className="form-label required" style={{ margin: 5 }}>Phụ tùng</label>
                <SelectPart name="nameId" />
              </Col>
              <Col xs={12} sm={2}>
                <label className="form-label required" style={{ margin: 5 }}>Số lượng</label>
                <Form.Input type="number" name="quantity" />
              </Col>
            </Row>
            <div style={{ margin: "10px 5px", textAlign: "end" }}>
              <Button htmlType="submit" type="gradientPrimary">Thêm mới</Button>
            </div>
          </Form>
        </div>
      </BaseModal>

      <div style={{ width: 700, maxHeight: "90vh", overflowY: "auto" }}>
        <h4 style={{ textAlign: "center" }}>Thông tin tiếp nhận</h4>
        <Form onFinish={onSubmit} initialValues={orderData}>
          <Row className="gy-2 gx-2">
            <Col xs={12} sm={6}>
              <label className="form-label required" style={{ margin: 5 }}>Khách hàng</label>
              <Input name="customerId" disabled value={`${orderData?.customer.data?.name}(${orderData?.customer.data?.name})`} />
            </Col>
            <Col xs={12} sm={6}>
              <label className="form-label required" style={{ margin: 5 }}>Xe</label>
              <Input name="carId" disabled value={`${orderData?.car.model}(${orderData?.car.plate})`} />
            </Col>
            <Col xs={12} sm={12}>
              <label className="form-label required" style={{ margin: 5 }}>Kỹ thuật viên</label>
              <SelectTechnician name="technicianIds" multiple={true} />
            </Col>
            <Col xs={12} sm={7}>
              <label className="form-label required" style={{ margin: 5 }}>Dịch vụ</label>
              <SelectServices name="serviceIds" multiple={true} />
            </Col>
            <Col xs={12}>
              <label className="form-label" style={{ fontWeight: "bold" }}>Danh sách Vật tư / Phụ tùng thay thế</label>
              <TableBase
                columns={columnsPart}
                dataSource={parts}
              />
              <div style={{ margin: "10px 5px", textAlign: "end" }}>
                <Button onClick={() => setIsModalPart(true)} style={{ padding: "3px 10px" }}>+ Thêm phụ tùng</Button>
              </div>
            </Col>
            <Col xs={12} sm={12}>
              <label className="form-label" style={{ margin: 5 }}>Ghi chú</label>
              <Form.Input name="note" placeholder="Ghi chú ..." />
            </Col>
          </Row>
          <div style={{
            display: "flex",
            justifyContent: "end",
            marginTop: 20
          }}>
            <Button
              type="orangeStyle"
              style={{ margin: "10px 10px" }}
              htmlType="submit"
            >
              <AiOutlineDownCircle /> Xuất hóa đơn
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default FormCompleteOrder