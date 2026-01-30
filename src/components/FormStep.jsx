import React from 'react';

export const FormStep = ({ children, title, stepNumber, isActive, onClick }) => {
  return (
    <div
      className={`form-step ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="step-header">
        <span className="step-number">{stepNumber}</span>
        <h3 className="step-title">{title}</h3>
      </div>
      {isActive && <div className="step-content">{children}</div>}
    </div>
  );
};
