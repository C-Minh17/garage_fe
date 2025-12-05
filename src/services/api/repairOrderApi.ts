import axios from "../../utils/axios"
import { ipRepairOrder } from "../../utils/ip"

const getRepairOrderId = async (id: string) => {
  const res = await axios.get(`${ipRepairOrder}/${id}`)
  return res as ApiResponse<MRepairOrder.IRecord>
}

const getRepairOrder = async () => {
  const res = await axios.get(`${ipRepairOrder}`)
  return res as ApiResponse<MRepairOrder.IRecord[]>
}

const getRepairOrderItem = async (id: string) => {
  const res = await axios.get(`${ipRepairOrder}/${id}/items`)
  return res as ApiResponse<MRepairOrder.IParts[]>
}

const postRepairOrder = async (data: any) => {
  const res = await axios.post(`${ipRepairOrder}`, data)
  return res as ApiResponse<MRepairOrder.IRecord>
}

const postRepairOrderItem = async (id: string, data: MRepairOrder.IRecord) => {
  const res = await axios.post(`${ipRepairOrder}/${id}/items`, data)
  return res as ApiResponse<MRepairOrder.IRecord>
}

const putRepairOrder = async (id: string, data: MRepairOrder.IRecord) => {
  const res = await axios.put(`${ipRepairOrder}/${id}`, data)
  return res as ApiResponse<MRepairOrder.IRecord>
}

const putRepairOrderPay = async (id: string) => {
  const res = await axios.put(`${ipRepairOrder}/${id}/pay`)
  return res as ApiResponse<MRepairOrder.IRecord>
}

const putRepairOrderComplete = async (id: string) => {
  const res = await axios.put(`${ipRepairOrder}/${id}/complete`)
  return res as ApiResponse<MRepairOrder.IRecord>
}

const putRepairOrderItem = async (id: string, data: MRepairOrder.IParts) => {
  const res = await axios.put(`${ipRepairOrder}/${id}`, data)
  return res as ApiResponse<MRepairOrder.IParts>
}

const deleteRepairOrder = async (id: string) => {
  const res = await axios.delete(`${ipRepairOrder}/${id}`)
  return res as ApiResponse<null>
}

const deleteRepairOrderItem = async (id: string, idItem: string) => {
  const res = await axios.delete(`${ipRepairOrder}/${id}/items/${idItem}`)
  return res as ApiResponse<null>
}

export {
  getRepairOrder,
  getRepairOrderId,
  getRepairOrderItem,
  postRepairOrder,
  postRepairOrderItem,
  putRepairOrder,
  putRepairOrderComplete,
  putRepairOrderItem,
  putRepairOrderPay,
  deleteRepairOrder,
  deleteRepairOrderItem,
}