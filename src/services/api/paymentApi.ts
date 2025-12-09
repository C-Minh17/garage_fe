import axios from "../../utils/axios"
import { ipPayment } from "../../utils/ip"

const getPayment = async () => {
  const res = await axios.get(ipPayment)
  return res as ApiResponse<MPayment.IRecord[]>
}

const getPaymentId = async (id: string) => {
  const res = await axios.get(`${ipPayment}/${id}`)
  return res as ApiResponse<MPayment.IRecord>
}

const putPayment = async (id: string, data: MPayment.IRecord) => {
  const res = await axios.put(`${ipPayment}/${id}`, data)
  return res as ApiResponse<MPayment.IRecord>
}

const deletePayment = async (id: string) => {
  const res = await axios.delete(`${ipPayment}/${id}`)
  return res as ApiResponse<MPayment.IRecord>
}

const postPayment = async (data: any) => {
  const res = await axios.post(ipPayment, data)
  return res as ApiResponse<MPayment.IRecord>
}

export {
  getPayment,
  getPaymentId,
  putPayment,
  postPayment,
  deletePayment,
}
