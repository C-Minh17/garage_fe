import { useEffect, useState } from "react"
import BaseModal from "../../components/baseModal"
import Button from "../../components/Button"
import TableBase, { Column, ITableBase } from "../../components/BaseTable"
import Form, { Input } from "../../components/FormBase";
import { getCustomers } from "../../services/api/customerApi";
import { notify } from "../../components/Notification";
import Select from "../../components/Select";
import SelectSupplier from "../phu-tung/components/selectSupplier";
import Drawer from "../../components/draw.tsx";
import Notification from "../notification";
import CardDashboard from "./components/cards";


const DashBoard = () => {
  const [dataCard, setDataCard] = useState<any>()
  const [dataMonthlyRevenue, setDataMonthlyRevenue] = useState<any>()
  const [dataStatisticSP, setDataStatisticSP] = useState<any>()

  // useEffect(() => {
  //   getStatisticDashboard().then(res => setDataCard(res.data))
  //   getMonthlyRevenue().then(res => setDataMonthlyRevenue(res.data))
  //   getStatisticServicePart().then(res => setDataStatisticSP(res.data))
  // }, [])
  return (
    <>
      <div>
        <h2>Tổng quan</h2>
        <div>Chào mừng đến với garage</div>
        <div>
          <CardDashboard />
        </div>
        <div>
          {/* <RevenueChart dataaa={dataMonthlyRevenue} /> */}
        </div>
        <div>
          {/* <RevenueStatistics dataaa={dataStatisticSP} /> */}
        </div>
      </div>
    </>
  )
}

export default DashBoard