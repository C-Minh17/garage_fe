import React from 'react';
import { Row, Col, Table, Badge, Card } from 'react-bootstrap';
import Tag from '../../../components/Tag';
import TableBase, { Column } from '../../../components/BaseTable';
import { formatVNTime } from '../../../utils/formatTime';

const PaymentDetailModal = ({ data }: { data: MPayment.IRecord }) => {
  const repairOrder = data.repairOrder;
  const customerInfo = repairOrder?.customer?.data;
  const carInfo = repairOrder?.car;

  const styles = {
    card: {
      border: 'none',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      margin: "10px 0",
    },
    headerTitle: { margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#343a40' },
    subTitle: { fontSize: '0.85rem', color: '#6c757d' },
    totalAmount: { fontSize: '1.5rem', fontWeight: 800, color: '#0d6efd' },
    sectionTitle: {
      fontSize: '0.95rem',
      fontWeight: 600,
      color: '#495057',
      marginBottom: '12px',
      paddingBottom: '6px',
      borderBottom: '1px solid #e9ecef'
    },
    label: { color: '#6c757d', fontSize: '0.9rem' },
    value: { fontWeight: 500, color: '#212529', fontSize: '0.95rem' },
    tableHeader: { backgroundColor: '#f8f9fa', fontSize: '0.85rem', color: '#495057' }
  };

  const columnsService: Column<MService.IRecord>[] = [
    {
      title: "Mã dịch vụ",
      dataIndex: "serviceCode",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
  ]

  const columnsPart: Column<MRepairOrder.IParts>[] = [
    {
      title: "Tên phụ tùng",
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "unitPrice"
    },
    {
      title: "Tổng tiền",
      dataIndex: "total"
    },
  ]

  return (
    <div style={{
      overflowY: "auto",
      height: "90vh",
      width: "650px"
    }}>
      <Card style={styles.card}>
        <Card.Body style={{ padding: 10 }}>
          <Row className="align-items-center">
            <Col xs={7}>
              <h4 style={styles.headerTitle}>Chi tiết thanh toán</h4>
              <div style={styles.subTitle}>Mã GD: {data.id}</div>
            </Col>
            <Col xs={5} style={{ textAlign: "end" }}>
              <Tag color={"green"}>{data.status}</Tag>
              <div style={styles.totalAmount}>{data.amount}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row >
        <Col md={6}>
          <Card style={{ ...styles.card, height: '100%' }}>
            <Card.Body>
              <div style={styles.sectionTitle}>Thông tin giao dịch</div>
              <Row>
                <Col xs={5} style={styles.label}>Phương thức:</Col>
                <Col xs={7} style={styles.value}>{data.method || 'Tiền mặt'}</Col>
              </Row>
              <Row >
                <Col xs={5} style={styles.label}>Ngày tạo:</Col>
                <Col xs={7} style={styles.value}>{formatVNTime(data.createdAt, true)}</Col>
              </Row>
              <Row>
                <Col xs={5} style={styles.label}>Cập nhật:</Col>
                <Col xs={7} style={styles.value}>{formatVNTime(data.updatedAt, true)}</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card style={{ ...styles.card, height: '100%' }}>
            <Card.Body>
              <div style={styles.sectionTitle}>Phiếu dịch vụ ({repairOrder?.orderCode})</div>
              <Row>
                <Col xs={5} style={styles.label}>Khách hàng:</Col>
                <Col xs={7} style={styles.value}>
                  {customerInfo?.name || '---'}
                </Col>
              </Row>
              <Row>
                <Col xs={5} style={styles.label}>SĐT:</Col>
                <Col xs={7} style={styles.value}>
                  {customerInfo?.phone || '---'}
                </Col>
              </Row>
              <Row>
                <Col xs={5} style={styles.label}>Xe:</Col>
                <Col xs={7} style={styles.value}>
                  <span>{carInfo?.plate || '---'}</span>
                  {carInfo?.model && <span style={{ color: "#636161ff" }}>({carInfo.model})</span>}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card style={styles.card}>
        <Card.Body>
          <div>
            <h6 > Dịch vụ sử dụng</h6>
            <TableBase
              columns={columnsService}
              dataSource={data.repairOrder.service}
            />
          </div>

          <div style={{ margin: "25px 0" }}>
            <h6> Vật tư thay thế</h6>
            <TableBase
              columns={columnsPart}
              dataSource={data.repairOrder.parts}
            />
          </div>

          {repairOrder?.note && (
            <div
              style={{
                border: "1px solid #d0d7de",
                borderRadius: "6px",
                padding: "12px 14px",
                background: "#f9fafb",
                margin: "12px 0",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              <strong style={{ display: "block", marginBottom: "6px" }}>Ghi chú phiếu:</strong>
              {repairOrder.note}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default PaymentDetailModal;