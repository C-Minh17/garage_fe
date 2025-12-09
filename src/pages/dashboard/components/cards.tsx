import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { BsGraphUpArrow, BsCalendarEvent, BsWrench, BsBoxSeam } from "react-icons/bs";
import { getStatisticDaily } from '../../../services/api/statisticsApi';
import { formatCurrency } from '../../../utils/formatCurrency';
import { getCar } from '../../../services/api/carApi';
import { getTechnicians } from '../../../services/api/techniciansApi';

interface StatItem {
  id: number;
  title: string;
  value: string;
  subText: string;
  icon: React.ReactNode;
}

const CardDashboard = () => {
  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-CA');
  const [data, setData] = useState<any>()
  const [dataCar, setDataCar] = useState<MCar.IResponse[]>()
  const [dataTechnician, setDataTechnician] = useState<MTechnician.IRecord[]>([])
  const statsData: StatItem[] = [
    {
      id: 2,
      title: 'Doanh thu hôm nay',
      value: formatCurrency(data?.totalRevenueInDay) || 0,
      subText: 'Tổng doanh thu ngày hôm nay',
      icon: <BsCalendarEvent size={20} />,
    },
    {
      id: 1,
      title: 'Xe đang sửa',
      value: dataCar?.length,
      subText: 'Cập nhật theo thời gian thực',
      icon: <BsGraphUpArrow size={20} />,
    },
    {
      id: 3,
      title: 'Dịch vụ đã thực hiện',
      value: data?.totalServicesInDay || 0,
      subText: 'Bao gồm tất cả trong ngày',
      icon: <BsWrench size={20} />,
    },
    {
      id: 4,
      title: 'kĩ thuật viên trống',
      value: dataTechnician?.filter(item => item.active === false).length,
      subText: `Có ${dataTechnician?.length - dataTechnician?.filter(item => item.active === false).length} người làm việc`,
      icon: <BsBoxSeam size={20} />,
    },
  ];

  useEffect(() => {
    getStatisticDaily(formattedDate).then(res => setData(res))
    getCar().then(res => setDataCar(res.data?.filter(item => item.active === true)))
    getTechnicians().then(res => setDataTechnician(res.data ? res.data : []))
  }, [])

  console.log(data)

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
                marginBottom: '0px'
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

export default CardDashboard;