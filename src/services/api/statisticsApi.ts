import axios from "../../utils/axios"
import { ipStatistic } from "../../utils/ip"

const getMonthlyRevenue = async () => {
  const res = await axios.get(`${ipStatistic}/monthly-revenue`)
  return res as ApiResponse<any>
}

const getStatisticServicePart = async () => {
  const res = await axios.get(`${ipStatistic}/statistics`)
  return res as ApiResponse<any>
}

const getStatisticDashboard = async () => {
  const res = await axios.get(`${ipStatistic}/dashboard`)
  return res as ApiResponse<any>
}

const getStatisticDaily = async (date: string) => {
  const res = await axios.get(`${ipStatistic}/daily?date=${date}`)
  return res as any
}

export {
  getMonthlyRevenue,
  getStatisticDashboard,
  getStatisticServicePart,
  getStatisticDaily
}