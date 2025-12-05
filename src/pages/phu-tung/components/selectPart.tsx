import { useEffect, useState } from "react";
import Select from "../../../components/Select"
import { getSupplier } from "../../../services/api/supplierApi";
import { getPart } from "../../../services/api/partApi";

const SelectPart = (props: {
  name: string,
  multiple?: boolean;
  placeholder?: string;
}) => {
  const { name, multiple, placeholder } = props
  const [data, setData] = useState<MPart.IRecord[]>([])


  const dataOptions = data?.map(item => ({
    label: `${item.name}(${item.partCode})`,
    value: `${item.id}&&${item.name}&&${item.price}`
  }))

  useEffect(() => {
    getPart().then(res => setData(res.data ? res.data : []))
  }, [])


  return (
    <Select name={name} options={dataOptions} />
  )

}

export default SelectPart