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
import PartDashboard from "./components/dashboardPart";
import { Col, Row } from "react-bootstrap";
import TopCustomerDashboard from "./components/dashboardCustomer";


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
        <div
          style={{
            fontSize: "17px",
            color: "#555",
            marginBottom: "28px",
          }}
        >
          Chào mừng đến với garage! Dưới đây là tổng quan hoạt động trong ngày hôm nay.
        </div>
        <div>
          <CardDashboard />
        </div>
        <div style={{ margin: "40px 0" }}>
          <Row>
            <Col xs={12} lg={6}>
              <TopCustomerDashboard />
            </Col>
            <Col xs={12} lg={6}>
              <PartDashboard />
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default DashBoard