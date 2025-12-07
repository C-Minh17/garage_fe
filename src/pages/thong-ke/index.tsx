import CardStatistical from "./components/cardStatistical"
import RevenueChart from "./components/revenueChart"
import RevenueStatistics from "./components/RevenueStatistic"

const Statistical = () => {
  return (
    <>
      <div>
        <h2>Thống kê của garage</h2>
        <div>Phân tích chi tiết hoạt động kinh doanh của garage</div>
        <div>
          <CardStatistical />
        </div>
        <div>
          <RevenueChart />
        </div>
        <div>
          <RevenueStatistics />
        </div>
      </div>
    </>
  )
}

export default Statistical