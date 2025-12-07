import { useEffect, useState } from "react"
import BaseModal from "../../components/baseModal"
import Button from "../../components/Button"
import TableBase, { Column, ITableBase } from "../../components/BaseTable"
import Form, { Input } from "../../components/FormBase";
import { getCustomers } from "../../services/api/customerApi";
import { notify } from "../../components/Notification";
import Select from "../../components/Select";
import SelectSupplier from "../phu-tung/components/selectSupplier";
import Drawer from "../../components/draw.tsx";
import Notification from "../notification";


const DashBoard = () => {
  const [is, setIs] = useState(false)
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)

  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    getCustomers().then(res => { setData(res?.data) })
  }, [])

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "rhre", label: "Gjhjrape" },
    { value: "hhhhnh", label: "Grjhjape" },
    { value: "nhngn", label: "Grakkpe" },
    { value: "grnjhjape", label: "Gra,,,pe" },
    { value: "grahh pe", label: "Grapmbe" },
  ];

  const onSub = (value: any) => {
    console.log(value)
  }

  return (
    <div>
      <Drawer
        visible={open2}
        onClose={() => setOpen2(false)}
        width={400}
      >
        <div style={{ padding: 20 }}>
          <Notification />
        </div>
      </Drawer>

      <div><Button onClick={() => setOpen2(true)}>Thông báo</Button></div>

    </div>
  )
}

export default DashBoard