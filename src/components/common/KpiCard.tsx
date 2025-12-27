import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  prefix?: string;
  suffix?: string;
}

const KpiCard = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  prefix,
  suffix,
}: KpiCardProps) => {
  const isPositive = change && change >= 0;
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';
  const ChangIcon = isPositive ? ArrowUpOutlined : ArrowDownOutlined;

  return (
    <div className="card group hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
          {title}
        </span>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary text-lg group-hover:scale-110 transition-transform duration-200">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1">
        {prefix && (
          <span className="text-lg font-medium text-text-secondary-light dark:text-text-secondary-dark">
            {prefix}
          </span>
        )}
        <span className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {suffix && (
          <span className="text-lg font-medium text-text-secondary-light dark:text-text-secondary-dark">
            {suffix}
          </span>
        )}
      </div>

      {change !== undefined && (
        <div className="mt-3 flex items-center gap-2">
          <div className={`flex items-center gap-1 ${changeColor}`}>
            <ChangIcon className="text-xs" />
            <span className="text-sm font-medium">
              {Math.abs(change).toFixed(1)}%
            </span>
          </div>
          {changeLabel && (
            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              {changeLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default KpiCard;
