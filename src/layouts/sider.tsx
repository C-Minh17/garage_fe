import "./layout.scss";
import { Link, useLocation } from "react-router";
import { ColorStyle } from "../styles/colors";
import {
  AiOutlineAntDesign,
  AiOutlineDollar,
  AiOutlineHome,
  AiOutlineLineChart,
  AiOutlinePlusCircle,
  AiOutlineTeam,
  AiOutlineTool,
  AiOutlineCodeSandbox,
  AiOutlineBranches,
  AiOutlineCar,
  AiOutlineSetting,
  AiOutlineOpenAI,
} from "react-icons/ai";
import { useState } from "react";
import { useBreakpoint } from "../hooks/useBreakpoint";

const SiderManage = ({ isSider, setIsSider }: { isSider: boolean, setIsSider?: (a: boolean) => void }) => {
  const styleLink = {
    display: "flex",
    alignItems: "center",
    justifyContent: isSider ? "" : "center",
    gap: isSider ? "10px" : "0",
    padding: "10px 14px",
    borderRadius: "8px",
    color: ColorStyle.SidebarForeground,
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "14px",
    transition: ColorStyle.TransitionSmooth,
  };

  const styleLinkHover = {
    backgroundColor: ColorStyle.PrimaryHoverUi,
  };

  const styleLinkActive = {
    backgroundColor: ColorStyle.SidebarRing,
    boxShadow: ColorStyle.ShadowPrimary,
    fontWeight: 600,
  };

  const location = useLocation();
  const [hovered, setHovered] = useState("");
  const screen = useBreakpoint()
  const isMobile = screen.sm

  return (
    <>
      {!isMobile ? isSider ?
        <div
          className="overlay"
          onClick={() => { setIsSider?.(false) }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 100000,
          }}
        /> : <></> : <></>
      }
      <div
        className={`sider-manage ${isSider ? "expanded" : "collapsed"}`}
        style={{
          width: isSider ? 250 : 80,
          backgroundColor: ColorStyle.SidebarBackground,
          height: "100vh",
          transition: "all 0.3s ease",
          position: "fixed",
          zIndex: 1000000,
          top: "0",
          left: !isMobile ? isSider ? 0 : -80 : 0
        }}
      >
        <div
          style={{
            height: "65px",
            borderBottom: `1px solid ${ColorStyle.SidebarBorder}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: ColorStyle.SidebarForeground,
          }}
        >
          <AiOutlineOpenAI size={40} />{" "}
          <span style={{ fontSize: 19 }} className="logo-text">{isSider ? "Auto Pro" : ""}</span>
        </div>

        <div style={{ padding: "10px" }}>
          <div>
            <div className={`menu-section-title ${isSider ? "expanded" : "collapsed"}`}>Menu chính</div>
            {[
              { to: "/", icon: <AiOutlineHome size={18} />, label: "Tổng quan" },
              { to: "/vehiclereception", icon: <AiOutlinePlusCircle size={18} />, label: "Tiếp nhận xe" },
              { to: "/payment", icon: <AiOutlineDollar size={18} />, label: "Thanh toán" },
              { to: "/statistical", icon: <AiOutlineLineChart size={18} />, label: "Thống kê" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  ...styleLink,
                  ...(hovered === item.to ? styleLinkHover : {}),
                  ...(location.pathname === item.to ? styleLinkActive : {}),
                }}
                onMouseEnter={() => setHovered(item.to)}
                onMouseLeave={() => setHovered("")}
              >
                {item.icon}
                <span className="menu-label">{isSider ? item.label : ""}</span>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: "20px" }}>
            <div className={`menu-section-title ${isSider ? "expanded" : "collapsed"}`}>Quản lý</div>
            {[
              { to: "/customers", icon: <AiOutlineTeam size={18} />, label: "Khách hàng" },
              { to: "/cars", icon: <AiOutlineCar size={18} />, label: "Xe" },
              { to: "/services", icon: <AiOutlineTool size={18} />, label: "Dịch vụ" },
              { to: "/parts", icon: <AiOutlineCodeSandbox size={18} />, label: "Phụ tùng" },
              { to: "/technicians", icon: <AiOutlineBranches size={18} />, label: "Kỹ thuật viên" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  ...styleLink,
                  ...(hovered === item.to ? styleLinkHover : {}),
                  ...(location.pathname === item.to ? styleLinkActive : {}),
                }}
                onMouseEnter={() => setHovered(item.to)}
                onMouseLeave={() => setHovered("")}
              >
                {item.icon}
                <span className="menu-label">{isSider ? item.label : ""}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SiderManage;
