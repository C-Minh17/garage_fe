import axios from "../../utils/axios"
import { ipProfile } from "../../utils/ip"

const getProfile = async () => {
  const res = await axios.get(ipProfile)
  return res
}

const putProfile = async (data: MProfile.IRecord) => {
  const res = await axios.put(ipProfile, data)
  return res
}

const putProfilePass = async (data: {
  oldPassword: string,
  newPassword: string
}) => {
  const res = await axios.put(`${ipProfile}/password`, data)
  return res
}

const postProfilePass = async (data: {
  file: string
}) => {
  const res = await axios.post(`${ipProfile}/avatar`, data)
  return res
}

const deleteAvarta = async () => {
  const res = await axios.delete(`${ipProfile}/avatar`)
  return res
}

const getProfileFieid = async (fieid: string) => {
  const res = await axios.get(`${ipProfile}/${fieid}`)
  return res
}


export {
  getProfile,
  getProfileFieid,
  putProfile,
  putProfilePass,
  postProfilePass,
  deleteAvarta,
}