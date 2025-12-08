import { useEffect, useState } from "react"
import avatarDefaulf from "../../../assets/avatar-hai-1-1.jpg"
import { useNavigate } from "react-router"
import { ColorStyle } from "../../../styles/colors"
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai"
import useModelProfile from "../../../services/api/profileApi"
import { ipRootServer } from "../../../utils/ip"

const TagProfile = ({ logout }: { logout?: () => void }) => {
  const [dataProfile, setDataProfile] = useState<MProfile.IRecord>()
  const [isOpen, setIsOpen] = useState(false)
  const { getProfile, isReload } = useModelProfile()


  const navigate = useNavigate()

  useEffect(() => {
    getProfile().then(res => setDataProfile(res as any))
  }, [isReload])

  return (
    <div
      style={{
        position: 'relative',
        minWidth: "200px"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#ddd"
        setIsOpen(true)
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = ColorStyle.BgLayout
        setIsOpen(false)
      }}
    >
      <div
        style={{
          padding: '10px',
          borderRadius: '8px',
          width: 'fit-content',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            fontSize: '18px',
            color: '#fff',
            fontWeight: 'bold'
          }}>
            <img src={dataProfile?.avatar ? `${ipRootServer}${dataProfile.avatar}` : avatarDefaulf} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
            {dataProfile?.username}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "100%",
          right: 0,
          backgroundColor: "white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          borderRadius: "8px",
          padding: "8px 0",
          minWidth: "150px",
          zIndex: 100,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(-6px)",
          transition: "all 0.25s ease",
          width: "100%",
          pointerEvents: isOpen ? "auto" : "none"
        }}
      >
        <div
          style={{
            padding: "10px 16px",
            cursor: "pointer",
            color: "#333"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
          onClick={() => navigate("/settings")}
        >
          <AiOutlineUser /> Thông tin chi tiết
        </div>

        <div
          style={{
            padding: "10px 16px",
            cursor: "pointer",
            color: "red"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fff1f0")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
          onClick={() => {
            if (logout) logout();
            setIsOpen(false);
          }}
        >
          <AiOutlineLogout /> Đăng xuất
        </div>
      </div>
    </div>
  )
}

export default TagProfile