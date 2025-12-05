import axios from "../../utils/axios"
import { ipSupplier } from "../../utils/ip"


const getSupplier = async () => {
  const res = await axios.get(`${ipSupplier}`)
  return res as ApiResponse<MSupplier.IRecord[]>
}

const getSupplierSearch = async (query: any) => {
  const res = await axios.get(`${ipSupplier}/search?keyword=${query}`)
  return res as ApiResponse<MSupplier.IRecord[]>
}

const getSupplierId = async (id: string) => {
  const res = await axios.get(`${ipSupplier}/${id}`)
  return res as ApiResponse<MSupplier.IRecord>
}

const putSupplier = async (id: string, data: MSupplier.IRecord) => {
  const res = await axios.put(`${ipSupplier}/${id}`, data)
  return res as ApiResponse<MSupplier.IRecord>
}

const postSupplier = async (data: MSupplier.IRecord) => {
  const res = await axios.post(`${ipSupplier}`, data)
  return res as ApiResponse<MSupplier.IRecord>
}

const deleteSupplier = async (id: string) => {
  const res = await axios.delete(`${ipSupplier}/${id}`)
  return res as ApiResponse<null>
}

export {
  getSupplier,
  getSupplierId,
  postSupplier,
  putSupplier,
  deleteSupplier,
  getSupplierSearch
}

