import axios from "../../utils/axios"
import { ipService } from "../../utils/ip"

interface ApiResponse<T = any> {
  success?: boolean
  message?: string
  status?: number
  data?: T
}

const getServices = async (): Promise<ApiResponse<MService.IRecord[]>> => {
  const res = await axios.get(ipService)
  return res as ApiResponse<MService.IRecord[]>
}

const sortServices = async (asc: boolean = false): Promise<ApiResponse<MService.IRecord[]>> => {
  const res = await axios.get(`${ipService}/sort?asc=${asc}`)
  return res as ApiResponse<MService.IRecord[]>
}

const getServiceId = async (id: string): Promise<ApiResponse<MService.IRecord>> => {
  const res = await axios.get(`${ipService}/${id}`)
  return res as ApiResponse<MService.IRecord>
}

const searchServices = async (query: string): Promise<ApiResponse<MService.IRecord[]>> => {
  const res = await axios.get(`${ipService}/search?name=${query}&serviceCode=${query}`)
  return res as ApiResponse<MService.IRecord[]>
}

const postService = async (data: MService.IRecord): Promise<ApiResponse<MService.IRecord>> => {
  const res = await axios.post(ipService, data)
  return res as ApiResponse<MService.IRecord>
}

const putService = async (id: string, data: MService.IRecord): Promise<ApiResponse<MService.IRecord>> => {
  const res = await axios.put(`${ipService}/${id}`, data)
  return res as ApiResponse<MService.IRecord>
}

const delService = async (id: string): Promise<ApiResponse<null>> => {
  const res = await axios.delete(`${ipService}/${id}`)
  return res as ApiResponse<null>
}

export {
  getServices,
  getServiceId,
  searchServices,
  postService,
  putService,
  delService,
  sortServices
}