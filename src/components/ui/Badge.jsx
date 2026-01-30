import React from 'react';
import './Badge.css';

export const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  dot = false,
  className = ''
}) => {
  const classNames = [
    'ui-badge',
    `ui-badge--${variant}`,
    `ui-badge--${size}`,
    dot && 'ui-badge--dot',
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classNames}>
      {dot && <span className="ui-badge__dot" />}
      {children}
    </span>
  );
};

export default Badge;
