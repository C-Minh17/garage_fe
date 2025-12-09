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

const CardStatistical = ({ dataaa }: { dataaa: StatItem[] }) => {
  const icons = [
    <BsGraphUpArrow size={20} />,
    <BsCalendarEvent size={20} />,
    <BsWrench size={20} />,
    <BsBoxSeam size={20} />,
  ];
  const mergedData = dataaa?.map((item, index) => ({
    ...item,
    icon: icons[index] || null
  }));

  return (
    <div style={{
      padding: '24px',
      marginTop: 20
    }}>
      <Row className="g-4">
        {mergedData?.map((item) => (
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
                  color: '#16A34A'
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