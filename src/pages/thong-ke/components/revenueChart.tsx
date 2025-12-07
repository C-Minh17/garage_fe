import React from 'react';
import { Column, ColumnConfig } from '@ant-design/plots';

interface RevenueData {
  month: string;
  value: number;
}

const RevenueChart = () => {
  const data: RevenueData[] = [
    { month: 'T1/2024', value: 280000000 },
    { month: 'T2/2024', value: 310000000 },
    { month: 'T3/2024', value: 295000000 },
    { month: 'T4/2024', value: 340000000 },
    { month: 'T5/2024', value: 380000000 },
    { month: 'T6/2024', value: 350000000 },
    { month: 'T7/2024', value: 390000000 },
    { month: 'T8/2024', value: 425000000 },
    { month: 'T9/2024', value: 400000000 },
    { month: 'T10/2024', value: 445000000 },
    { month: 'T11/2024', value: 465000000 },
    { month: 'T12/2024', value: 510000000 },
  ];

  const config: ColumnConfig = {
    data,
    xField: 'month',
    yField: 'value',
    color: '#1677ff',

    scale: {
      x: { padding: 0.4 },
    },

    style: {
      radiusTopLeft: 6,
      radiusTopRight: 6,
    },

    axis: {
      x: {
        title: false,
        tick: false,
        line: false,
        labelFormatter: (v: string) => v,
      },
      y: {
        labelFormatter: (v: number) => `${v / 1000000}M`,
        grid: true,
        gridLineDash: [4, 4],
        gridStroke: '#e0e0e0',
      },
    },
    tooltip: {
      title: 'month',
      items: [
        {
          name: 'Doanh thu',
          channel: 'y',
          valueFormatter: (d) =>
            new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(d),
        },
      ],
    },

    legend: false,
  };

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        padding: '24px',
        border: '1px solid #f0f0f0',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        width: '100%'
      }}
    >
      <div style={{ marginBottom: '32px' }}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#000000e0',
            margin: '0 0 8px 0',
          }}
        >
          Doanh thu 12 tháng gần nhất
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: '#00000073',
            margin: 0,
          }}
        >
          So sánh doanh thu theo tháng
        </p>
      </div>

      <div style={{ height: 350 }}>
        <Column {...config} />
      </div>
    </div>
  );
};

export default RevenueChart;