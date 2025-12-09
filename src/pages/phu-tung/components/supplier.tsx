import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineSearch } from "react-icons/ai"
import Button from "../../../components/Button"
import { Input } from "../../../components/FormBase"
import TableBase, { Column } from "../../../components/BaseTable"
import { useEffect, useState } from "react"
import { deleteSupplier, getSupplier, getSupplierSearch } from "../../../services/api/supplierApi"
import BaseModal from "../../../components/baseModal"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { notify } from "../../../components/Notification"
import { ColorStyle } from "../../../styles/colors"
import FormSupplier from "./formSupplier"
import ConfirmDelete from "../../../components/confirmDelete"
import DetailSupplier from "./detailSupplier"
import { useBreakpoint } from "../../../hooks/useBreakpoint"

const Suppliers = () => {
  const [dataSupplier, setDataSupplier] = useState<MSupplier.IRecord[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isReload, setIsReload] = useState<boolean>(false)
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isModalDel, setIsModalDel] = useState<boolean>(false)
  const [idSpdel, setIdSpdel] = useState<string>('')
  const [method, setMethod] = useState<"post" | "put">("post")
  const [dataSupplierId, setDataSupplierId] = useState<MSupplier.IRecord>()
  const [isModalDetail, setIsModalDetail] = useState<boolean>(false)
  const [querySearch, setQuerySearch] = useState<any>()
  const screen = useBreakpoint()
  const isMobile = screen.sm


  const columns: Column<MSupplier.IRecord>[] = [
    {
      title: "MÃ NCC",
      dataIndex: "supplierCode",
      width: 100
    },
    {
      title: "Tên nhà cung cấp",
      dataIndex: "name",
      width: 230
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 200
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 230
    },
    {
      title: "SDT",
      dataIndex: "phone",
      width: 130
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: 300
    },
    {
      title: <div style={{ textAlign: "center" }}>Thao tác</div>,
      width: 100,
      render: (value, record, index) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 5 }}>
          <Button onClick={() => { setDataSupplierId(record); setIsModalDetail(true) }} type="viewDetail" style={{ padding: 0, width: 23, height: 23 }}>
            <AiOutlineEye />
          </Button>
          <Button onClick={() => { setIdSpdel(record?.id); setIsModalDel(true) }} type="error" style={{ padding: 0, width: 23, height: 23 }}>
            <AiOutlineDelete />
          </Button>
          <Button onClick={() => setModal(record, "put")} type="primary" style={{ padding: 0, width: 23, height: 23 }} >
            <AiOutlineEdit />
          </Button>
        </div>
      )
    },
  ]

  useEffect(() => {
    if (querySearch) {
      setLoading(true)
      getSupplierSearch(querySearch)
        .then(res => setDataSupplier(res?.data ? res.data : []))
        .finally(() => setLoading(false))
    } else {
      setLoading(true)
      getSupplier()
        .then(res => setDataSupplier(res?.data ? res.data : []))
        .finally(() => setLoading(false))
    }
  }, [isReload, querySearch])

  const delModal = async (id: string) => {
    const res = await deleteSupplier(id)
    if (!res.status) {
      notify({ title: "Delete", type: "success", description: "Thông tin nhà cung cấp đã được xóa thành công" })
      setIsModalDel(false)
      setIsReload(!isReload)
    } else {
      notify({ title: "Delete", type: "error", description: "Xóa thông tin không thành công" })
      setIsModalDel(false)
      setIsReload(!isReload)
    }
  }
  const setModal = (data?: MSupplier.IRecord, method?: "post" | "put") => {
    setDataSupplierId(data)
    setMethod(method || "post")
    setIsModal(true)
  }

  return (
    <>
      <BaseModal
        isOpen={isModalDetail}
        closeModal={() => setIsModalDetail(false)}
      >
        <DetailSupplier data={dataSupplierId} />
      </BaseModal>

      <BaseModal
        isOpen={isModal}
        closeModal={() => setIsModal(false)}
      >
        <FormSupplier isReload={isReload} setIsReload={setIsReload} valueInitial={dataSupplierId} method={method} setIsModal={setIsModal} />
      </BaseModal>

      <BaseModal
        isOpen={isModalDel}
        closeModal={() => setIsModalDel(false)}
      >
        <ConfirmDelete
          onCancel={() => setIsModalDel(false)}
          onConfirm={() => delModal(idSpdel)}
        />
      </BaseModal>
      <div style={{ margin: "50px 0" }}>
        <div style={{
          display: !isMobile ? "block" : "flex",
          justifyContent: "space-between",
          alignItems: 'center'
        }}>
          <h3 style={{ marginLeft: 10 }}>Danh sách nhà cung cấp</h3>
          <div style={{ textAlign: "end" }}>
            <Button onClick={() => setModal(undefined, 'post')} style={{ padding: "9px 20px", marginRight: 10 }} type="gradientPrimary">+ Thêm nhà cung cấp</Button>
          </div>
        </div>
        <div>
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end"
            }}>
              <AiOutlineSearch />
              <Input
                name="search"
                style={{
                  width: 230,
                  margin: "10px 10px",
                  marginRight: "25px ",
                  borderRadius: 7,
                }}
                placeholder="Tìm theo mã, tên sản phẩm ..."
                onChange={e => setQuerySearch(e.target.value)}
              />
            </div>
            <TableBase
              columns={columns}
              dataSource={dataSupplier}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Suppliers