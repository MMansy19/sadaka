import React from 'react';
import './StatsCard.css';

export const StatsCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  variant = 'default',
  onClick
}) => {
  const classNames = [
    'ui-stats-card',
    `ui-stats-card--${variant}`,
    onClick && 'ui-stats-card--clickable'
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} onClick={onClick}>
      {icon && <div className="ui-stats-card__icon">{icon}</div>}
      <div className="ui-stats-card__content">
        <span className="ui-stats-card__title">{title}</span>
        <span className="ui-stats-card__value">{value}</span>
        {trend && (
          <span className={`ui-stats-card__trend ui-stats-card__trend--${trend}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
