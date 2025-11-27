import React, { useEffect, useRef, useState } from "react";
import "./assets/setting.scss";
import { getProfile, postProfileAvatar } from "../../services/api/profileApi";
import Button from "../../components/Button";
import BaseModal from "../../components/baseModal";
import FormProfile from "./components/formProfile";
import avatarDefaulf from "../../assets/user-default.jpg"


const Profile = () => {
  const [dataProfile, setDataProfile] = useState<MProfile.IRecord>()
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isReload, setIsReload] = useState<boolean>(false)
  const [lickAvatar, setLinkAvatar] = useState<any>()


  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = e.target.files?.[0];
    if (!fileObj) return;

  }

  useEffect(() => {
    getProfile().then(res => setDataProfile(res as any))
  }, [isReload])

  console.log(lickAvatar?.name)
  return (
    <>
      <BaseModal
        isOpen={isModal}
        closeModal={() => setIsModal(false)}
      >
        <FormProfile valueInitial={dataProfile} isReload={isReload} setIsModal={setIsModal} setIsReload={setIsReload} />
      </BaseModal>
      <div className="profile-page">
        <div className="profile-header card">
          <div className="avatar-box">
            <div className="avatar-wrapper">
              <img
                src={dataProfile?.avatar ? dataProfile.avatar : avatarDefaulf}
                alt="Avatar"
                className="avatar"
              />
              <div
                className="avatar-overlay"
                onChange={handleUploadAvatar}
              >
                <span className="edit-btn">Sửa</span>
                <input
                  type="file"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    const file = target.files?.[0];
                    setLinkAvatar(file);
                  }}
                />
              </div>
            </div>
            <div className="updateAt">Cập nhật gần nhất:{' '}
              {new Date(dataProfile?.updatedAt as string).toLocaleString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                // hour: "2-digit",
                // minute: "2-digit",
                // hour12: false
              })}</div>
          </div>
          <div className="basic-info">
            <h2>{dataProfile?.username}</h2>
            <p>Quản lý</p>
            <p>{dataProfile?.city}</p>
          </div>
        </div>

        <div className="profile-card card">
          <div className="card-header">
            <h3>Thông tin cá nhân</h3>
            <Button onClick={() => setIsModal(true)} type="gradientPrimary">Cập nhật </Button>
          </div>
          <div className="card-body info-grid">
            <div>
              <span>Họ và tên</span>
              <p>{dataProfile?.username}</p>
            </div>
            <div>
              <span>Ngày sinh</span>
              <p>{dataProfile?.birthday || <span style={{ color: '#b4b6bdff' }}>chưa cập nhật</span>}</p>
            </div>
            <div>
              <span>Giới tính</span>
              <p>{dataProfile?.gender || <span style={{ color: '#b4b6bdff' }}>chưa cập nhật</span>}</p>
            </div>
            <div>
              <span>Email</span>
              <p>{dataProfile?.email}</p>
            </div>
            <div>
              <span>Số điện thoại</span>
              <p>{dataProfile?.phonenumber}</p>
            </div>
            <div>
              <span>Thành phố</span>
              <p>{dataProfile?.city || <span style={{ color: '#b4b6bdff' }}>chưa cập nhật</span>}</p>
            </div>
            <div>
              <span>Quê quán</span>
              <p>{dataProfile?.hometown || <span style={{ color: '#b4b6bdff' }}>chưa cập nhật</span>}</p>
            </div>
            <div>
              <span>Địa chỉ hiện tại</span>
              <p>{dataProfile?.address || <span style={{ color: '#b4b6bdff' }}>chưa cập nhật</span>}</p>
            </div>
            <div>
              <span>Ngày tạo</span>
              <p>
                {new Date(dataProfile?.createdAt as string).toLocaleString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  // hour: "2-digit",
                  // minute: "2-digit",
                  // hour12: false
                })}
              </p>
            </div>
            <div>
              <span>Mô tả</span>
              <p>{dataProfile?.description || <span style={{ color: '#b4b6bdff' }}>chưa cập nhật</span>}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
