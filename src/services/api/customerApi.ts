import axios from "../../utils/axios"
import { ipCustomer } from "../../utils/ip"

const getCustomers = async () => {
  const res = await axios.get(ipCustomer)
  return res as ApiResponse<MCustomer.IRecord[]>
}

const getCustomerSearch = async (query: any) => {
  const res = await axios.get(ipCustomer + `/search?keyword=${query}`)
  return res as ApiResponse<MCustomer.IRecord[]>
}

const getCustomerId = async (id: string) => {
  const res = await axios.get(ipCustomer + `/${id}`)
  return res as ApiResponse<MCustomer.IRecord>
}

const postCustomer = async (data: MCustomer.IRecord) => {
  const res = await axios.post(ipCustomer, data)
  return res as ApiResponse<MCustomer.IRecord>
}

const putCustomer = async (id: string, data: MCustomer.IRecord) => {
  const res = await axios.put(ipCustomer + `/${id}`, data)
  return res as ApiResponse<MCustomer.IRecord>
}

const delCustomer = async (id: string) => {
  const res = await axios.delete(ipCustomer + `/${id}`)
  return res as ApiResponse<null>
}

export {
  getCustomerId,
  getCustomers,
  postCustomer,
  putCustomer,
  delCustomer,
  getCustomerSearch
}

