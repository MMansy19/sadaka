import React from 'react';
import './ProgressBar.css';

export const ProgressBar = ({
  currentStep,
  totalSteps,
  steps = [],
  goToStep,
  showLabels = true,
  size = 'medium'
}) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleStepClick = (index) => {
    if (goToStep) {
      goToStep(index);
    }
  };

  return (
    <div className={`ui-progress-bar ui-progress-bar--${size}`}>
      {showLabels && (
        <div className="ui-progress-bar__info">
          <span>الخطوة {currentStep + 1} من {totalSteps}</span>
          <span>{steps[currentStep]?.title || ''}</span>
        </div>
      )}
      <div className="ui-progress-bar__track">
        <div
          className="ui-progress-bar__fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="ui-progress-bar__steps">
        {steps.map((step, index) => (
          <button
            key={index}
            type="button"
            className={`ui-progress-bar__step ${
              index < currentStep ? 'completed' : ''
            } ${index === currentStep ? 'current' : ''}`}
            onClick={() => handleStepClick(index)}
            title={step.title}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
