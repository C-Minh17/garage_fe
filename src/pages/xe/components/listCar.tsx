import { AiOutlineDelete, AiOutlineEdit, AiOutlineSearch, AiOutlineEye, AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai"
import Button from "../../../components/Button"
import { Input } from "../../../components/FormBase"
import TableBase, { Column } from "../../../components/BaseTable"
import { useEffect, useState } from "react"
import BaseModal from "../../../components/baseModal"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { notify } from "../../../components/Notification"
import { ColorStyle } from "../../../styles/colors"
import DetailCar from "./detailCar"
import { deleteCar, getCarSorted, searchCar } from "../../../services/api/carApi"
import FormCar from "./formlistcar"

const ListCars = () => {

  const [dataCar, setDataCar] = useState<MCar.IResponse[]>([])
  const [isModalDetail, setIsModalDetail] = useState<boolean>(false)
  const [isReload, setIsReload] = useState<boolean>(false)
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isModalDel, setIsModalDel] = useState<boolean>(false)
  const [idCarDel, setIdCarDel] = useState<string>("")
  const [method, setMethod] = useState<"post" | "put">("post")
  const [dataCarId, setDataCarId] = useState<MCar.IResponse>()
  const [loading, setLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>("")
  const [debouncedSearch, setDebouncedSearch] = useState<string>("")
  const [isDesc, setIsDesc] = useState<boolean>(true)

  const columns: Column<MCar.IResponse>[] = [
    { title: "Mã KH", dataIndex: "customerCode", width: 120 },
    { title: "Biển số xe", dataIndex: "plate", width: 120 },
    { title: "Hãng xe", dataIndex: "manufacturer", width: 150 },
    { title: "Mẫu xe", dataIndex: "model", width: 150 },
    { title: "Mô tả lỗi/tình trạng", dataIndex: "description", width: 300 },
    { 
      title: "Trạng thái", 
      dataIndex: "active", 
      width: 150,
      render: (active: boolean) => (
        <div style={{
            display: 'inline-block',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            backgroundColor: active ? '#f6ffed' : '#fff7e6',
            color: active ? ColorStyle.Primary : '#faad14',
            border: `1px solid ${active ? ColorStyle.Primary : '#ffd591'}`
        }}>
            {active ? "Chờ thanh toán" : "Đang sửa chữa"}
        </div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>Thao tác</div>,
      width: 80,
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 5 }}>
          <Button onClick={() => { setDataCarId(record); setIsModalDetail(true) }} type="viewDetail" style={{ padding: 0, width: 23, height: 23 }}>
            <AiOutlineEye />
          </Button>
          <Button onClick={() => { setIdCarDel(record.id); setIsModalDel(true); }} type="error" style={{ padding: 0, width: 23, height: 23 }}>
            <AiOutlineDelete />
          </Button>
          <Button onClick={() => setModal(record, "put")} type="primary" style={{ padding: 0, width: 23, height: 23 }}>
            <AiOutlineEdit />
          </Button>
        </div>
      )
    },
  ]

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedSearch(search), 500)
    return () => clearTimeout(timerId)
  }, [search])

  const fetchCars = async () => {
    setLoading(true) 
    try {
      let res
      if (debouncedSearch) {
        res = await searchCar(debouncedSearch)
      } else {
        res = await getCarSorted(!isDesc)
      }

      const list = res.data ?? []
      setDataCar(list)
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu xe:", error)
      setDataCar([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCars()
  }, [isDesc, isReload, debouncedSearch])

  const delModal = async (id: string) => {
    const res = await deleteCar(id)
    if (res.success) {
      notify({ title: "Delete", type: "success", description: "Đã xóa xe thành công" })
      setIsModalDel(false)
      setIsReload(!isReload)
    } else {
      notify({ title: "Delete", type: "error", description: res.message || "Xóa không thành công" })
      setIsModalDel(false)
    }
  }

  const setModal = (data?: MCar.IResponse, method?: "post" | "put") => {
    setDataCarId(data)
    setMethod(method || "post")
    setIsModal(true)
  }

  return (
    <>
      <BaseModal isOpen={isModal} closeModal={() => setIsModal(false)}>
        <FormCar
          isReload={isReload}
          setIsReload={setIsReload}
          valueInitial={dataCarId}
          method={method}
          setIsModal={setIsModal}
        />
      </BaseModal>

      <BaseModal isOpen={isModalDel} closeModal={() => setIsModalDel(false)}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column' }}>
          <IoIosCloseCircleOutline style={{ fontSize: 70, color: ColorStyle.Error }} />
          <h5>Are you sure ?</h5>
          <p>Bạn có chắc chắn muốn xóa xe này?</p>
          <div>
            <Button style={{ marginRight: 10 }} onClick={() => setIsModalDel(false)}>Cancel</Button>
            <Button type="error" onClick={() => delModal(idCarDel)}>Confirm</Button>
          </div>
        </div>
      </BaseModal>

      <BaseModal isOpen={isModalDetail} closeModal={() => setIsModalDetail(false)}>
        <DetailCar data={dataCarId} />
      </BaseModal>

      <div style={{ margin: "50px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
          <h3 style={{ marginLeft: 10 }}>Danh sách xe</h3>
          <Button onClick={() => setModal(undefined, "post")} type="gradientPrimary" style={{ padding: "9px 20px", marginRight: 10 }}>
            + Thêm xe
          </Button>
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 230, paddingLeft: 35, marginRight: 10, borderRadius: 7 }}
              placeholder="Tìm theo biển số, hãng..."
            />
          </div>
        </div>

        <TableBase columns={columns} dataSource={dataCar} loading={loading} />
      </div>
    </>
  )
}

export default ListCars