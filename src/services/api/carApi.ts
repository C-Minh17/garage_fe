import axios from '../../utils/axios';
import { ipCar } from '../../utils/ip';
import { ipCustomer } from '../../utils/ip';
interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  status?: number;
  data?: T;
}

const getCar = async (): Promise<ApiResponse<MCar.IResponse[]>> => {
  const res: any = await axios.get(ipCar);

  if (res.success && res.data) {
    return res as ApiResponse<MCar.IResponse[]>;
  }
  if (res.success) {
    const { success, ...dataObjects } = res;
    const dataArray = Object.values(dataObjects);
    return {
      data: dataArray as MCar.IResponse[],
      success: true
    };
  }

  return res as ApiResponse<MCar.IResponse[]>;
}

const getCarSorted = async (asc: boolean = true): Promise<ApiResponse<MCar.IResponse[]>> => {
  const res: any = await axios.get(`${ipCar}/sorted?asc=${asc}`);

  if (res.success && res.data) {
    return res as ApiResponse<MCar.IResponse[]>;
  }

  if (res.success) {
    const { success, ...dataObjects } = res;
    const dataArray = Object.values(dataObjects);

    return {
      data: dataArray as MCar.IResponse[],
      success: true
    };
  }

  return res as ApiResponse<MCar.IResponse[]>;
};
const searchCar = async (keyword: string): Promise<ApiResponse<MCar.IResponse[]>> => {
  const res: any = await axios.get(`${ipCar}/search?keyword=${keyword}`);
  
  if (res.success && res.data) {
    return res as ApiResponse<MCar.IResponse[]>;
  }
  if (res.success) {
    const { success, ...dataObjects } = res;
    const dataArray = Object.values(dataObjects);
    return { data: dataArray as MCar.IResponse[], success: true };
  }
  return res as ApiResponse<MCar.IResponse[]>;
}

const postCar = async (data: MCar.IRequest): Promise<ApiResponse<MCar.IResponse>> => {
  const res = await axios.post(ipCar, data);
  return res as ApiResponse<MCar.IResponse>;
}

const putCar = async (id: string, data: MCar.IRequest): Promise<ApiResponse<MCar.IResponse>> => {
  const res = await axios.put(`${ipCar}/${id}`, data);
  return res as ApiResponse<MCar.IResponse>;
}

const deleteCar = async (id: string): Promise<ApiResponse<string>> => {
  const res = await axios.delete(`${ipCar}/${id}`);
  return res as ApiResponse<string>;
}

export {
  getCar,
  postCar,
  putCar,
  deleteCar,
  getCarSorted,
  searchCar,
}