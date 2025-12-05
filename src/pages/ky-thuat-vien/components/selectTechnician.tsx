import { useEffect, useState } from "react";
import Select from "../../../components/Select"
import { getTechnicians } from "../../../services/api/techniciansApi";

const SelectTechnician = (props: {
  name: string,
  multiple?: boolean;
  placeholder?: string;
}) => {
  const { name, multiple, placeholder } = props
  const [data, setData] = useState<MTechnician.IRecord[]>([])


  const dataOptions = data?.map(item => ({
    label: `${item.name}(${item.techCode})`,
    value: item.id
  }))

  useEffect(() => {
    getTechnicians().then(res => setData(res.data ? res.data : []))
  }, [])


  return (
    <Select name={name} options={dataOptions} multiple={multiple} />
  )

}

export default SelectTechnician