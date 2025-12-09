import { useState } from "react"
import axios from "../../utils/axios"
import { ipProfile } from "../../utils/ip"
import { getCookie } from "../../utils/cookie";

const useModelProfile = () => {
  const [isReload, setIsReload] = useState<boolean>(false)
  const token = getCookie('accessToken');

  const getProfile = async () => {
    const res = await axios.get(ipProfile)
    return res
  }

  const putProfile = async (data: MProfile.IRecord) => {
    const res = await axios.put(ipProfile, data)
    setIsReload(!isReload)
    return res
  }

  const putProfilePass = async (data: {
    oldPassword: string,
    newPassword: string
  }) => {
    const res = await axios.put(`${ipProfile}/password`, data)
    setIsReload(!isReload)
    return res
  }

  const postProfileAvatar = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(`${ipProfile}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    setIsReload(!isReload)
    return res
  }

  const deleteAvarta = async () => {
    const res = await axios.delete(`${ipProfile}/avatar`)
    setIsReload(!isReload)
    return res
  }

  const getProfileFieid = async (fieid: string) => {
    const res = await axios.get(`${ipProfile}/${fieid}`)
    return res
  }


  return {
    getProfile,
    getProfileFieid,
    putProfile,
    putProfilePass,
    postProfileAvatar,
    deleteAvarta,
    isReload
  }
}

export default useModelProfile