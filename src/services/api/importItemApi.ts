import axios from "../../utils/axios"
import { ipImportItem } from "../../utils/ip"

const getPart = async () => {
  const res = await axios.get(ipImportItem)
  return res as ApiResponse<MPart.IRecord[]>
}

const getPartId = async (id: string) => {
  const res = await axios.get(`${ipImportItem}/${id}`)
  return res as ApiResponse<MPart.IRecord>
}

const postPart = async (data: MPart.IRecord) => {
  const res = await axios.post(ipImportItem, data)
  return res as ApiResponse<MPart.IRecord>
}

const putPart = async (id: string, data: MPart.IRecord) => {
  const res = await axios.put(`${ipImportItem}/${id}`, data)
  return res as ApiResponse<MPart.IRecord>
}

const deletePart = async (id: string) => {
  const res = await axios.delete(`${ipImportItem}/${id}`)
  return res as ApiResponse<null>
}

export {
  getPart,
  getPartId,
  postPart,
  putPart,
  deletePart
}