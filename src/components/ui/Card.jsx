import React, { forwardRef } from 'react';
import './Card.css';

export const Card = forwardRef(({
  children,
  variant = 'default',
  padding = 'medium',
  hoverable = false,
  className = '',
  onClick,
  ...props
}, ref) => {
  const classNames = [
    'ui-card',
    `ui-card--${variant}`,
    `ui-card--padding-${padding}`,
    hoverable && 'ui-card--hoverable',
    onClick && 'ui-card--clickable',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={classNames}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export const CardHeader = ({ children, className = '', action }) => (
  <div className={`ui-card__header ${className}`}>
    <div className="ui-card__header-content">{children}</div>
    {action && <div className="ui-card__header-action">{action}</div>}
  </div>
);

CardHeader.displayName = 'CardHeader';

export const CardBody = ({ children, className = '' }) => (
  <div className={`ui-card__body ${className}`}>{children}</div>
);

CardBody.displayName = 'CardBody';

export const CardFooter = ({ children, className = '' }) => (
  <div className={`ui-card__footer ${className}`}>{children}</div>
);

CardFooter.displayName = 'CardFooter';

export default Card;
