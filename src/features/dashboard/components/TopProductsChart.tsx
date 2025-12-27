import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useTopProducts } from '../../../hooks/useQueries';
import { Skeleton } from 'antd';

const TopProductsChart = () => {
  const { t } = useTranslation();
  const { data: topProducts, isLoading } = useTopProducts();

  if (isLoading) {
    return (
      <div className="card h-[400px]">
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  const chartData = topProducts?.slice(0, 5).map((item) => ({
    name: item.productName.length > 8 
      ? item.productName.slice(0, 8) + '...' 
      : item.productName,
    fullName: item.productName,
    unitsSold: item.unitsSold,
    revenue: item.revenue,
  }));

  const colors = ['#E07A5F', '#F2CC8F', '#81B29A', '#3D405B', '#9CA3AF'];

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-6">
        {t('dashboard.topProducts')}
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              type="number"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number|undefined, _name, props) => [
                `${value?.toLocaleString()} 件`,
                props.payload.fullName,
              ]}
            />
            <Bar dataKey="unitsSold" radius={[0, 4, 4, 0]}>
              {chartData?.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopProductsChart;
