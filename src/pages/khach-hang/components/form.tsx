import { Col, Container, Row } from "react-bootstrap"
import Form from "../../../components/FormBase"
import Button from "../../../components/Button"
import { postCustomer, putCustomer } from "../../../services/api/customerApi"
import { notify } from "../../../components/Notification"


interface IFormCustomer {
  valueInitial?: MCustomer.IRecord,
  method: "post" | "put",
  setIsModal?: (a: boolean) => void,
  isReload?: boolean,
  setIsReload?: (a: boolean) => void,
}

const FormCustomer = ({ valueInitial, method, setIsModal, isReload, setIsReload }: IFormCustomer) => {

  const onSubmit = async (data: MCustomer.IRecord) => {
    if (method === "post") {
      const res = await postCustomer(data)
      if (res.success) {
        notify({ title: "Success", type: "success", description: "Đã thêm khách hàng thành công" })
        setIsReload?.(!isReload)
        setIsModal?.(false)
      } else {
        notify({ title: "Error", type: "error", description: res.message })
      }
    } else if (method === "put") {
      const res = await putCustomer(valueInitial!.id!, data)
      if (res.success) {
        notify({ title: "Success", type: "success", description: "Thông tin khách hàng đã được cập nhật" })
        setIsReload?.(!isReload)
        setIsModal?.(false)
      } else {
        notify({ title: "Error", type: "error", description: res.message })
      }
    }
  }
  return (
    <>
      <Container style={{
        maxWidth: "550px"
      }}>
        <h5 style={{ marginBottom: 20 }}>{method === "post" ? "Thêm khách hàng mới" : "Chỉnh sửa thông tin khách hàng"}</h5>
        <Form initialValues={valueInitial} onFinish={onSubmit}>
          <Row className="gy-2 gx-0">
            <Col sm={12}>
              <label className="form-label required" style={{ margin: 5 }}>Tên khách hàng</label>
              <Form.Input name="name" placeholder="Tên khách hàng" required />
            </Col>
            <Col sm={12}>
              <label className="form-label required" style={{ margin: 5 }}>Số điện thoại</label>
              <Form.Input name="phone" placeholder="Số điện thoại" required />
            </Col>
            <Col sm={12}>
              <label className="form-label required" style={{ margin: 5 }}>Email</label>
              <Form.Input name="email" placeholder="email" required />
            </Col>
            <Col sm={12}>
              <label className="form-label required" style={{ margin: 5 }}>Địa chỉ</label>
              <Form.Input name="address" placeholder="Địa chỉ" required />
            </Col>
            <Col sm={12}>
              <label className="form-label " style={{ margin: 5 }}>Ghi chú</label>
              <Form.Input name="note" placeholder="Ghi chú" />
            </Col>
          </Row>
          <div style={{
            textAlign: "end",
            margin: "15px 10px"
          }}>
            <Button htmlType="submit" type="gradientPrimary" >{method === "post" ? "Thêm mới" : "Lưu"}</Button>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default FormCustomer