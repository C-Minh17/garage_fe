import { useState } from "react";
import { ColorStyle } from "../styles/colors"
import { AiOutlineMenu, AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { useBreakpoint } from "../hooks/useBreakpoint";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { deleteCookie, getCookie } from "../utils/cookie";
import { notify } from "../components/Notification";
import TagProfile from "../pages/settings/components/tagProfile";

const HeaderManage = (
  {
    setIsSider,
    isSider
  }:
    {
      setIsSider?: (a: boolean) => void
      isSider?: boolean
    }) => {

  const screen = useBreakpoint()
  const isMobile = screen.sm
  const navigate = useNavigate()
  const token = getCookie("refreshToken")

  const logout = () => {
    deleteCookie("accessToken")
    deleteCookie("refreshToken")
    notify({ title: "Success", type: "success", description: "Đăng xuất thành công" })
    navigate("/login")
  }

  return (
    <>
      <div
        style={{
          display: "block",
          backgroundColor: ColorStyle.BgLayout,
          position: "fixed",
          top: "0",
          right: "0",
          width: "100%",
          borderBottom: `1px solid ${ColorStyle.Border}`,
          zIndex: 10000,
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "65px",
            padding: "0 30px",
            marginLeft: !isMobile ? "0" : isSider ? "250px" : "80px",
            transition: "margin-left 0.3s ease",
          }}
        >
          <div
            onClick={() => setIsSider?.(!isSider)}
          >
            {!isMobile ? <AiOutlineMenu /> : isSider ? <AiOutlineMenuFold size={23} /> : <AiOutlineMenuUnfold size={23} />}
          </div>
          <div>
            {/* <Button onClick={() => logout()}>Đăng xuất</Button> */}
            <TagProfile logout={logout} />
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderManage