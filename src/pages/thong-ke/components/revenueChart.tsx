import React from 'react';
import { Column, ColumnConfig } from '@ant-design/plots';

interface RevenueData {
  month: string;
  value: number;
}

const RevenueChart = ({ dataaa }: { dataaa: any }) => {
  const data = dataaa?.chartData ?? []

  const config: ColumnConfig = {
    autoFit: true,
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
        labelFormatter: (v: number) => (v / 1_000_000).toFixed(2) + 'M',
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

      <div style={{ width: "100%", height: 350 }}>
        <Column {...config} />
      </div>
    </div>
  );
};

export default RevenueChart;