import axios from "../../utils/axios"
import { ipTechnician } from "../../utils/ip" 

interface ApiResponse<T = any> {
  success?: boolean
  message?: string
  status?: number
  data?: T
}

const getTechnicians = async (): Promise<ApiResponse<MTechnician.IRecord[]>> => {
  const res = await axios.get(ipTechnician)
  return res as ApiResponse<MTechnician.IRecord[]>
}

const sortTechnicians = async (asc: boolean = true): Promise<ApiResponse<MTechnician.IRecord[]>> => {
  const res = await axios.get(`${ipTechnician}/sort?asc=${asc}`);
  return res as ApiResponse<MTechnician.IRecord[]>;
}

const searchTechnicians = async (query: string): Promise<ApiResponse<MTechnician.IRecord[]>> => {
  const res = await axios.get(`${ipTechnician}/search?keyword=${query}`)
  return res as ApiResponse<MTechnician.IRecord[]>
}

const postTechnician = async (data: MTechnician.IRequest): Promise<ApiResponse<MTechnician.IRecord>> => {
  const res = await axios.post(ipTechnician, data)
  return res as ApiResponse<MTechnician.IRecord>
}

const putTechnician = async (id: string, data: MTechnician.IRequest): Promise<ApiResponse<MTechnician.IRecord>> => {
  const res = await axios.put(`${ipTechnician}/${id}`, data)
  return res as ApiResponse<MTechnician.IRecord>
}

const delTechnician = async (id: string): Promise<ApiResponse<null>> => {
  const res = await axios.delete(`${ipTechnician}/${id}`)
  return res as ApiResponse<null>
}

export {
  getTechnicians,
  postTechnician,
  putTechnician,
  delTechnician,
  searchTechnicians,
  sortTechnicians,
}