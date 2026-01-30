import React from 'react';

export const Input = React.forwardRef(({ label, name, value, onChange, type = "text", error, required, placeholder, options, ...props }, ref) => {
  const handleChange = (e) => {
    if (type === 'checkbox') {
      onChange(e.target.checked);
    } else if (type === 'number') {
      onChange(e.target.value);
    } else {
      onChange(e.target.value);
    }
  };

  if (type === 'select') {
    return (
      <div className="form-group">
        {label && <label htmlFor={name}>{label} {required && <span className="required">*</span>}</label>}
        <select
          ref={ref}
          name={name}
          value={value || ''}
          onChange={handleChange}
          required={required}
          className={error ? 'error' : ''}
        >
          <option value="">اختر...</option>
          {options?.map((opt, i) => (
            <option key={i} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="form-group">
        {label && <label htmlFor={name}>{label} {required && <span className="required">*</span>}</label>}
        <textarea
          ref={ref}
          name={name}
          value={value || ''}
          onChange={handleChange}
          required={required}
          placeholder={placeholder}
          rows={props.rows || 3}
          className={error ? 'error' : ''}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }

  if (type === 'checkbox') {
    return (
      <div className="form-group checkbox-group">
        <label>
          <input
            ref={ref}
            type="checkbox"
            name={name}
            checked={!!value}
            onChange={handleChange}
          />
          {label}
        </label>
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }

  if (type === 'radio') {
    return (
      <div className="form-group radio-group">
        <label>{label} {required && <span className="required">*</span>}</label>
        <div className="radio-options">
          {options?.map((opt, i) => (
            <label key={i} className="radio-option">
              <input
                ref={ref}
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={handleChange}
              />
              {opt.label}
            </label>
          ))}
        </div>
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }

  if (type === 'number') {
    return (
      <div className="form-group">
        {label && <label htmlFor={name}>{label} {required && <span className="required">*</span>}</label>}
        <input
          ref={ref}
          name={name}
          value={value === undefined || value === null ? '' : value}
          onChange={handleChange}
          type="number"
          placeholder={placeholder}
          required={required}
          dir="ltr"
          className={error ? 'error' : ''}
          {...props}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }

  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label} {required && <span className="required">*</span>}</label>}
      <input
        ref={ref}
        name={name}
        value={value || ''}
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        required={required}
        className={error ? 'error' : ''}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
