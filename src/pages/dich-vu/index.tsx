import { useEffect, useState } from "react"
import { getServices, delService, searchServices, sortServices } from "../../services/api/servicesApi"
import TableBase, { Column } from "../../components/BaseTable"
import Button from "../../components/Button"
import BaseModal from "../../components/baseModal"
import FormService from "./components/form"
import DetailService from "./components/detailService"
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineSearch, AiTwotoneCloseCircle, AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai"
import { Input } from "../../components/FormBase"
import { notify } from "../../components/Notification"
import { formatCurrency } from "../../utils/formatCurrency"
import { useBreakpoint } from "../../hooks/useBreakpoint"

const convertBrokenObjectToArray = (res: any): MService.IRecord[] => {
  if (!res) return []
  if (Array.isArray(res.data)) return res.data
  if (res.data && Array.isArray(res.data)) return res.data
  if (res.data && typeof res.data === 'object') {
    return Object.values(res.data)
  }

  if (typeof res === 'object') {
    const dataArray = Object.keys(res)
      .filter(key => !isNaN(Number(key)))
      .map(key => (res as any)[key]);
    return dataArray
  }
  return []
}

const Services = () => {
  const [dataService, setDataService] = useState<MService.IRecord[]>([])

  const [isModal, setIsModal] = useState(false)
  const [serviceEdit, setServiceEdit] = useState<MService.IRecord>()
  const [method, setMethod] = useState<"post" | "put">("post")

  const [isModalDel, setIsModalDel] = useState(false)
  const [serviceIdDel, setServiceIdDel] = useState<string>()

  const [isModalDetail, setIsModalDetail] = useState(false)
  const [dataDetail, setDataDetail] = useState<MService.IRecord>()

  const [isReload, setIsReload] = useState(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
  const [isDesc, setIsDesc] = useState<boolean>(true)
  const screen = useBreakpoint()
  const isMobile = screen.sm

  const Columns: Column<MService.IRecord>[] = [
    { title: "Mã dịch vụ", dataIndex: "serviceCode" },
    { title: "Tên dịch vụ", dataIndex: "name" },
    { title: "Giá (VNĐ)", dataIndex: "price", render: (value) => <div>{Number(value)?.toLocaleString()}</div> },
    {
      title: "Mô tả", dataIndex: "description", width: 180, render: (text: string) => {
        const max = 27;
        return text?.length > max ? text.slice(0, max) + "..." : text;
      }
    },
    {
      title: <div style={{ textAlign: "center" }}>Thao tác</div>,
      width: 100,
      render: (value, record, index) => (
        <div style={{ textAlign: "center", display: "flex", justifyContent: "center", gap: 5 }}>
          <Button onClick={() => { setDataDetail(record); setIsModalDetail(true) }} type="viewDetail" style={{ padding: 0, width: 23, height: 23 }}>
            <AiOutlineEye />
          </Button>

          <Button onClick={() => { setServiceIdDel(record?.id); setIsModalDel(true) }} type="error" style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            padding: "0", height: "23px", width: "23px"
          }}><AiOutlineDelete /></Button>

          <Button onClick={() => openModal(record, "put")} type="primary" style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            padding: "0", height: "23px", width: "23px"
          }}><AiOutlineEdit /></Button>
        </div>
      ),
    },
  ]

  const openModal = (record?: MService.IRecord, type?: "post" | "put") => {
    setServiceEdit(record ?? ({} as MService.IRecord))
    setMethod(type ?? "post")
    setIsModal(true)
  }

  const handleDelete = async (id?: string) => {
    if (!id) return

    const res = await delService(id)
    if (res?.success) {
      notify({ title: "Delete", type: "success", description: "Dịch vụ đã được xóa thành công" })
      setIsModalDel(false)
      setIsReload(!isReload)
    } else {
      notify({ title: "Error", type: "error", description: (res as any)?.message || "Xóa thất bại" })
    }
  }

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedSearchQuery(searchQuery), 500)
    return () => clearTimeout(timerId)
  }, [searchQuery])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res
        if (debouncedSearchQuery) {
          res = await searchServices(debouncedSearchQuery)
        } else {
          res = await sortServices(!isDesc)
        }

        const workingArray = convertBrokenObjectToArray(res)
        setDataService(workingArray)

      } catch (error) {
        console.error("Lỗi khi tải dữ liệu dịch vụ:", error)
        setDataService([])
      }
    }
    fetchData()
  }, [isReload, debouncedSearchQuery, isDesc])

  useEffect(() => {
    if (searchQuery) {
      setLoading(true)
      searchServices(searchQuery)
        .then(res => setDataService(convertBrokenObjectToArray(res)))
        .finally(() => setLoading(false))
    } else {
      setLoading(true)
      getServices()
        .then(res => setDataService(convertBrokenObjectToArray(res)))
        .finally(() => setLoading(false))
    }
  }, [searchQuery, isReload])


  return (
    <>
      <BaseModal isOpen={isModal} closeModal={() => setIsModal(false)}>
        <FormService valueInitial={serviceEdit} method={method} setIsModal={setIsModal} isReload={isReload} setIsReload={setIsReload} />
      </BaseModal>

      <BaseModal isOpen={isModalDetail} closeModal={() => setIsModalDetail(false)}>
        <DetailService data={dataDetail} />
      </BaseModal>

      <BaseModal isOpen={isModalDel} closeModal={() => setIsModalDel(false)}>
        <div style={{ textAlign: "center" }}>
          <AiTwotoneCloseCircle size={40} style={{ color: "red" }} />
          <h5>Are you sure?</h5>
          <p>Bạn có chắc chắn muốn xóa dịch vụ này?</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <Button onClick={() => setIsModalDel(false)}>Cancel</Button>
            <Button type="error" onClick={() => handleDelete(serviceIdDel)}>Confirm</Button>
          </div>
        </div>
      </BaseModal>

      <div style={{ display: !isMobile ? "block" : "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 10px" }}>
        <div>
          <h1 style={{ margin: 0 }}>Danh sách dịch vụ</h1>
          <div>Danh sách và thông tin dịch vụ</div>
        </div>
        <div style={{ textAlign: "end" }}>
          <Button onClick={() => openModal(undefined, "post")} style={{ padding: "10px 20px" }} type="gradientPrimary">
            + Thêm dịch vụ
          </Button>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "end", marginTop: 10, marginBottom: 10 }}>
        <Button onClick={() => setIsDesc(!isDesc)} type="dashed" style={{ marginRight: 10, display: 'flex', alignItems: 'center', gap: 5, height: 38 }}>
          {isDesc ? <AiOutlineSortDescending size={20} /> : <AiOutlineSortAscending size={20} />}
          {isDesc ? "Mới nhất" : "Cũ nhất"}
        </Button>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <AiOutlineSearch style={{ position: 'absolute', left: 15, zIndex: 1 }} />
          <Input
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 230, paddingLeft: 35, marginRight: 10, borderRadius: 7 }}
            placeholder="Tìm theo mã, tên..."
          />
        </div>
      </div>


      <TableBase columns={Columns} dataSource={dataService} loading={loading} />

    </>
  )
}

export default Services