import React, { useState } from "react";
import { AiOutlineRise } from "react-icons/ai"; // Icon biểu đồ tăng
import { FaTools, FaCubes } from "react-icons/fa"; // Icon cho nút filter
import TableBase, { Column } from "../../../components/BaseTable";
import Tag from "../../../components/Tag";
import { formatCurrency } from "../../../utils/formatCurrency";
import { ColorStyle } from "../../../styles/colors";


const RevenueStatistics = ({ dataaa }: { dataaa: any }) => {
  const [segmented, setSegmented] = useState<1 | 2>(1)

  const dataSource = segmented === 1 ? dataaa?.serviceStatistics : dataaa?.partStatistics

  const columns: Column<any>[] = [
    {
      title: "Hạng",
      dataIndex: "rank",
      width: 100,
      render: (val) => (
        <div style={{ textAlign: "center" }}>
          {
            val === 1 ? <Tag color={"gold"}>{val}</Tag>
              : val === 2 ? <Tag color={"geekblue"}>{val}</Tag>
                : val === 3 ? <Tag color={"volcano"}>{val}</Tag>
                  : <Tag>{val}</Tag>
          }
        </div>
      ),
    },
    {
      title: "Mã",
      dataIndex: "code",
      width: 150,
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: 150,
      render: (val) => (
        <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#3498db" }}>
          <AiOutlineRise />
          <span>{val}</span>
        </div>
      ),
    },
    {
      title: "Tổng doanh thu",
      dataIndex: "totalRevenue",
      width: 200,
      render: (val) => (
        <span style={{ color: "#d35400", fontWeight: "bold", fontSize: "15px" }}>
          {formatCurrency(val)}
        </span>
      ),
    },
  ];

  const styleOp = {
    padding: "3px 14px",
    fontSize: 15,
    fontWeight: 500,
    borderRadius: 6,
    cursor: "pointer"
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        margin: "20px 0"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2 style={{ margin: "0 0 5px 0", fontSize: "18px", fontWeight: 700 }}>
            Thống kê theo doanh thu
          </h2>
          <p style={{ margin: 0, color: "#888", fontSize: "14px" }}>
            Xếp hạng dịch vụ và phụ tùng theo tổng doanh thu
          </p>
        </div>

        <div>
          <div style={{
            display: "inline-flex",
            padding: 4,
            borderRadius: 8,
            backgroundColor: ColorStyle.BgSpotlight,
            marginLeft: 10
          }}>
            <div onClick={() => setSegmented(1)} style={{
              ...styleOp,
              backgroundColor: segmented === 1 ? "#fff" : "transparent",
            }}>Dịch vụ</div>
            <div onClick={() => setSegmented(2)} style={{
              ...styleOp,
              backgroundColor: segmented === 2 ? "#fff" : "transparent",
            }}>Phụ tùng</div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <TableBase
        columns={columns}
        dataSource={dataSource}
        pageSize={8}
      />
    </div>
  );
};

export default RevenueStatistics;