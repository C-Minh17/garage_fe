import { Col, Row } from "react-bootstrap"
import Form, { Input } from "../../../components/FormBase"
import SelectServices from "../../dich-vu/components/selectServices"
import SelectTechnician from "../../ky-thuat-vien/components/selectTechnician"
import Button from "../../../components/Button"
import { AiOutlineArrowLeft, AiOutlineDownCircle } from "react-icons/ai"
import { postRepairOrder } from "../../../services/api/repairOrderApi"
import { notify } from "../../../components/Notification"
import { useNavigate } from "react-router"

interface IFormRepairOrder {
  targetCar?: MCar.IResponse,
  targetCustomer?: MCustomer.IRecord,
  setStep: (a: 1 | 2) => void,
  isReload?: boolean,
  setIsReload?: (a: boolean) => void,
}

const FormRepairOrder = (props: IFormRepairOrder) => {
  const { targetCar, targetCustomer, setStep, isReload, setIsReload } = props
  const navigate = useNavigate()

  const onSubmit = async (e: MRepairOrder.IRecord) => {
    const dataPay = {
      ...e,
      customerId: targetCustomer?.id,
      carId: targetCar?.id,
      status: "IN_PROGRESS",
    }
    console.log("fisst", dataPay)
    const res = await postRepairOrder(dataPay)
    if (res.message) {
      notify({ title: "Success", type: "success", description: "Đã thêm nhà cung cấp mới" })
      navigate("/payment")
    } else {
      notify({ title: "Error", type: "error", description: res.message })
    }
  }


  return (
    <div>
      <h4 style={{ textAlign: "center" }}>Thông tin tiếp nhận</h4>
      <Form onFinish={onSubmit}>
        <Row className="gy-2 gx-2">
          <Col xs={12} sm={6}>
            <label className="form-label required" style={{ margin: 5 }}>Khách hàng</label>
            <Input name="customerId" disabled value={`${targetCustomer?.name}(${targetCustomer?.customerCode})`} />
          </Col>
          <Col xs={12} sm={6}>
            <label className="form-label required" style={{ margin: 5 }}>Xe</label>
            <Input name="carId" disabled value={`${targetCar?.model}(${targetCar?.plate})`} />
          </Col>
          <Col xs={12} sm={12}>
            <label className="form-label required" style={{ margin: 5 }}>Kỹ thuật viên</label>
            <SelectTechnician name="technicianIds" multiple={true} />
          </Col>
          <Col xs={12} sm={7}>
            <label className="form-label required" style={{ margin: 5 }}>Dịch vụ</label>
            <SelectServices name="serviceIds" multiple={true} />
          </Col>
          <Col xs={12} sm={12}>
            <label className="form-label" style={{ margin: 5 }}>Ghi chú</label>
            <Form.Input name="note" placeholder="Ghi chú ..." />
          </Col>
        </Row>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 20
        }}>
          <Button
            type="orangeStyle"
            onClick={() => setStep(1)}
            style={{ margin: "10px 10px" }}
          >
            <AiOutlineArrowLeft /> Quay lại
          </Button>
          <Button
            type="orangeStyle"
            style={{ margin: "10px 10px" }}
            htmlType="submit"
          >
            <AiOutlineDownCircle /> Tiếp nhận xe
          </Button>
        </div>
      </Form>

    </div>
  )
}

export default FormRepairOrder