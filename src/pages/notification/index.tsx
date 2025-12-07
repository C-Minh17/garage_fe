import { useState } from "react"
import { ColorStyle } from "../../styles/colors"

const Notification = () => {
  const [segmented, setSegmented] = useState<1 | 2>(1)

  const styleOp = {
    padding: "0 14px",
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
      }}>Thông báo đặt lịch</h1>
      <p>-----------------</p>
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
          }}>Chưa duyệt</div>
          <div onClick={() => setSegmented(2)} style={{
            ...styleOp,
            backgroundColor: segmented === 2 ? "#fff" : "transparent",
          }}>Đã duyệt</div>
        </div>
      </div>
      <div>
        {segmented === 1 ?
          // <BillNotificationd />
          <div>11111</div>
          :
          // <HistoryNotification />
          <div>222222</div>
        }
      </div>
    </>
  )
}

export default Notification