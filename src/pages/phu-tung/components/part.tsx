import { useEffect, useState } from "react"
import TableBase, { Column } from "../../../components/BaseTable"
import { deletePart, getPart, getPartSearch } from "../../../services/api/partApi"
import { Input } from "../../../components/FormBase"
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye, AiOutlineSearch } from "react-icons/ai"
import Button from "../../../components/Button"
import BaseModal from "../../../components/baseModal"
import FormPart from "./formPart"
import ConfirmDelete from "../../../components/confirmDelete"
import { notify } from "../../../components/Notification"
import DetailPart from "./detailPart"
import Tag from "../../../components/Tag"
import { formatCurrency } from "../../../utils/formatCurrency"
import { useBreakpoint } from "../../../hooks/useBreakpoint"

const Parts = () => {
  const [dataPart, setDataPart] = useState<MPart.IRecord[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isReload, setIsReload] = useState<boolean>(false)
  const [method, setMethod] = useState<"post" | "put">("post")
  const [dataPartId, setDataPartId] = useState<MPart.IRecord>()
  const [isModal, setIsModal] = useState<boolean>(false)
  const [idPartdel, setIdPartdel] = useState<string>('')
  const [isModalDel, setIsModalDel] = useState<boolean>(false)
  const [isModalDetail, setIsModalDetail] = useState<boolean>(false)
  const [querySearch, setQuerySearch] = useState<any>()
  const screen = useBreakpoint()
  const isMobile = screen.sm

  const columns: Column<MPart.IRecord>[] = [
    {
      title: "Mã phụ tùng",
      dataIndex: "partCode",
      width: 100,
    },
    {
      title: "Tên phụ tùng",
      dataIndex: "name",
      width: 150,
    },

    {
      title: <div style={{ textAlign: "center" }}>{`Giá bán (VND)`}</div>,
      dataIndex: "price",
      width: 120,
      render: (value) => (
        <div style={{ textAlign: "center" }}>{formatCurrency(value)}</div>
      )
    },
    {
      title: <div style={{ textAlign: "center" }}>Tồn kho</div>,
      dataIndex: "stock",
      width: 120,
      render: (value) => (
        <div style={{ textAlign: "center" }}>
          {value <= 10 ?
            <Tag color="red" style={{ textAlign: "center" }}>{value}</Tag>
            : value <= 50 ? <Tag color="orange" style={{ textAlign: "center" }}>{value}</Tag>
              : <Tag color="blue" style={{ textAlign: "center" }}>{value}</Tag>
          }
        </div>
      )
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplier",
      width: 200,
      render: (value) => (
        <div>{`${value?.name}(${value?.supplierCode})`}</div>
      )
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: 250,
      render: (text: string) => {
        const max = 27;
        return text?.length > max ? text.slice(0, max) + "..." : text;
      }
    },
    {
      title: <div style={{ textAlign: "center" }}>Thao tác</div>,
      width: 100,
      render: (value, record, index) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 5 }}>
          <Button onClick={() => { setDataPartId(record); setIsModalDetail(true) }} type="viewDetail" style={{ padding: 0, width: 23, height: 23 }}>
            <AiOutlineEye />
          </Button>
          <Button onClick={() => { setIdPartdel(record?.id); setIsModalDel(true) }} type="error" style={{ padding: 0, width: 23, height: 23 }}>
            <AiOutlineDelete />
          </Button>
          <Button onClick={() => setModal(record, "put")} type="primary" style={{ padding: 0, width: 23, height: 23 }} >
            <AiOutlineEdit />
          </Button>
        </div>
      )
    },
  ]

  const delModal = async (id: string) => {
    const res = await deletePart(id)
    if (!res.status) {
      notify({ title: "Delete", type: "error", description: "Thông tin nhà cung cấp đã được xóa thành công" })
      setIsModalDel(false)
      setIsReload(!isReload)
    } else {
      notify({ title: "Delete", type: "error", description: "Xóa thông tin không thành công" })
      setIsModalDel(false)
      setIsReload(!isReload)
    }
  }

  const setModal = (data?: MPart.IRecord, method?: "post" | "put") => {
    setDataPartId(data)
    setMethod(method || "post")
    setIsModal(true)
  }

  useEffect(() => {
    if (querySearch) {
      setLoading(true)
      getPartSearch(querySearch)
        .then(res => setDataPart(res?.data ? res.data : []))
        .finally(() => setLoading(false))
    } else {
      setLoading(true)
      getPart()
        .then(res => setDataPart(res?.data ? res.data : []))
        .finally(() => setLoading(false))
    }
  }, [isReload, querySearch])

  return (
    <>
      <BaseModal
        isOpen={isModalDetail}
        closeModal={() => setIsModalDetail(false)}
      >
        <DetailPart data={dataPartId} />
      </BaseModal>
      <BaseModal
        isOpen={isModalDel}
        closeModal={() => setIsModalDel(false)}
      >
        <ConfirmDelete
          onCancel={() => setIsModalDel(false)}
          onConfirm={() => delModal(idPartdel)}
          text="Bạn có chắc là muốn xóa phụ tùng này"
        />
      </BaseModal>

      <BaseModal
        isOpen={isModal}
        closeModal={() => setIsModal(false)}
      >
        <FormPart isReload={isReload} setIsReload={setIsReload} valueInitial={dataPartId} method={method} setIsModal={setIsModal} />
      </BaseModal>

      <div style={{ margin: "50px 0" }}>
        <div style={{
          display: !isMobile ? "block" : "flex",
          justifyContent: "space-between",
          alignItems: 'center'
        }}>
          <h3 style={{ marginLeft: 10 }}>Danh sách phụ tùng của garage</h3>
          <div style={{ textAlign: "end" }}>
            <Button onClick={() => setModal(undefined, 'post')} style={{ padding: "9px 20px", marginRight: 10 }} type="gradientPrimary">+ Thêm phụ tùng</Button>
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
                  borderRadius: 7
                }}
                placeholder="Tìm theo mã, tên sản phẩm ..."
                onChange={e => setQuerySearch(e.target.value)}
              />
            </div>
            <TableBase
              columns={columns}
              dataSource={dataPart}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Parts