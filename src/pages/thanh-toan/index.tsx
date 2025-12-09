import { useState } from "react"
import { ColorStyle } from "../../styles/colors"
import BillPaymentd from "./components/billPayment"
import HistoryPayment from "./components/historyPayment"

const Payment = () => {
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: '700', color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
          Quản lý hóa đơn
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
          Theo dõi trạng thái thanh toán và lịch sử giao dịch chi tiết
        </p>
      </div>
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
          }}>Hóa đơn</div>
          <div onClick={() => setSegmented(2)} style={{
            ...styleOp,
            backgroundColor: segmented === 2 ? "#fff" : "transparent",
          }}>Lịch sử thanh toán</div>
        </div>
      </div>
      <div>
        {segmented === 1 ?
          <BillPaymentd />
          : <HistoryPayment />
        }
      </div>
    </>
  )
}

export default Payment