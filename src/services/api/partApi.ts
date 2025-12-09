import axios from "../../utils/axios"
import { ipPart } from "../../utils/ip"


const getPart = async () => {
  const res = await axios.get(ipPart)
  return res as ApiResponse<MPart.IRecord[]>
}

const getPartId = async (id: string) => {
  const res = await axios.get(`${ipPart}/${id}`)
  return res as ApiResponse<MPart.IRecord>
}

const postPart = async (data: MPart.IRecord) => {
  const res = await axios.post(ipPart, data)
  return res as ApiResponse<MPart.IRecord>
}

const putPart = async (id: string, data: MPart.IRecord) => {
  const res = await axios.put(`${ipPart}/${id}`, data)
  return res as ApiResponse<MPart.IRecord>
}

const deletePart = async (id: string) => {
  const res = await axios.delete(`${ipPart}/${id}`)
  return res as ApiResponse<null>
}

const getPartSearch = async (query: any) => {
  const res = await axios.get(`${ipPart}/search?keyword=${query}`)
  return res as ApiResponse<MPart.IRecord[]>
}

export {
  getPart,
  getPartId,
  postPart,
  putPart,
  deletePart,
  getPartSearch,
}