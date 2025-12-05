import { useEffect, useState } from "react"
import { Input } from "../../components/FormBase"
import { getCustomers, getCustomerSearch } from "../../services/api/customerApi"
import { Col, Row } from "react-bootstrap"
import Button from "../../components/Button"
import { getCar, getCarCustomer, searchCar } from "../../services/api/carApi"
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDownCircle, AiOutlineDropbox } from "react-icons/ai"
import BaseModal from "../../components/baseModal"
import FormCar from "../xe/components/formlistcar"
import FormCustomer from "../khach-hang/components/form"
import FormRepairOrder from "./components/formRepairOrder"

const VehicleReception = () => {
  const [dataCustomer, setDataCustomer] = useState<MCustomer.IRecord[]>([])
  const [querySearchCustomer, setQuerySearchCustomer] = useState<any>()
  const [isReload, setIsReload] = useState<boolean>(true)
  const [targetCustomer, setTargetCustomer] = useState<MCustomer.IRecord>()
  const [dataCars, setDataCars] = useState<MCar.IResponse[]>([])
  const [targetCar, setTargetCar] = useState<MCar.IResponse>()
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isTypeModal, setIsTypeModal] = useState<"car" | "customer">()
  const [step, setStep] = useState<1 | 2>(1)

  useEffect(() => {
    if (querySearchCustomer) {
      getCustomerSearch(querySearchCustomer)
        .then(res => setDataCustomer(res?.data ? res.data : []))
    } else {
      getCustomers()
        .then(res => setDataCustomer(res?.data ? res.data : []))
    }

  }, [isReload, querySearchCustomer])

  useEffect(() => {
    if (targetCustomer?.id) {
      getCarCustomer(targetCustomer?.id)
        .then(res => setDataCars(res?.data ? res.data : []))
    }
  }, [targetCustomer, isReload])

  return (
    <>
      <BaseModal
        isOpen={isModal}
        closeModal={() => setIsModal(false)}
      >
        {isTypeModal === "car" ?
          <div>
            <FormCar valueInitial={{ customerId: targetCustomer?.id }} method="post" setIsModal={setIsModal} setIsReload={setIsReload} isReload={isReload} />
          </div>
          : <div>
            <FormCustomer method="post" setIsModal={setIsModal} setIsReload={setIsReload} isReload={isReload} />
          </div>
        }
      </BaseModal>
      <h1>Tiếp nhận xe</h1>
      <div style={{
        width: "100%",
        overflow: "hidden",
      }}>
        <div
          style={{
            display: "flex",
            gap: "800px",
            width: "calc(200% + 800px)",
            transition: "transform 0.5s ease",
            transform: step === 2 ? "translateX(calc(-50% - 400px))" : "translateX(0)"
          }}
        >
          <div style={{
            margin: "50px 0",
            width: '100%'
          }}>
            <div style={{
              textAlign: 'end',
              margin: "10px 0"
            }}>
              <Button
                style={{ padding: "10px 15px" }}
                type="gradientPrimary"
                onClick={() => {
                  setIsTypeModal("customer")
                  setIsModal(true)
                }}
              >+ Thêm khách hàng mới</Button>
            </div>
            <Row className="gy-2">
              <Col xs={12} sm={12} md={4} style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    width: 300,
                    border: "1px solid #e5e8ef",
                    borderRadius: 10,
                    padding: 12,
                    backgroundColor: "#fff",
                    boxShadow: "0 3px 10px rgba(0, 64, 128, 0.05)",
                  }}
                >
                  <div style={{ marginBottom: 12 }}>
                    <Input
                      name="searchCustomer"
                      placeholder="Nhập tên khách hàng cần tìm ..."
                      style={{
                        borderRadius: 8,
                        border: "1px solid #c4d7ff",
                        padding: "6px 10px",
                      }}
                      onChange={(e) => setQuerySearchCustomer(e.target.value)}
                    />
                  </div>

                  <div
                    style={{
                      height: 320,
                      overflowY: "auto",
                    }}
                  >
                    {dataCustomer?.map((item) => {
                      const isSelected = targetCustomer?.customerCode === item.customerCode;

                      return (
                        <div
                          key={item.customerCode}
                          style={{
                            padding: "10px 12px",
                            borderBottom: "1px solid #eef3ff",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            backgroundColor: isSelected ? "#e8f1ff" : "#ffffff",
                            borderLeft: isSelected ? "3px solid #1a73e8" : "3px solid transparent",
                            borderRadius: 6,
                            marginBottom: 4,
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) e.currentTarget.style.backgroundColor = "#f3f7ff";
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) e.currentTarget.style.backgroundColor = "#ffffff";
                          }}
                          onClick={() => {
                            setTargetCustomer(item)
                            setTargetCar(undefined)
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 600,
                              fontSize: 15,
                              color: "#1d3b78",
                            }}
                          >
                            {`${item.name} (${item.customerCode})`}
                          </div>
                          <div
                            style={{
                              color: "#4f5d75",
                              fontSize: 13,
                              marginTop: 4,
                            }}
                          >
                            {item.phone}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Col>

              <Col xs={12} sm={12} md={8}>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: 12,
                    padding: "15px 0",
                    border: "1px solid #e5e8ef",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ textAlign: "end", margin: "0 20px", padding: "10px 0" }}>
                    <Button onClick={() => {
                      setIsTypeModal("car")
                      setIsModal(true)
                    }}>+ thêm xe</Button>
                  </div>
                  <div style={{
                    margin: "10px 20px",
                    height: 270,
                    overflowY: "auto",
                  }}>
                    <Row className="gy-0 gx-0">
                      {dataCars.length !== 0 ? dataCars?.map(item => (
                        <Col xs={12} sm={6} xl={4} key={item?.id}>
                          <div
                            style={{
                              background: targetCar?.id === item.id ? "#d0e2ff" : "#f8faff",
                              borderRadius: 12,
                              padding: "14px 16px",
                              margin: 8,
                              border: targetCar?.id === item.id ? "1px solid #1a73e8" : "1px solid #d6e4ff",
                              boxShadow: targetCar?.id === item.id
                                ? "0 6px 18px rgba(0, 64, 128, 0.15)"
                                : "0 4px 10px rgba(0, 64, 128, 0.04)",
                              cursor: "pointer",
                              transition: "all 0.25s ease",
                            }}
                            onMouseEnter={(e) => {
                              if (item.id !== targetCar?.id) {
                                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 64, 128, 0.12)";
                                e.currentTarget.style.transform = "translateY(-3px)";
                                e.currentTarget.style.background = "#eef5ff";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (item.id !== targetCar?.id) {
                                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 64, 128, 0.04)";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.background = "#f8faff";
                              }
                            }}
                            onClick={() =>
                              targetCar?.id === item.id ? setTargetCar(undefined) : setTargetCar(item)
                            }
                          >
                            <div style={{ fontWeight: 700, fontSize: 16, color: "#1d3b78" }}>
                              {`${item.model} (${item.manufacturer})`}
                            </div>
                            <div style={{ color: "#4f5d75", fontSize: 14, marginTop: 6 }}>
                              {item.plate}
                            </div>
                          </div>
                        </Col>

                      )) :
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            color: "#4f5d75",
                            fontWeight: 500,
                            fontSize: 16,
                            padding: "25px 0",
                            borderRadius: 10,
                            margin: "10px 0",
                          }}
                        >
                          <p>Khách hàng chưa có xe</p>
                          <div>
                            <AiOutlineDropbox size={30} />
                          </div>
                        </div>
                      }
                    </Row>
                  </div>
                  <div style={{ textAlign: "end", margin: "0 20px", padding: "10px 0" }}>
                    <Button type="orangeStyle" onClick={() => setStep(2)} disabled={!targetCustomer || !targetCar}>Tiếp tục <AiOutlineArrowRight /></Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          {/* /////// */}
          <div style={{
            margin: "50px 0",
            width: '100%',
            display: "flex",
            justifyContent: "center"
          }}>
            <div style={{
              width: 600
            }}>
              <FormRepairOrder targetCar={targetCar} targetCustomer={targetCustomer} setStep={setStep} />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default VehicleReception