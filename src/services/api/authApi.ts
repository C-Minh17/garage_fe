import axios from "../../utils/axios"
import { ipAuth } from "../../utils/ip"

const postAuthRegister = (data: MRegister.IRecord) => {
  const res = axios.post(ipAuth + "/register", data)
  return res
}

const postAuthLogin = (data: MLogin.IRecord) => {
  const res = axios.post(ipAuth + "/login", data)
  return res
}

const postAuthRegisterAdmin = (data: MRegister.IRecord) => {
  const res = axios.post(ipAuth + "/register-admin", data)
  return res
}

const postAuthLoginAdmin = (data: MLogin.IRecord) => {
  const res = axios.post(ipAuth + "/login-admin", data)
  return res
}

export {
  postAuthRegister,
  postAuthLogin,
  postAuthLoginAdmin,
  postAuthRegisterAdmin,
}