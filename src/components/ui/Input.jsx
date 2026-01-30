import React, { forwardRef } from 'react';
import './Input.css';

export const Input = forwardRef(({
  label,
  error,
  helperText,
  type = 'text',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  required = false,
  icon,
  iconPosition = 'left',
  className = '',
  options = [],
  rows = 3,
  value,
  onChange,
  ...props
}, ref) => {
  const wrapperClassNames = [
    'ui-input-wrapper',
    fullWidth && 'ui-input-wrapper--full-width',
    error && 'ui-input-wrapper--error',
    disabled && 'ui-input-wrapper--disabled',
    className
  ].filter(Boolean).join(' ');

  const handleChange = (e) => {
    if (type === 'checkbox') {
      onChange?.(e.target.checked);
    } else if (type === 'number') {
      onChange?.(e.target.value);
    } else {
      onChange?.(e.target.value);
    }
  };

  const renderInput = () => {
    if (type === 'select') {
      return (
        <div className="ui-input__select-wrapper">
          <select
            ref={ref}
            className="ui-input ui-input--select"
            disabled={disabled}
            required={required}
            value={value || ''}
            onChange={handleChange}
            {...props}
          >
            <option value="">اختر...</option>
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {icon && <span className="ui-input__icon">{icon}</span>}
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <textarea
          ref={ref}
          className="ui-input"
          rows={rows}
          disabled={disabled}
          required={required}
          value={value || ''}
          onChange={handleChange}
          {...props}
        />
      );
    }

    if (type === 'checkbox') {
      return (
        <label className="ui-input__checkbox">
          <input
            ref={ref}
            type="checkbox"
            disabled={disabled}
            checked={!!value}
            onChange={handleChange}
          />
          <span className="ui-input__checkbox-label">{label}</span>
        </label>
      );
    }

    if (type === 'radio') {
      return (
        <div className="ui-input__radio-group">
          <span className="ui-input__radio-label">{label} {required && <span className="required">*</span>}</span>
          <div className="ui-input__radio-options">
            {options.map((opt, i) => (
              <label key={i} className="ui-input__radio-option">
                <input
                  type="radio"
                  disabled={disabled}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={handleChange}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="ui-input__field-wrapper">
        {icon && iconPosition === 'left' && (
          <span className="ui-input__icon">{icon}</span>
        )}
        <input
          ref={ref}
          type={type}
          className="ui-input"
          disabled={disabled}
          required={required}
          value={value === undefined || value === null ? '' : value}
          onChange={handleChange}
          dir={type === 'number' ? 'ltr' : undefined}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <span className="ui-input__icon">{icon}</span>
        )}
      </div>
    );
  };

  return (
    <div className={wrapperClassNames}>
      {type !== 'checkbox' && type !== 'radio' && label && (
        <label className="ui-input__label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      {renderInput()}
      {error && <span className="ui-input__error">{error}</span>}
      {helperText && !error && <span className="ui-input__helper">{helperText}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
