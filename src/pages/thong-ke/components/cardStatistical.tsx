import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { BsGraphUpArrow, BsCalendarEvent, BsWrench, BsBoxSeam } from "react-icons/bs";

interface StatItem {
  id: number;
  title: string;
  value: string;
  subText: string;
  icon: React.ReactNode;
  isGrowth: boolean;
}

const CardStatistical = () => {
  const statsData: StatItem[] = [
    {
      id: 1,
      title: 'Tổng doanh thu năm',
      value: '4.61B đ',
      subText: '+18.2% so với năm trước',
      icon: <BsGraphUpArrow size={20} />,
      isGrowth: true,
    },
    {
      id: 2,
      title: 'Tổng đơn hàng',
      value: '773',
      subText: '+156 đơn so với năm trước',
      icon: <BsCalendarEvent size={20} />,
      isGrowth: true,
    },
    {
      id: 3,
      title: 'Dịch vụ đã thực hiện',
      value: '2,054',
      subText: 'Trung bình 171/tháng',
      icon: <BsWrench size={20} />,
      isGrowth: false,
    },
    {
      id: 4,
      title: 'Phụ tùng đã bán',
      value: '1,620',
      subText: 'Trung bình 135/tháng',
      icon: <BsBoxSeam size={20} />,
      isGrowth: false,
    },
  ];

  return (
    <div style={{
      padding: '24px',
      marginTop: 20
    }}>
      <Row className="g-4">
        {statsData.map((item) => (
          <Col key={item.id} xs={12} md={6} lg={3}>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}>
                <span style={{
                  color: '#6B7280',
                  fontSize: '14px',
                  fontWeight: '500',
                  margin: 0
                }}>
                  {item.title}
                </span>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#FFF7ED',
                  borderRadius: '12px',
                  color: '#EA580C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.icon}
                </div>
              </div>
              <div>
                <h3 style={{
                  fontSize: '30px',
                  fontWeight: '700',
                  color: '#111827',
                  margin: '0 0 8px 0',
                  lineHeight: '1.2'
                }}>
                  {item.value}
                </h3>

                <p style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  margin: 0,
                  color: item.isGrowth ? '#16A34A' : '#6B7280'
                }}>
                  {item.subText}
                </p>
              </div>

            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardStatistical;