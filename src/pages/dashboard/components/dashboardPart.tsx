import { useEffect, useState } from "react"
import { getStatisticServicePart } from "../../../services/api/statisticsApi"
import TableBase, { Column } from "../../../components/BaseTable"
import Tag from "../../../components/Tag"

const PartDashboard = () => {
  const [data, setData] = useState<any>()

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
      title: "Tên",
      dataIndex: "name"
    },
    {
      title: "Số lượng",
      dataIndex: "quantity"
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalRevenue"
    },
  ]

  useEffect(() => {
    getStatisticServicePart().then(res => setData(res.data))
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
        Top linh kiện / phụ tùng
      </h3>
      <TableBase
        columns={column}
        dataSource={data?.partStatistics}
      />
    </div>
  )
}

export default PartDashboard