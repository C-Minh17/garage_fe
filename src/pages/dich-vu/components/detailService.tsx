import React from "react";
import { ColorStyle } from "../../../styles/colors";

interface IDetailService {
  data: MService.IRecord | undefined;
}

const DetailService = ({ data }: IDetailService) => {
  const rowStyle = {
    display: "flex",
    padding: "12px 0",
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

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px 30px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        minWidth: "500px",
        maxWidth: "600px",
      }}
    >
      <h3 style={{ marginBottom: "20px", color: ColorStyle.Primary, textAlign: "center", textTransform: "uppercase" }}>
        Chi tiết Dịch vụ
      </h3>

      <div style={rowStyle}>
        <div style={labelStyle}>Mã dịch vụ:</div>
        <div style={{ ...valueStyle, fontWeight: "bold" }}>
            {data?.serviceCode || "-"}
        </div>
      </div>

      <div style={rowStyle}>
        <div style={labelStyle}>Tên dịch vụ:</div>
        <div style={{ ...valueStyle, fontWeight: 600 }}>{data?.name || "-"}</div>
      </div>

      <div style={rowStyle}>
        <div style={labelStyle}>Đơn giá:</div>
        <div style={{ ...valueStyle, fontWeight: "bold", fontSize: 16 }}>
          {data?.price ? Number(data.price).toLocaleString("vi-VN") : "0"} <span style={{fontSize: 12, color: '#999', fontWeight: 400}}>VNĐ</span>
        </div>
      </div>

      <div style={{ ...rowStyle, borderBottom: "none" }}>
        <div style={labelStyle}>Mô tả:</div>
        <div style={{ ...valueStyle, whiteSpace: "pre-line", lineHeight: "1.5" }}>
          {data?.description || "— Không có mô tả —"}
        </div>
      </div>
    </div>
  );
};

export default DetailService;