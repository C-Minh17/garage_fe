import axios from "../../utils/axios"
import { ipImportItem } from "../../utils/ip"

const getImportItem = async () => {
  const res = await axios.get(ipImportItem)
  return res as ApiResponse<MImportItem.IRecord[]>
}

const getImportItemId = async (id: string) => {
  const res = await axios.get(`${ipImportItem}/${id}`)
  return res as ApiResponse<MImportItem.IRecord>
}

const postImportItem = async (data: MImportItem.IImportReq) => {
  const res = await axios.post(ipImportItem, data)
  return res as ApiResponse<MImportItem.IRecord>
}

const putImportItem = async (id: string, data: MImportItem.IImportReq) => {
  const res = await axios.put(`${ipImportItem}/${id}`, data)
  return res as ApiResponse<MImportItem.IRecord>
}

const deleteImportItem = async (id: string) => {
  const res = await axios.delete(`${ipImportItem}/${id}`)
  return res as ApiResponse<null>
}

export {
  getImportItem,
  getImportItemId,
  postImportItem,
  putImportItem,
  deleteImportItem
}