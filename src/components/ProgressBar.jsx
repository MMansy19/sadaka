import React from 'react';

export const ProgressBar = ({ currentStep, totalSteps, steps }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span>الخطوة {currentStep + 1} من {totalSteps}</span>
        <span>{steps[currentStep]?.title || ''}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="steps-indicator">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step-dot ${index <= currentStep ? 'completed' : ''} ${index === currentStep ? 'current' : ''}`}
            onClick={() => index <= currentStep}
            title={step.title}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};
