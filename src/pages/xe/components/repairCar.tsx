import { useEffect, useState } from "react"
import TableBase, { Column } from "../../../components/BaseTable"
import Button from "../../../components/Button"
import { notify } from "../../../components/Notification"
import { AiOutlineCheckCircle, AiOutlineSearch, AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai"
import { Input } from "../../../components/FormBase"
import { getCar, putCar, searchCar } from "../../../services/api/carApi"
import BaseModal from "../../../components/baseModal"
import { ColorStyle } from "../../../styles/colors"
import { IoIosCheckmarkCircleOutline } from "react-icons/io"

const RepairCar = () => {
  const [carList, setCarList] = useState<MCar.IResponse[]>([])
  const [dataRepair, setDataRepair] = useState<MCar.IResponse[]>([])
  const [isReload, setIsReload] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false)
  const [selectedCar, setSelectedCar] = useState<MCar.IResponse | null>(null)
  const [isDesc, setIsDesc] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)

  const columns: Column<MCar.IResponse>[] = [
    {
      title: "Biển số xe",
      dataIndex: "plate",
      width: 120
    },
    {
      title: "Hãng xe",
      dataIndex: "manufacturer",
      width: 150
    },
    {
      title: "Mẫu xe",
      dataIndex: "model",
      width: 150
    },
    {
      title: "Mô tả lỗi/tình trạng",
      dataIndex: "description",
      width: 300
    },
    {
      title: <div style={{ textAlign: "center" }}>Thao tác</div>,
      width: 120,
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => openConfirmModal(record)}
            type="primary"
            style={{ 
                padding: "5px 10px", 
                fontSize: 13, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 5 
            }}
          >
            <AiOutlineCheckCircle /> Hoàn thành
          </Button>
        </div>
      )
    },
  ]
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        let res = search ? await searchCar(search) : await getCar()
        const list = res?.data ?? []

        setCarList(list)
        setDataRepair(list.filter(car => car.active === false))
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [search, isReload])

  const openConfirmModal = (car: MCar.IResponse) => {
      setSelectedCar(car)
      setIsModalConfirm(true)
  }

  const handleFinishRepair = async () => {
    if (!selectedCar) return;

    try {
      const payload: MCar.IRequest = {
        plate: selectedCar.plate,
        model: selectedCar.model,
        manufacturer: selectedCar.manufacturer,
        description: selectedCar.description,
        customerId: selectedCar.customerId, 
        active: true 
      }

      const res = await putCar(selectedCar.id, payload)

      if (res.success) {
        notify({ 
            title: "Thành công", 
            type: "success", 
            description: `Xe ${selectedCar.plate} đã sửa xong và được đưa về danh sách chờ thanh toán.` 
        })
        setIsReload(!isReload) 
        setIsModalConfirm(false)
      } else {
        notify({ 
            title: "Thất bại", 
            type: "error", 
            description: res.message || "Có lỗi xảy ra" 
        })
      }
    } catch (error) {
        notify({ title: "Error", type: "error", description: "Lỗi kết nối server" })
    }
  }

  const getProcessedData = () => {
    let result = [...dataRepair]

    if (search) {
        const s = search.toLowerCase()
        result = result.filter(car => 
          car.plate.toLowerCase().includes(s) ||
          car.model.toLowerCase().includes(s)
        )
    }

    result.sort((a, b) => {
        const dateA = new Date(a.createdAt || "").getTime()
        const dateB = new Date(b.createdAt || "").getTime()
        return isDesc ? dateB - dateA : dateA - dateB 
    })

    return result
  }

  return (
    <div style={{ margin: "50px 0" }}>
      <BaseModal isOpen={isModalConfirm} closeModal={() => setIsModalConfirm(false)}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: 'column',
          padding: 20
        }}>
          <IoIosCheckmarkCircleOutline style={{ fontSize: 70, color: ColorStyle.Success || 'green' }} />
          <h3 style={{marginTop: 10}}>Xác nhận sửa xong?</h3>
          <p style={{textAlign: 'center', marginBottom: 20}}>
            Bạn xác nhận xe <b>{selectedCar?.plate}</b> đã hoàn tất quá trình sửa chữa? <br/>
            Xe sẽ được chuyển sang danh sách xe hoạt động.
          </p>
          <div>
            <Button style={{ marginRight: 10 }} onClick={() => setIsModalConfirm(false)}>Hủy bỏ</Button>
            <Button type="primary" onClick={handleFinishRepair}>Xác nhận</Button>
          </div>
        </div>
      </BaseModal>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center'
      }}>
        <h3 style={{ marginLeft: 10 }}>Danh sách xe đang sửa chữa</h3>
        
        <div style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 10
        }}>
          <Button
            onClick={() => setIsDesc(!isDesc)}
            type="dashed"
            style={{ 
              marginRight: 10, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 5,
              height: 38
            }}
          >
            {isDesc ? <AiOutlineSortDescending size={20}/> : <AiOutlineSortAscending size={20}/>}
            {isDesc ? "Mới nhất" : "Cũ nhất"}
          </Button>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
             <AiOutlineSearch style={{ position: 'absolute', left: 15, zIndex: 1 }}/>
             <Input
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: 230,
                  paddingLeft: 35,
                  marginRight: 10,
                  borderRadius: 7
                }}
                placeholder="Tìm xe đang sửa..."
              />
          </div>
        </div>
      </div>

      <TableBase columns={columns} dataSource={getProcessedData()} emptyText="Không có xe nào đang sửa chữa" loading={loading}/>
    </div>
  )
}

export default RepairCar