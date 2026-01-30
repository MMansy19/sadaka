import React, { forwardRef } from 'react';
import './Button.css';

export const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  ...props
}, ref) => {
  const classNames = [
    'ui-button',
    `ui-button--${variant}`,
    `ui-button--${size}`,
    fullWidth && 'ui-button--full-width',
    loading && 'ui-button--loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="ui-button__spinner" />
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="ui-button__icon">{icon}</span>
      )}
      <span className="ui-button__text">{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="ui-button__icon">{icon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
