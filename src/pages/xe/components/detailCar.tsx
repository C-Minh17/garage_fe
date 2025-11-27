import React from "react";
import { ColorStyle } from "../../../styles/colors";
import Form from "../../../components/FormBase";
interface IDetailCar {
  data: MCar.IResponse | undefined;
}

const DetailCar = ({ data }: IDetailCar) => {
  const rowStyle = {
    display: "flex",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  };

  const labelStyle = {
    width: "160px",
    fontWeight: 600,
    color: "#555",
  };

  const valueStyle = {
    flex: 1,
    color: "#222",
    fontSize: "15px",
  };

  const renderStatus = (isActive: boolean) => {
    return isActive ? (
      <span style={{ color: ColorStyle.Primary, fontWeight: 600 }}>Chờ thanh toán</span>
    ) : (
      <span style={{ color: "#faad14", fontWeight: 600 }}>Đang sửa chữa</span>
    );
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        maxWidth: "650px",
        minWidth: "500px"
      }}
    >
      <h3 style={{ marginBottom: "20px", color: "#333", textAlign: 'center' }}>
        Thông tin chi tiết xe
      </h3>

      <div style={rowStyle}>
        <div style={labelStyle}>Biển số xe:</div>
        <div style={{ ...valueStyle, fontWeight: "bold", color: ColorStyle.Primary }}>
            {data?.plate || "-"}
        </div>
      </div>

      <div style={rowStyle}>
        <div style={labelStyle}>Hãng sản xuất:</div>
        <div style={valueStyle}>{data?.manufacturer || "-"}</div>
      </div>

      <div style={rowStyle}>
        <div style={labelStyle}>Dòng xe (Model):</div>
        <div style={valueStyle}>{data?.model || "-"}</div>
      </div>

      <div style={rowStyle}>
        <div style={labelStyle}>Mã khách hàng:</div>
        <div style={valueStyle}>{data?.customerCode || "-"}</div>
      </div>

      <div style={rowStyle}>
        <div style={labelStyle}>Trạng thái:</div>
        <div style={valueStyle}>
            {data ? renderStatus(data.active) : "-"}
        </div>
      </div>

      <div style={{ ...rowStyle, borderBottom: "none" }}>
        <div style={labelStyle}>Mô tả / Ghi chú:</div>
        <div style={{ ...valueStyle, whiteSpace: "pre-line" }}>
          {data?.description || "— Không có mô tả —"}
        </div>
      </div>
    </div>
  );
};

export default DetailCar;