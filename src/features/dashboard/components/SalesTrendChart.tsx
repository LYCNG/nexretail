import { useTranslation } from 'react-i18next';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useSalesTrend } from '../../../hooks/useQueries';
import { Skeleton } from 'antd';

const SalesTrendChart = () => {
  const { t } = useTranslation();
  const { data: salesTrend, isLoading } = useSalesTrend(30);

  if (isLoading) {
    return (
      <div className="card h-[400px]">
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  const chartData = salesTrend?.map((item) => ({
    ...item,
    date: item.date.slice(5), // 只顯示 MM-DD
  }));

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-6">
        {t('dashboard.salesTrend')}
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E07A5F" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#E07A5F" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number|undefined) => [
                `NT$ ${value?.toLocaleString()}`,
                '營收',
              ]}
              labelFormatter={(label) => `日期: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#E07A5F"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesTrendChart;
