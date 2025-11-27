import { useEffect, useState } from "react"
import { delCustomer, getCustomers, getCustomerSearch } from "../../services/api/customerApi"
import TableBase, { Column } from "../../components/BaseTable"
import Button from "../../components/Button"
import Tag from "../../components/Tag"
import BaseModal from "../../components/baseModal"
import FormCustomer from "./components/form"
import DetailCustomer from "./components/detailCustomer"
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineSearch } from "react-icons/ai"
import { Input } from "../../components/FormBase"
import { notify } from "../../components/Notification"
import ConfirmDelete from "../../components/confirmDelete"


const Customers = () => {
  const [dataCustomer, setDataCustomer] = useState<MCustomer.IRecord[]>([])
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isModalCar, setIsModalCar] = useState<boolean>(false)
  const [isModalDel, setIsModalDel] = useState<boolean>(false)
  const [isModalDetail, setIsModalDetail] = useState<boolean>(false)
  const [dataCustomerId, setDataCustomerId] = useState<MCustomer.IRecord>()
  const [dataCar, setDataCar] = useState<any[]>([])
  const [method, setMethod] = useState<"post" | "put">("post")
  const [isReload, setIsReload] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [idKHdel, setIdKHdel] = useState<string>()
  const [querySearch, setQuerySearch] = useState<any>()

  const Columns: Column<MCustomer.IRecord>[] = [
    {
      title: "MÃ KH",
      dataIndex: "customerCode",
      render: (value) => <div>{value}</div>
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      render: (value) => <div>{value}</div>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      render: (value) => <div>{value}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (value) => <div>{value}</div>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      render: (value) => <div>{value}</div>,
    },
    {
      title: "Số xe",
      dataIndex: "cars",
      render: (value, record) => (
        <Tag
          style={{ width: 45, hoverPointer: true }}
          onClick={() => {
            setDataCar(record.cars as any[])
            setIsModalCar(true)
          }}
        >{record.cars?.length ?? 0} xe</Tag>
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      render: (value) => <div style={{ minWidth: "150px" }}>{value}</div>,
    },
    {
      title: <div style={{ textAlign: "center" }}>Thao tác</div>,
      render: (value, record) => (
        <div style={{ textAlign: "center", display: "flex", justifyContent: "center", gap: 5 }}>
          <Button onClick={() => { setDataCustomerId(record); setIsModalDetail(true) }} type="viewDetail" style={{ padding: 0, width: 23, height: 23 }}>
            <AiOutlineEye />
          </Button>

          <Button onClick={() => { setIdKHdel(record?.id); setIsModalDel(true) }} type="error" style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            padding: "0", height: "23px", width: "23px"
          }}><AiOutlineDelete /></Button>

          <Button onClick={() => setModal(record, "put")} type="primary" style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            padding: "0", height: "23px", width: "23px"
          }}><AiOutlineEdit /></Button>
        </div>
      ),
    },
  ]

  const columnsCar: Column<any>[] = [
    {
      title: "Biển số",
      dataIndex: "plate"
    },
    {
      title: "Kiểu xe",
      dataIndex: "model"
    },
    {
      title: "Hãng xe",
      dataIndex: "manufacturer"
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: 180,
      render: (text: string) => {
        const max = 60;
        return text?.length > max ? text.slice(0, max) + "..." : text;
      }
    },
    // {
    //   title: "Thao tác",
    //   width: 80,
    //   render: (value, record) => (
    //     <div style={{ textAlign: "center", display: "flex", justifyContent: "center", gap: 5 }}>
    //       <Button onClick={() => { setIdKHdel(record?.id); setIsModalDel(true) }} type="error" style={{
    //         display: "flex", justifyContent: "center", alignItems: "center",
    //         padding: "0", height: "23px", width: "23px"
    //       }}><AiOutlineDelete /></Button>
    //       <Button onClick={() => setModal(record, "put")} type="primary" style={{
    //         display: "flex", justifyContent: "center", alignItems: "center",
    //         padding: "0", height: "23px", width: "23px"
    //       }}><AiOutlineEdit /></Button>
    //     </div>
    //   ),
    // },
  ]

  const delModal = async (id: any) => {
    const res = await delCustomer(id)
    if (!res.status) {
      notify({ title: "Delete", type: "success", description: "Thông tin khách hàng đã được xóa thành công" })
      setIsModalDel(false)
      setIsReload(!isReload)
    } else {
      notify({ title: "Delete", type: "error", description: "Xóa thông tin khách hàng không thành công" })
      setIsModalDel(false)
      setIsReload(!isReload)
    }
  }

  const setModal = (data?: MCustomer.IRecord, method?: "post" | "put") => {
    setDataCustomerId(data)
    setMethod(method || "post")
    setIsModal(true)
  }

  useEffect(() => {
    if (querySearch) {
      setLoading(true)
      getCustomerSearch(querySearch)
        .then(res => setDataCustomer(res?.data))
        .finally(() => setLoading(false))
    } else {
      setLoading(true)
      getCustomers()
        .then(res => setDataCustomer(res?.data))
        .finally(() => setLoading(false))
    }

  }, [isReload, querySearch])

  return (
    <>
      <BaseModal isOpen={isModal} closeModal={() => setIsModal(false)}>
        <FormCustomer isReload={isReload} setIsReload={setIsReload} valueInitial={dataCustomerId} method={method} setIsModal={setIsModal} />
      </BaseModal>

      <BaseModal isOpen={isModalDetail} closeModal={() => setIsModalDetail(false)}>
        <DetailCustomer data={dataCustomerId} />
      </BaseModal>

      <BaseModal isOpen={isModalCar} closeModal={() => setIsModalCar(false)}>
        <div style={{ width: 700 }}>
          <h4>Danh sách xe của khách hàng</h4>
          <TableBase columns={columnsCar} dataSource={dataCar} pageSize={5} />
        </div>
      </BaseModal>

      <BaseModal isOpen={isModalDel} closeModal={() => setIsModalDel(false)}>
        <ConfirmDelete onCancel={() => setIsModalDel(false)} onConfirm={() => delModal(idKHdel)} />
      </BaseModal>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 10px" }}>
        <div>
          <h1 style={{ margin: "0" }}>Danh sách khách hàng</h1>
          <div>Danh sách và thông tin khách hàng</div>
        </div>
        <div>
          <Button onClick={() => setModal(undefined, 'post')} style={{ padding: "10px 20px" }} type="gradientPrimary">+ Thêm khách hàng</Button>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
        <AiOutlineSearch />
        <Input
          name="search"
          style={{ width: 230, margin: "10px 10px", marginRight: "25px ", borderRadius: 7 }}
          placeholder="Tìm theo tên, sdt, ..."
          onChange={pre => setQuerySearch(pre.target.value)}
        />
      </div>

      <TableBase columns={Columns} dataSource={dataCustomer} loading={loading} />
    </>
  )
}

export default Customers