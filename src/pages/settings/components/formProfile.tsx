import { Col, Container, Row } from "react-bootstrap"
import Form, { Input } from "../../../components/FormBase"
import Button from "../../../components/Button"
import { notify } from "../../../components/Notification"
import { putProfile } from "../../../services/api/profileApi"
import { useState } from "react"


interface IFormProfile {
  valueInitial?: MProfile.IRecord,
  setIsModal?: (a: boolean) => void,
  isReload?: boolean,
  setIsReload?: (a: boolean) => void,
}

const FormProfile = ({ valueInitial, setIsModal, isReload, setIsReload }: IFormProfile) => {
  const [lickAvatar, setLinkAvatar] = useState<any>()

  const onSubmit = async (data: MProfile.IRecord) => {
    if (!valueInitial?.id) return
    // const payData = {
    //   ...data,
    //   avatar: lickAvatar
    // }
    // console.log(payData)
    const res = await putProfile(data)
    if (res) {
      notify({ title: "Success", type: "success", description: "Thông tin cá nhân đã được cập nhật" })
      setIsReload?.(!isReload)
      setIsModal?.(false)
    } else {
      notify({ title: "Error", type: "error" })
    }
  }
  return (
    <>
      <Container style={{ maxWidth: "800px" }}>
        <h5 style={{ marginBottom: 20 }}>{"Cập nhật thông tin cá nhân"}</h5>
        <Form initialValues={valueInitial} onFinish={onSubmit}>
          <Row className="gy-2 gx-1">
            <Col xs={12} sm={6}>
              <label className="form-label required" style={{ margin: 5 }}>Tên người dùng</label>
              <Form.Input name="username" placeholder="Nhập tên người dùng" required />
            </Col>
            <Col xs={12} sm={6}>
              <label className="form-label required" style={{ margin: 5 }}>Email</label>
              <Form.Input type="email" name="email" placeholder="example@gmail.com" required disabled />
            </Col>
            <Col xs={12} sm={6}>
              <label className="form-label required" style={{ margin: 5 }}>Số điện thoại</label>
              <Form.Input name="phonenumber" placeholder="Nhập số điện thoại" required disabled />
            </Col>
            <Col xs={12} sm={6}>
              <label className="form-label" style={{ margin: 5 }}>Ngày sinh</label>
              <Form.Input type="date" name="birthday" placeholder="Ngày sinh" />
            </Col>
            <Col xs={12} sm={6}>
              <label className="form-label" style={{ margin: 5 }}>Giới tính</label>
              <Form.Input name="gender" placeholder="Nam/Nữ" />
            </Col>
            <Col xs={12} sm={6}>
              <label className="form-label" style={{ margin: 5 }}>Quê quán</label>
              <Form.Input name="hometown" placeholder="Nhập quê quán" />
            </Col>
            <Col xs={12} sm={6}>
              <label className="form-label" style={{ margin: 5 }}>Thành phố</label>
              <Form.Input name="city" placeholder="Nhập thành phố" />
            </Col>
            <Col xs={12} sm={6}>
              <label className="form-label" style={{ margin: 5 }}>Địa chỉ cụ thể</label>
              <Form.Input name="address" placeholder="Số nhà, đường..." />
            </Col>
            {/* <Col xs={12} sm={12}>
              <label className="form-label" style={{ margin: 5 }}>Ảnh đại diện (URL)</label>
              <Input
                type="file"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files?.[0];
                  setLinkAvatar(file);
                }}
                name="avatar"
              />
            </Col> */}
            <Col xs={12} sm={12}>
              <label className="form-label" style={{ margin: 5 }}>Mô tả</label>
              <Form.Input name="description" placeholder="Mô tả ngắn về bản thân" />
            </Col>
          </Row>
          <div style={{ textAlign: "end", margin: "15px 10px" }}>
            <Button htmlType="submit" type="gradientPrimary">{"Lưu thay đổi"}</Button>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default FormProfile