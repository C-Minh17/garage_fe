import React from "react";
import { ColorStyle } from "../../../styles/colors";
import { C } from "react-router/dist/development/index-react-server-client-BSxMvS7Z";

interface IDetailTechnician {
  data: MTechnician.IRecord | undefined;
}

const DetailTechnician = ({ data }: IDetailTechnician) => {
  const rowStyle = {
    display: "flex",
    padding: "12px 0",
    borderBottom: "1px solid #eee",
    alignItems: "center",
  };

  const labelStyle = {
    width: "180px",
    fontWeight: 600,
    color: "#555",
  };

  const valueStyle = {
    flex: 1,
    color: "#222",
    fontSize: "15px",
    fontWeight: 500,
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px 30px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        minWidth: "500px",
        maxWidth: "650px",
      }}
    >
      <h3 style={{ marginBottom: "25px", color: ColorStyle.Primary, textAlign: "center", textTransform: "uppercase" }}>
        Thông tin Kỹ thuật viên
      </h3>

      <div style={rowStyle}>
        <div style={labelStyle}>Mã KTV:</div>
        <div style={{ ...valueStyle, color: ColorStyle.Primary, fontWeight: "bold" }}>
          {data?.techCode || "-"}
        </div>
      </div>

      <div style={rowStyle}>
        <div style={labelStyle}>Họ và tên:</div>
        <div style={valueStyle}>{data?.name || "-"}</div>
      </div>

      <div style={rowStyle}>
        <div style={labelStyle}>Số điện thoại:</div>
        <div style={valueStyle}>{data?.phone || "-"}</div>
      </div>

      <div style={rowStyle}>
        <div style={labelStyle}>Chức vụ:</div>
        <div style={valueStyle}>
             <span style={{ background: "#e6f7ff", color: "#1890ff", padding: "4px 8px", borderRadius: "4px", fontSize: "13px" }}>
                {data?.position || "Nhân viên"}
             </span>
        </div>
      </div>
      <div style={rowStyle}>
        <div style={labelStyle}>Trạng thái:</div>
        <div style={valueStyle}>
          <span style={{color: data?.active ? ColorStyle.Success : "#dc3545",fontWeight: 600}}>
            {data?.active ? "Hoạt động" : "Không hoạt động"}
          </span>
        </div>
      </div>

      <div style={{ ...rowStyle, borderBottom: "none" }}>
        <div style={labelStyle}>Lương cơ bản:</div>
        <div style={{ ...valueStyle, fontWeight: "bold" }}>
          {data?.baseSalary ? Number(data.baseSalary).toLocaleString("vi-VN") + " VNĐ" : "0 VNĐ"}
        </div>
      </div>
    </div>
  );
};

export default DetailTechnician;