import { useEffect, useState } from "react"
import { ColorStyle } from "../../styles/colors"
import Drawer from "../../components/draw.tsx"
import Button from "../../components/Button"
import { getNotifications, getNotificationsCancelled, getNotificationsConfirmed, getNotificationsPending } from "../../services/api/notificationApi"
import NotificationList from "./components/listNotify"
import { AiOutlineSchedule } from "react-icons/ai"

const Notification = () => {
  const [tab, setTab] = useState<1 | 2 | 3>(1)
  const [open2, setOpen2] = useState<boolean>(false);
  const [dataNotify, setDataNotify] = useState<MNotification.IRecord[]>([])
  const [dataNotifyPending, setDataNotifyPending] = useState<MNotification.IRecord[]>([])
  const [dataNotifyConfirm, setDataNotifyConfirm] = useState<MNotification.IRecord[]>([])
  const [dataNotifyCancel, setDataNotifyCancel] = useState<MNotification.IRecord[]>([])
  const [isReload, setIsReaload] = useState<boolean>(false);

  useEffect(() => {
    getNotifications().then(res => setDataNotify(res.data ? res.data : []))
    getNotificationsPending().then(res => setDataNotifyPending(res.data ? res.data : []))
    getNotificationsCancelled().then(res => setDataNotifyCancel(res.data ? res.data : []))
    getNotificationsConfirmed().then(res => setDataNotifyConfirm(res.data ? res.data : []))
  }, [isReload])


  return (
    <>
      <Drawer
        visible={open2}
        onClose={() => setOpen2(false)}
        width={400}
      >
        <div style={{
          padding: "10px 20px"
        }}>
          <h1 style={{
            fontSize: 30,
            marginTop: 10
          }}>Thông tin đặt lịch</h1>
          <p>-----------------</p>
          <div
            style={{
              display: "flex",
              gap: 20,
              borderBottom: "1px solid #f0f0f0",
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            <div
              onClick={() => setTab(1)}
              style={{
                paddingBottom: 8,
                cursor: "pointer",
                color: tab === 1 ? "#1677ff" : "rgba(0,0,0,0.85)",
                borderBottom: tab === 1 ? "2px solid #1677ff" : "2px solid transparent",
                transition: "0.2s",
                fontSize: 16,
              }}
            >
              Chờ xử lý
            </div>

            <div
              onClick={() => setTab(2)}
              style={{
                paddingBottom: 8,
                cursor: "pointer",
                color: tab === 2 ? "#1677ff" : "rgba(0,0,0,0.85)",
                borderBottom: tab === 2 ? "2px solid #1677ff" : "2px solid transparent",
                transition: "0.2s",
                fontSize: 16,
              }}
            >
              Đã xác nhận
            </div>

            <div
              onClick={() => setTab(3)}
              style={{
                paddingBottom: 8,
                cursor: "pointer",
                color: tab === 3 ? "#1677ff" : "rgba(0,0,0,0.85)",
                borderBottom: tab === 3 ? "2px solid #1677ff" : "2px solid transparent",
                transition: "0.2s",
                fontSize: 16,
              }}
            >
              Đã bị hủy
            </div>
          </div>
          <div>
            {tab === 1
              ? <NotificationList isReload={isReload} setIsReaload={setIsReaload} list={dataNotifyPending} />
              : tab === 2
                ? <NotificationList isReload={isReload} setIsReaload={setIsReaload} list={dataNotifyConfirm} />
                : <NotificationList isReload={isReload} setIsReaload={setIsReaload} list={dataNotifyCancel} />
            }
          </div>
        </div>
      </Drawer>

      <div style={{ position: "relative", display: "inline-block" }}>
        <Button
          onClick={() => setOpen2(true)}
          style={{ borderRadius: "5px", marginRight: "10px", width: 35, height: 35, display: "flex", justifyContent: "center", alignItems: "center", padding: "0" }}
        >
          <AiOutlineSchedule size={20} />
        </Button>
        {
          dataNotify.filter(item => item.read === false).length !== 0 ?
            <span
              style={{
                position: "absolute",
                top: -4,
                right: 2,
                background: "#ff4d4f",
                color: "white",
                borderRadius: "50%",
                padding: "0 6px",
                fontSize: 12,
                lineHeight: "18px",
                minWidth: 18,
                height: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 500,
              }}
            >
              {dataNotify.filter(item => item.read === false).length !== 0 ? dataNotify.filter(item => item.read === false).length : ""}
            </span> : <></>
        }

      </div>

    </>
  )
}

export default Notification