import { Col, Container, Row, Form as BForm } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Form from "../../../components/FormBase";
import Button from "../../../components/Button";
import { ColorStyle } from "../../../styles/colors";
import { notify } from "../../../components/Notification";
import { postCar, putCar } from "../../../services/api/carApi";
import CustomerSelect from "../../khach-hang/components/select";

interface IFormCar {
  valueInitial?: Partial<MCar.IResponse>;
  method: "post" | "put";
  setIsModal?: (a: boolean) => void;
  isReload?: boolean;
  setIsReload?: (a: boolean) => void;
}

const FormCar = ({ valueInitial, method, setIsModal, isReload, setIsReload }: IFormCar) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (method === 'put' && valueInitial) {
      setIsActive(!!valueInitial?.active);
    } else {
      setIsActive(false);
    }
  }, [valueInitial, method]);

  const onSubmit = async (data: any) => {
    const customerId = method === "post" ? data.customerId : valueInitial?.customerId;
    if (!customerId) {
      notify({
        title: "Lỗi",
        type: "error",
        description: "Vui lòng chọn khách hàng!"
      });
      return;
    }
    if (!data.plate) {
      notify({ title: "Lỗi", type: "error", description: "Vui lòng nhập biển số xe!" });
      return;
    }
    const payload: MCar.IRequest = {
      plate: data.plate,
      model: data.model || "",
      manufacturer: data.manufacturer || "",
      description: data.description || "",
      customerId: customerId,
      // active: method === "put" ? valueInitial?.active : false 
      active: isActive,
    };

    let res: any;

    try {
      if (method === "post") {
        res = await postCar(payload);
      } else {
        if (!valueInitial?.id) {
          notify({ title: "Lỗi", type: "error", description: "Không tìm thấy ID xe cần sửa" });
          return;
        }
        res = await putCar(valueInitial.id, payload);
      }

      if (res?.success) {
        notify({
          title: "Thành công",
          type: "success",
          description: method === "post" ? "Đã thêm xe thành công" : "Thông tin xe đã được cập nhật",
        });
        setIsReload?.(!isReload);
        setIsModal?.(false);
      } else {
        notify({ title: "Lỗi", type: "error", description: res?.message || "Có lỗi xảy ra từ phía server" });
      }
    } catch (error) {
      notify({ title: "Lỗi hệ thống", type: "error", description: "Không thể kết nối đến server" });
    }
  };

  return (
    <Container style={{ maxWidth: "500px" }}>
      <h5 style={{ marginBottom: 20 }}>
        {method === "post" ? "Thêm xe mới" : "Chỉnh sửa thông tin xe"}
      </h5>

      <Form initialValues={valueInitial} onFinish={onSubmit}>
        <Row className="gy-3 gx-3">
          <Col sm={12}>
            <label className="form-label required mb-1">Khách hàng</label>
            {method === "post" ? (
              <CustomerSelect
                method={method}
                name="customerId"
              />
            ) : (
              <Form.Input name="customerCode" disabled />
            )}
          </Col>

          <Col sm={12}>
            <label className="form-label required mb-1">Biển số xe</label>
            <Form.Input name="plate" placeholder="VD: 30A-12345" required />
          </Col>

          <Col sm={12}>
            <label className="form-label mb-1">Hãng xe</label>
            <Form.Input name="manufacturer" placeholder="VD: Toyota" />
          </Col>

          <Col sm={12}>
            <label className="form-label mb-1">Mẫu xe</label>
            <Form.Input name="model" placeholder="VD: Vios" />
          </Col>

          <Col sm={12}>
            <label className="form-label mb-1">Mô tả</label>
            <Form.Input name="description" placeholder="Mô tả (Tình trạng xe, vết xước...)" />
          </Col>
        </Row>

        <div style={{ textAlign: "end", margin: "15px 10px" }}>
          <Button htmlType="submit" type="gradientPrimary">
            {method === "post" ? "Thêm mới" : "Lưu thay đổi"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default FormCar;