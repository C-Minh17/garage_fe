import { AiOutlineDelete, AiOutlineEdit, AiOutlineSearch, AiOutlineEye, AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { useEffect, useState } from "react"
import Button from "../../components/Button"
import { Input } from "../../components/FormBase"
import TableBase, { Column } from "../../components/BaseTable"
import BaseModal from "../../components/baseModal"
import { notify } from "../../components/Notification"
import { ColorStyle } from "../../styles/colors"
import FormTechnician from "./components/form"
import DetailTechnician from "./components/detailTechnician"

import {
  getTechnicians,
  delTechnician,
  searchTechnicians,
  sortTechnicians
} from "../../services/api/techniciansApi"
import { formatCurrency } from "../../utils/formatCurrency"
import { useBreakpoint } from "../../hooks/useBreakpoint"

const Technicians = () => {

  const [dataTechnician, setDataTechnician] = useState<MTechnician.IRecord[]>([])
  const [isModalDetail, setIsModalDetail] = useState<boolean>(false)
  const [isReload, setIsReload] = useState<boolean>(false)
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isModalDel, setIsModalDel] = useState<boolean>(false)
  const [idTechnicianDel, setIdTechnicianDel] = useState<string>("")
  const [method, setMethod] = useState<"post" | "put">("post")
  const [dataDetail, setDataDetail] = useState<MTechnician.IRecord>()

  const [search, setSearch] = useState<string>("")
  const [debouncedSearch, setDebouncedSearch] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [isDesc, setIsDesc] = useState<boolean>(true)
  const screen = useBreakpoint()
  const isMobile = screen.sm

  const columns: Column<MTechnician.IRecord>[] = [
    { title: "Mã KTV", dataIndex: "techCode", width: 100 },
    { title: "Tên kỹ thuật viên", dataIndex: "name", width: 150 },
    { title: "Số điện thoại", dataIndex: "phone", width: 120 },
    {
      title: "Lương cơ bản",
      dataIndex: "baseSalary",
      width: 150,
      render: (value) => (
        <div>{formatCurrency(value)}</div>
      )
    },
    { title: "Chức vụ", dataIndex: "position", width: 120 },
    {
      title: "Trạng thái",
      dataIndex: "active",
      width: 130,
      render: (active: boolean) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: active ? '#28a745' : '#dc3545'
          }} />
          <span style={{
            color: active ? '#28a745' : '#dc3545',
            fontWeight: 600,
            fontSize: 13
          }}>
            {active ? "Hoạt động" : "Không hoạt động"}
          </span>
        </div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>Thao tác</div>,
      width: 100,
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 5 }}>
          <Button onClick={() => { setDataDetail(record); setIsModalDetail(true) }} type="viewDetail" style={{ padding: 0, width: 23, height: 23 }}>
            <AiOutlineEye />
          </Button>
          <Button onClick={() => { setIdTechnicianDel(record.id); setIsModalDel(true); }} type="error" style={{ padding: 0, width: 23, height: 23 }}>
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

  const fetchTechnicians = async () => {
    try {
      let res;

      if (debouncedSearch) {
        res = await searchTechnicians(debouncedSearch);
      } else {
        res = await sortTechnicians(!isDesc);
      }

      const payload = res?.data;
      if (Array.isArray(payload)) {
        setDataTechnician(payload);
      } else {
        setDataTechnician([]);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu KTV:", error);
      setDataTechnician([]);
    }
  }

  useEffect(() => {
    fetchTechnicians()
  }, [isDesc, isReload, debouncedSearch])

  const delModal = async (id: string) => {
    const res = await delTechnician(id)
    if (res?.success) {
      notify({ title: "Delete", type: "success", description: "Đã xóa kỹ thuật viên thành công" })
      setIsModalDel(false)
      setIsReload(!isReload)
    } else {
      notify({ title: "Delete", type: "error", description: (res as any)?.message || "Xóa không thành công" })
      setIsModalDel(false)
    }
  }

  const setModal = (data?: MTechnician.IRecord, method?: "post" | "put") => {
    setDataDetail(data || {} as MTechnician.IRecord)
    setMethod(method || "post")
    setIsModal(true)
  }
  useEffect(() => {
    if (search) {
      setLoading(true)
      searchTechnicians(search)
        .then(res => setDataTechnician(res.data ?? []))
        .finally(() => setLoading(false))
    } else {
      setLoading(true)
      getTechnicians()
        .then(res => setDataTechnician(res?.data ?? []))
        .finally(() => setLoading(false))
    }
  }, [search, isReload])

  return (
    <>
      <BaseModal isOpen={isModal} closeModal={() => setIsModal(false)}>
        <FormTechnician
          isReload={isReload}
          setIsReload={setIsReload}
          valueInitial={dataDetail}
          method={method}
          setIsModal={setIsModal}
        />
      </BaseModal>

      <BaseModal isOpen={isModalDel} closeModal={() => setIsModalDel(false)}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column' }}>
          <IoIosCloseCircleOutline style={{ fontSize: 70, color: ColorStyle?.Error || 'red' }} />
          <h5>Are you sure ?</h5>
          <p>Bạn có chắc chắn muốn xóa kỹ thuật viên này?</p>
          <div>
            <Button style={{ marginRight: 10 }} onClick={() => setIsModalDel(false)}>Cancel</Button>
            <Button type="error" onClick={() => delModal(idTechnicianDel)}>Confirm</Button>
          </div>
        </div>
      </BaseModal>

      <BaseModal isOpen={isModalDetail} closeModal={() => setIsModalDetail(false)}>
        <DetailTechnician data={dataDetail} />
      </BaseModal>

      <div style={{ margin: "50px 0" }}>
        <div style={{ display: !isMobile ? "block" : "flex", justifyContent: "space-between", alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
              Danh sách kỹ thuật viên
            </h1>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
              Quản lý hồ sơ, cấp bậc và phân công công việc
            </p>
          </div>
          <div style={{ textAlign: "end" }}>
            <Button onClick={() => setModal(undefined, "post")} type="gradientPrimary" style={{ padding: "9px 20px", marginRight: 10 }}>
              + Thêm kỹ thuật viên
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 230, paddingLeft: 35, marginRight: 10, borderRadius: 7 }}
              placeholder="Tìm theo mã, tên, SĐT..."
            />
          </div>
        </div>

        <TableBase columns={columns} dataSource={dataTechnician} loading={loading} />
      </div>
    </>
  )
}

export default Technicians