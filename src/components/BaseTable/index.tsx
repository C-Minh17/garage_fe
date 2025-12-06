import { useState } from "react"
import "./table.scss"
import { AiOutlineFrown, AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { ColorStyle } from "../../styles/colors"
import Button from "../Button"
import { FourSquare } from "react-loading-indicators"

export type Column<T = any> = {
  title: React.ReactNode,
  dataIndex?: keyof T,
  width?: number,
  render?: (value: any, record: T, index: number) => React.ReactNode
}

export interface ITableBase<T = any> {
  columns: Column<T>[],
  dataSource: T[],
  rowkey?: string,
  pageSize?: number,
  loading?: boolean,
  width?: number
  emptyText?: string
}


const TableBase = <T,>({
  columns,
  dataSource,
  rowkey = "id",
  pageSize = 7,
  loading = false,
  emptyText = "Không có dữ liệu",
}: ITableBase<T>) => {
  const [pageNumber, setPagenumber] = useState<number>(1)
  const totalPage = Math.ceil(dataSource?.length / pageSize);
  const slPage = Array.from({ length: totalPage });

  const getRowKey = (record: T, index: number) => {
    const key = (record as any)[rowkey];
    return key ?? index;
  }

  const nextPage = () => {
    if (pageNumber < totalPage) {
      setPagenumber((p) => p + 1)
    }
  }
  const backPage = () => {
    if (pageNumber > 1) {
      setPagenumber((p) => p - 1)
    }
  }

  const startPage = pageSize * (pageNumber - 1)
  const dataTable = dataSource?.slice(startPage, startPage + pageSize)

  return (
    <div className="table-container">
      <div
        style={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
          }}
        >
          <thead>
            <tr>
              {columns?.map((item) => (
                <th style={{ width: item?.width }} key={String(item.dataIndex)}>
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={columns?.length} style={{ paddingTop: "30px" }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div className="loader"></div>
                <p style={{ fontSize: 16, fontWeight: 500 }}>Đang tải dữ liệu ...</p>
              </div>
            </td></tr>
              : (dataSource && dataSource.length !== 0) ? dataTable?.map((record, index) => {
                const key = getRowKey(record, index);
                return (
                  <tr key={key}>
                    {columns?.map((col, index) => {
                      const value = col.dataIndex ? record[col.dataIndex] : undefined;
                      return (
                        <td key={index}>
                          {col.render ? col.render(value, record, index) : String(value ?? "")}
                        </td>
                      )
                    })}
                  </tr>
                )
              }) :
                <tr style={{ background: "#fafafa" }}>
                  <td
                    colSpan={columns?.length}
                    style={{
                      padding: "32px 0",
                      color: "#888",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "8px",
                        fontSize: "15px",
                      }}
                    >
                      <div><AiOutlineFrown size={30} /></div>
                      <span>Không có dữ liệu</span>
                    </div>
                  </td>
                </tr>
            }
          </tbody>
        </table>
      </div>
      <div style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        margin: "15px 0"
      }}>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 30,
            width: 30,
            padding: 0,
            border: "none",
            boxShadow: 'none'
          }}
          onClick={backPage}
        >
          <AiOutlineLeft />
        </Button>
        <div style={{
          display: "flex",
          justifyContent: 'center',
          alignItems: "center",
        }}>
          {slPage?.map((item, index) => (
            <Button
              key={index}
              style={{
                display: "flex",
                justifyContent: 'center',
                alignItems: "center",
                margin: "0 5px",
                height: 30,
                width: 30,
                boxShadow: 'none',
                border: pageNumber === index + 1 ? `1px solid ${ColorStyle.Primary}` : "none",
                color: pageNumber === index + 1 ? ColorStyle.Primary : ColorStyle.TextBase
              }}
              onClick={() => setPagenumber(index + 1)}
            >{index + 1}</Button>
          ))}
        </div>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 30,
            width: 30,
            padding: 0,
            border: "none",
            boxShadow: 'none',
            marginRight: "30px"
          }}
          onClick={nextPage}
        >
          <AiOutlineRight />
        </Button>
      </div>
    </div>
  )
}

export default TableBase