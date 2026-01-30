import React from 'react';

export const Input = ({ label, name, value, onChange, type = "text", error, required, placeholder, options, ...props }) => {
  if (type === 'select') {
    return (
      <div className="form-group">
        {label && <label htmlFor={name}>{label} {required && <span className="required">*</span>}</label>}
        <select name={name} value={value || ''} onChange={(e) => onChange(e.target.value)} required={required} className={error ? 'error' : ''}>
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
        <textarea name={name} value={value || ''} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} rows={props.rows || 3} className={error ? 'error' : ''} />
        {error && <span className="error-message">{error}</span>}
      </div>
    );
  }

  if (type === 'checkbox') {
    return (
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name={name}
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
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
                type="radio"
                name={name}
                value={opt.value}
                checked={value === opt.value}
                onChange={(e) => onChange(e.target.value)}
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
          name={name}
          value={value || 0}
          onChange={(e) => onChange(e.target.value)}
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
        name={name}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        required={required}
        className={error ? 'error' : ''}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};
