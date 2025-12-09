import { useEffect, useState } from "react"
import { getStatisticServicePart, getTopCustomer } from "../../../services/api/statisticsApi"
import TableBase, { Column } from "../../../components/BaseTable"
import Tag from "../../../components/Tag"
import { formatCurrency } from "../../../utils/formatCurrency"

const TopCustomerDashboard = () => {
  const [data, setData] = useState<any[]>([])

  const mergedData = data.map((item, index) => ({
    ...item,
    rank: index + 1
  }));

  const column: Column<any>[] = [
    {
      title: "Top",
      dataIndex: "rank",
      width: 90,
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
      title: "Mã khách hàng",
      dataIndex: "userCode"
    },
    {
      title: "Tên khách hàng",
      dataIndex: "userName"
    },
    {
      title: "Tổng chi tiêu",
      dataIndex: "totalSpent",
      render: (value) => (
        <div>{formatCurrency(value)}</div>
      )
    },
  ]

  useEffect(() => {
    getTopCustomer().then(res => setData(res.data.user))
  }, [])

  return (
    <div>
      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          padding: "12px 18px",
          background: "#f5f7ff",
          borderLeft: "4px solid #4b7fff",
          borderRadius: 6
        }}
      >
        Top khách hàng
      </h3>
      <TableBase
        columns={column}
        dataSource={mergedData}
      />
    </div>
  )
}

export default TopCustomerDashboard