import React from 'react';
import { Card, Row, Col, Table, Badge } from 'react-bootstrap';
import Tag from '../../../components/Tag';
import { formatVNTime } from '../../../utils/formatTime';
import TableBase, { Column } from '../../../components/BaseTable';
import { formatCurrency } from '../../../utils/formatCurrency';

interface ImportDetailProps {
  data?: MImportItem.IRecord;
}

const ImportDetail = ({ data }: ImportDetailProps) => {
  if (!data) return null;


  const colors = {
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#197755',
    info: '#0dcaf0',
    light: '#f7f9fa',
    border: '#dee2e6',
    textMuted: '#6c757d',
    dark: '#212529',
  };

  const columns: Column<MImportItem.IPartsResponse>[] = [
    {
      title: "Tên linh kiện",
      dataIndex: "partName"
    },
    {
      title: "Mã linh kiện",
      dataIndex: "partCode"
    },
    {
      title: "Đơn giá nhập",
      dataIndex: "unitPrice"
    },
    {
      title: "Thành tiền",
      render: (_, record) => (
        <div>{formatCurrency(record.unitPrice * record.stock)}</div>
      )
    },
  ]

  return (
    <div style={{
      maxHeight: "90vh",
      overflowY: "auto",
      padding: "20px 10px"
    }}>
      <Card style={{ boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)' }}>
        <Card.Header style={{ backgroundColor: 'white', paddingTop: '1rem', paddingBottom: '1rem' }}>
          <Row style={{ alignItems: 'center' }}>
            <Col md={6}>
              <h5 style={{ marginBottom: 0, color: colors.primary, fontWeight: 'bold' }}>
                Chi Tiết Phiếu Nhập hàng
              </h5>
            </Col>
            <Col md={6} style={{ textAlign: 'right' }}>
              <span style={{ color: colors.textMuted, marginRight: '0.5rem' }}>
                Mã nhập hàng:
              </span>
              <Tag >
                {data.importInvoiceItemCode}
              </Tag>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col md={6} style={{ marginBottom: '1rem' }}>
              <Card style={{ height: '100%', border: 'none', backgroundColor: colors.light }}>
                <Card.Body>
                  <Card.Title style={{
                    color: colors.secondary,
                    fontSize: '1rem',
                    borderBottom: `1px solid ${colors.border}`,
                    paddingBottom: '0.5rem'
                  }}>
                    Thông tin chung
                  </Card.Title>

                  <Row style={{ marginBottom: '0.5rem' }}>
                    <Col sm={5} style={{ color: colors.textMuted, fontWeight: 600 }}>Mã hóa đơn:</Col>
                    <Col sm={7} style={{ fontWeight: 'bold', wordBreak: 'break-word' }}>{data.importInvoiceItemCode}</Col>
                  </Row>

                  <Row style={{ marginBottom: '0.5rem' }}>
                    <Col sm={5} style={{ color: colors.textMuted, fontWeight: 600 }}>Ngày nhập:</Col>
                    <Col sm={7} style={{ wordBreak: 'break-word' }}>
                      {formatVNTime(data.date, true)}
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: '0.5rem' }}>
                    <Col sm={5} style={{ color: colors.textMuted, fontWeight: 600 }}>Ngày tạo:</Col>
                    <Col sm={7} style={{ wordBreak: 'break-word' }}>
                      {formatVNTime(data.createdAt, true)}
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={5} style={{ color: colors.textMuted, fontWeight: 600 }}>Ghi chú:</Col>
                    <Col sm={7} style={{ fontStyle: 'italic' }}>{data.note || 'Không có'}</Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card style={{
                height: '100%',
                borderColor: colors.primary,
                backgroundColor: 'rgba(13, 110, 253, 0.05)'
              }}>
                <Card.Body>
                  <Card.Title style={{
                    color: colors.primary,
                    fontSize: '1rem',
                    borderBottom: `1px solid ${colors.border}`,
                    paddingBottom: '0.5rem'
                  }}>
                    Nhà cung cấp
                  </Card.Title>

                  <Row style={{ marginBottom: '0.5rem' }}>
                    <Col sm={5} style={{ color: colors.textMuted, fontWeight: 600 }}>Tên NCC:</Col>
                    <Col sm={7} style={{ fontWeight: 'bold', color: colors.dark }}>{data.supplier?.supplierName}</Col>
                  </Row>

                  <Row style={{ marginBottom: '0.5rem' }}>
                    <Col sm={5} style={{ color: colors.textMuted, fontWeight: 600 }}>Mã NCC:</Col>
                    <Col sm={7}>
                      <Tag color={"cyan"}>{data.supplier?.supplierCode}</Tag>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: '0.5rem' }}>
                    <Col sm={5} style={{ color: colors.textMuted, fontWeight: 600 }}>SĐT:</Col>
                    <Col sm={7}>
                      <div>{data.supplier?.supplierPhone}</div>
                    </Col>
                  </Row>

                  <Row style={{ marginBottom: '0.5rem' }}>
                    <Col sm={5} style={{ color: colors.textMuted, fontWeight: 600 }}>Email:</Col>
                    <Col sm={7}>
                      <div >
                        {data.supplier?.supplierEmail}
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={5} style={{ color: colors.textMuted, fontWeight: 600 }}>Địa chỉ:</Col>
                    <Col sm={7}>{data.supplier?.supplierAddress}</Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <h6 style={{
            color: colors.secondary,
            borderLeft: `5px solid ${colors.success}`,
            paddingLeft: '0.5rem',
            marginBottom: '1rem'
          }}>
            Chi tiết hàng hóa
          </h6>

          <TableBase
            columns={columns}
            dataSource={data.supplier.parts as any}
          />

          <Row style={{ justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <Col md={5} lg={5}>
              <Card style={{
                backgroundColor: 'rgba(25, 135, 75, 0.1)',
                borderColor: colors.success
              }}>
                <Card.Body style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem'
                }}>
                  <span style={{ fontWeight: 'bold', color: colors.success }}>TỔNG HÓA ĐƠN:</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: colors.success }}>
                    {formatCurrency(data.invoiceTotal)}
                  </span>
                </Card.Body>
              </Card>
            </Col>
          </Row>

        </Card.Body>
      </Card>
    </div>
  );
};

export default ImportDetail;