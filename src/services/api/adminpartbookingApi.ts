import axios from "../../utils/axios"
import { ipPartBooking } from "../../utils/ip"

const getPartBooking = async () => {
  const res = await axios.get(ipPartBooking)
  return res as ApiResponse<MPartBooking.IRecord[]>
}

const getPartBookingId = async (id: string) => {
  const res = await axios.get(`${ipPartBooking}/${id}`)
  return res as ApiResponse<MPartBooking.IRecord>
}

const postPartBooking = async (data: MPartBooking.IRequest) => {
  const res = await axios.post(`${ipPartBooking}/create`, data)
  return res as ApiResponse<MPartBooking.IRecord>
}

const confirmPartBooking = async (id: string) => {
  const res = await axios.put(`${ipPartBooking}/${id}/confirm`)
  return res as ApiResponse<MPartBooking.IRecord>
}

const deletePartBooking = async (id: string) => {
  const res = await axios.delete(`${ipPartBooking}/${id}`)
  return res as ApiResponse<null>
}

const deleteAllPartBookings = async () => {
  const res = await axios.delete(`${ipPartBooking}`)
  return res as ApiResponse<null>
}

const cancelPartBooking = async (id: string) => {
  const res = await axios.put(`${ipPartBooking}/${id}/cancel`)
  return res as ApiResponse<MPartBooking.IRecord>
}

const sortPartBooking = async (asc: boolean = false) => {
  const res = await axios.get(`${ipPartBooking}/sort`, { params: { asc } })
  return res as ApiResponse<MPartBooking.IRecord[]>
}

export {
  getPartBooking,
  getPartBookingId,
  postPartBooking,
  confirmPartBooking,
  deletePartBooking,
  sortPartBooking,
  deleteAllPartBookings,
  cancelPartBooking

}