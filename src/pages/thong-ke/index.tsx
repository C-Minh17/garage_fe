import { useEffect, useState } from "react"
import CardStatistical from "./components/cardStatistical"
import RevenueChart from "./components/revenueChart"
import RevenueStatistics from "./components/RevenueStatistic"
import { getMonthlyRevenue, getStatisticDashboard, getStatisticServicePart } from "../../services/api/statisticsApi"

const Statistical = () => {
  const [dataCard, setDataCard] = useState<any>()
  const [dataMonthlyRevenue, setDataMonthlyRevenue] = useState<any>()
  const [dataStatisticSP, setDataStatisticSP] = useState<any>()

  useEffect(() => {
    getStatisticDashboard().then(res => setDataCard(res.data))
    getMonthlyRevenue().then(res => setDataMonthlyRevenue(res.data))
    getStatisticServicePart().then(res => setDataStatisticSP(res.data))
  }, [])
  return (
    <>
      <div>
        <h2>Thống kê của garage</h2>
        <div>Phân tích chi tiết hoạt động kinh doanh của garage</div>
        <div>
          <CardStatistical dataaa={dataCard} />
        </div>
        <div>
          <RevenueChart dataaa={dataMonthlyRevenue} />
        </div>
        <div>
          <RevenueStatistics dataaa={dataStatisticSP} />
        </div>
      </div>
    </>
  )
}

export default Statistical