import axios from "../../utils/axios"
import { ipNotification } from "../../utils/ip"


const getNotifications = async () => {
  const res = await axios.get(ipNotification)
  return res as ApiResponse<MNotification.IRecord[]>
}

const getNotificationsPending = async () => {
  const res = await axios.get(`${ipNotification}/pending`)
  return res as ApiResponse<MNotification.IRecord[]>
}

const getNotificationsConfirmed = async () => {
  const res = await axios.get(`${ipNotification}/confirmed`)
  return res as ApiResponse<MNotification.IRecord[]>
}

const getNotificationsCancelled = async () => {
  const res = await axios.get(`${ipNotification}/cancelled`)
  return res as ApiResponse<MNotification.IRecord[]>
}

const putNotificationsRead = async (id: string) => {
  const res = await axios.put(`${ipNotification}/${id}/read`)
  return res as ApiResponse<MNotification.IRecord[]>
}

const putNotificationsCancelled = async (id: string) => {
  const res = await axios.put(`${ipNotification}/${id}/cancel`)
  return res as ApiResponse<MNotification.IRecord>
}

const putNotificationsConfirmed = async (id: string) => {
  const res = await axios.put(`${ipNotification}/${id}/confirm`)
  return res as ApiResponse<MNotification.IRecord>
}

export {
  getNotifications,
  getNotificationsCancelled,
  getNotificationsConfirmed,
  getNotificationsPending,
  putNotificationsRead,
  putNotificationsCancelled,
  putNotificationsConfirmed
}