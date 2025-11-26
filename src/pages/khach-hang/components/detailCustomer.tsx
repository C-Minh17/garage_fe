import React from "react";
import { ColorStyle } from "../../../styles/colors";
import { AiFillCar } from "react-icons/ai";

interface IDetailCustomer {
  data: MCustomer.IRecord | undefined;
}

const DetailCustomer = ({ data }: IDetailCustomer) => {
  const rowStyle = {
    display: "flex",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  };

  const labelStyle = {
    width: "120px",
    fontWeight: 600,
    color: "#555",
  };

  const valueStyle = {
    flex: 1,
    color: "#222",
    fontSize: "15px",
    wordBreak: "break-word" as const,
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        minWidth: "600px",
        maxWidth: "750px",
      }}
    >
      <h3 style={{ marginBottom: "20px", color: ColorStyle.Primary, textAlign: "center", textTransform: "uppercase" }}>
        Hồ sơ Khách hàng
      </h3>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Cột thông tin cá nhân */}
        <div style={{ flex: 1 }}>
          <h5 style={{ borderBottom: `2px solid ${ColorStyle.Primary}`, paddingBottom: 5, display: "inline-block", marginBottom: 15 }}>Thông tin chung</h5>
          
          <div style={rowStyle}>
            <div style={labelStyle}>Mã KH:</div>
            <div style={{ ...valueStyle, fontWeight: "bold" }}>{data?.customerCode || "-"}</div>
          </div>

          <div style={rowStyle}>
            <div style={labelStyle}>Họ và tên:</div>
            <div style={{ ...valueStyle, fontSize: 16, fontWeight: 600 }}>{data?.name || "-"}</div>
          </div>

          <div style={rowStyle}>
            <div style={labelStyle}>Số điện thoại:</div>
            <div style={{ ...valueStyle }}>{data?.phone || "-"}</div>
          </div>

          <div style={rowStyle}>
            <div style={labelStyle}>Email:</div>
            <div style={valueStyle}>{data?.email || "-"}</div>
          </div>

          <div style={rowStyle}>
            <div style={labelStyle}>Địa chỉ:</div>
            <div style={valueStyle}>{data?.address || "-"}</div>
          </div>
          
           <div style={{ ...rowStyle, borderBottom: "none" }}>
            <div style={labelStyle}>Ghi chú:</div>
            <div style={{ ...valueStyle, fontStyle: 'italic', color: '#666' }}>{data?.note || "—"}</div>
          </div>
        </div>
        {/* listCar */}
        <div style={{ width: "250px", background: "#f9f9f9", padding: "10px", borderRadius: "8px"}}>
             <h5 style={{ borderBottom: "2px solid #faad14", paddingBottom: 5, marginBottom: 15}}>
                Xe sở hữu ({data?.cars?.length || 0})
             </h5>
             <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                {data?.cars && data.cars.length > 0 ? (
                    data.cars.map((car: any, index: number) => (
                        <div key={index} style={{ 
                            background: "#fff", 
                            padding: "8px", 
                            marginBottom: "8px", 
                            borderRadius: "6px", 
                            border: "1px solid #eee",
                            fontSize: "13px"
                        }}>
                            <div style={{fontWeight: "bold", color: "#333", display: "flex", alignItems: "center", gap: 5}}>
                                <AiFillCar /> {car.plate}
                            </div>
                            <div style={{color: "#666"}}>{car.model} - {car.manufacturer}</div>
                        </div>
                    ))
                ) : (
                    <div style={{color: "#999", fontStyle: "italic", textAlign: "center"}}>Chưa có xe</div>
                )}
             </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCustomer;