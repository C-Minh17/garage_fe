import { Col, Container, Row } from "react-bootstrap"
import Form, { Input } from "../../../components/FormBase"
import Button from "../../../components/Button"
import { notify } from "../../../components/Notification"
import { postPart, putPart } from "../../../services/api/partApi"
import SelectSupplier from "./selectSupplier"


interface IFormPart {
  valueInitial?: MPart.IRecord,
  method: "post" | "put",
  setIsModal?: (a: boolean) => void,
  isReload?: boolean,
  setIsReload?: (a: boolean) => void,
}

const FormPart = ({ valueInitial, method, setIsModal, isReload, setIsReload }: IFormPart) => {

  const onSubmit = async (data: MPart.IRecord) => {
    if (method === "post") {
      const payData = { ...data, stock: 0 }
      const res = await postPart(payData)
      if (res.success) {
        notify({ title: "Success", type: "success", description: "Đã thêm nhà cung cấp mới" })
        setIsReload?.(!isReload)
        setIsModal?.(false)
      } else {
        notify({ title: "Error", type: "error", description: res.message })
      }
    } else if (method === "put") {
      if (!valueInitial?.id) return
      const res = await putPart(valueInitial.id, data)
      if (res.success) {
        notify({ title: "Success", type: "success", description: "Thông tin nhà cung cấp đã được cập nhật" })
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
        <h5 style={{ marginBottom: 20 }}>{method === "post" ? "Thêm phụ tùng mới" : "Chỉnh sửa thông tin phụ tùng"}</h5>
        <Form initialValues={valueInitial} onFinish={onSubmit}>
          <Row className="gy-2 gx-1">
            <Col xs={12} sm={12}>
              <label className="form-label required" style={{ margin: 5 }}>Tên phụ tùng</label>
              <Form.Input name="name" placeholder="Tên phụ tùng" required />
            </Col>
            <Col xs={12} sm={6}>
              <label className="form-label required" style={{ margin: 5 }}>Giá bán</label>
              <Form.Input min={0} type="number" name="price" placeholder="Giá bán" required />
            </Col>
            <Col xs={12} sm={6}>
              <label className="form-label required" style={{ margin: 5 }}>Tồn kho</label>
              <Form.Input min={0} type="number" name="stock" placeholder="0" required disabled={method === 'post' ? true : false} />
            </Col>
            <Col xs={12} sm={12}>
              <label className="form-label " style={{ margin: 5 }}>Nhà cung cấp</label>
              {method === "post" ?
                <SelectSupplier name="supplierId" />
                : <Input name="supplierId" disabled value={`${valueInitial?.name}(mã)`} />
              }
            </Col>
            <Col xs={12} sm={12}>
              <label className="form-label " style={{ margin: 5 }}>Mô tả</label>
              <Form.Input name="description" placeholder="Mô tả" />
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

export default FormPart