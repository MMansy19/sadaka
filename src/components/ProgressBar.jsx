export const ProgressBar = ({ currentStep, totalSteps, steps, goToStep }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleStepClick = (index) => {
    if (goToStep) {
      goToStep(index);
    }
  };

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
            onClick={() => handleStepClick(index)}
            title={step.title}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};
