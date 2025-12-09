import { useState } from "react"
import { ColorStyle } from "../../styles/colors"

import ListCars from "./components/listCar"
import RepairCar from "./components/repairCar"

const Cars = () => {
  const [segmented, setSegmented] = useState<1 | 2>(1)

  const styleOp = {
    padding: "3px 14px",
    fontSize: 15,
    fontWeight: 500,
    borderRadius: 6,
    cursor: "pointer"
  }

  return (
    <>
      <h1 style={{
        fontSize: 35,
        marginTop: 10
      }}>Quản lý xe</h1>

      <p>Danh sách quản lý thông tin xe</p>

      <div>
        <div style={{
          display: "inline-flex",
          padding: 4,
          borderRadius: 8,
          backgroundColor: ColorStyle.BgSpotlight,
          marginLeft: 10
        }}>

          <div
            onClick={() => setSegmented(1)}
            style={{
              ...styleOp,
              backgroundColor: segmented === 1 ? "#fff" : "transparent",
            }}
          >
            Danh sách xe
          </div>

          <div
            onClick={() => setSegmented(2)}
            style={{
              ...styleOp,
              backgroundColor: segmented === 2 ? "#fff" : "transparent",
            }}
          >
            Danh sách xe đang sửa
          </div>

        </div>
      </div>

      <div>
        {segmented === 1 ? (
          <ListCars />
        ) : (
          <RepairCar />
        )}
      </div>
    </>
  )
}

export default Cars
