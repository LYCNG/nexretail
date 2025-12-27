import { useTranslation } from 'react-i18next';
import { useWeeklyHeat } from '../../../hooks/useQueries';
import { Skeleton, Tooltip } from 'antd';
import { FireOutlined } from '@ant-design/icons';

interface WeeklyHeatmapProps {
  storeId?: string;
}

const WeeklyHeatmap = ({ storeId }: WeeklyHeatmapProps) => {
  const { t } = useTranslation();
  const { data: heatData, isLoading } = useWeeklyHeat(storeId);

  if (isLoading) {
    return (
      <div className="card">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  const days = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
  const hours = Array.from({ length: 12 }, (_, i) => i + 10); // 10:00 - 21:00

  const getHeatColor = (value: number) => {
    if (value < 30) return 'bg-primary/10';
    if (value < 50) return 'bg-primary/30';
    if (value < 70) return 'bg-primary/50';
    if (value < 90) return 'bg-primary/70';
    return 'bg-primary';
  };

  const getValueForCell = (day: string, hour: number) => {
    const cell = heatData?.find((d) => d.day === day && d.hour === hour);
    return cell?.value || 0;
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <FireOutlined className="text-xl text-primary" />
        <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
          {t('analytics.weeklyHeat')}
        </h3>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header - Hours */}
          <div className="flex mb-2">
            <div className="w-16" />
            {hours.map((hour) => (
              <div
                key={hour}
                className="flex-1 text-center text-xs text-text-secondary-light dark:text-text-secondary-dark"
              >
                {hour}:00
              </div>
            ))}
          </div>

          {/* Rows - Days */}
          {days.map((day) => (
            <div key={day} className="flex mb-1">
              <div className="w-16 text-sm font-medium text-text-primary-light dark:text-text-primary-dark flex items-center">
                {day}
              </div>
              {hours.map((hour) => {
                const value = getValueForCell(day, hour);
                return (
                  <Tooltip
                    key={`${day}-${hour}`}
                    title={`${day} ${hour}:00 - 銷售熱度: ${value}`}
                  >
                    <div
                      className={`flex-1 h-8 mx-0.5 rounded ${getHeatColor(value)} transition-all duration-200 hover:scale-110 cursor-pointer`}
                    />
                  </Tooltip>
                );
              })}
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4">
            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              低
            </span>
            <div className="flex gap-1">
              <div className="w-6 h-4 rounded bg-primary/10" />
              <div className="w-6 h-4 rounded bg-primary/30" />
              <div className="w-6 h-4 rounded bg-primary/50" />
              <div className="w-6 h-4 rounded bg-primary/70" />
              <div className="w-6 h-4 rounded bg-primary" />
            </div>
            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              高
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyHeatmap;
