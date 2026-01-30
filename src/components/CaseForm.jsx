import React from 'react';
import { useCaseForm } from '../hooks/useCaseForm';
import { ProgressBar } from './ProgressBar';
import { Step1BasicInfo } from './steps/Step1BasicInfo';
import { Step2FamilyMembers } from './steps/Step2FamilyMembers';
import { Step3PreviousMarriage } from './steps/Step3PreviousMarriage';
import { Step4Debts } from './steps/Step4Debts';
import { Step5Income } from './steps/Step5Income';
import { Step6Expenses } from './steps/Step6Expenses';
import { Step7Work } from './steps/Step7Work';
import { Step8Housing } from './steps/Step8Housing';
import { Step9Appliances } from './steps/Step9Appliances';
import { Step10Evaluation } from './steps/Step10Evaluation';
import { Step11Review } from './steps/Step11Review';

const steps = [
  { title: 'البيانات الأساسية', component: Step1BasicInfo },
  { title: 'أفراد الأسرة', component: Step2FamilyMembers },
  { title: 'الزواج السابق', component: Step3PreviousMarriage },
  { title: 'الديون والقضايا', component: Step4Debts },
  { title: 'مصادر الدخل', component: Step5Income },
  { title: 'المصروفات', component: Step6Expenses },
  { title: 'العمل', component: Step7Work },
  { title: 'السكن', component: Step8Housing },
  { title: 'الأجهزة والأثاث', component: Step9Appliances },
  { title: 'التقييم', component: Step10Evaluation },
  { title: 'المراجعة', component: Step11Review }
];

export const CaseForm = () => {
  const {
    formData,
    setFormData,
    currentStep,
    isSaving,
    lastSaved,
    nextStep,
    prevStep,
    goToStep,
    resetForm
  } = useCaseForm();

  const CurrentStepComponent = steps[currentStep].component;

  const handleSubmit = () => {
    // Mark as submitted
    const updatedData = {
      ...formData,
      status: 'submitted',
      evaluation: {
        ...(formData.evaluation || {}),
        submittedAt: new Date().toISOString()
      }
    };

    // Save to localStorage
    const cases = JSON.parse(localStorage.getItem('sadaka_cases') || '[]');
    const existingIndex = cases.findIndex(c => c.id === formData.id);
    if (existingIndex >= 0) {
      cases[existingIndex] = updatedData;
    } else {
      cases.push(updatedData);
    }
    localStorage.setItem('sadaka_cases', JSON.stringify(cases));

    alert('تم إرسال الحالة بنجاح!');
    clearAllAndReset();
  };

  const clearAllAndReset = () => {
    // Clear all localStorage
    localStorage.removeItem('sadaka_cases_draft');
    localStorage.removeItem('sadaka_cases');
    // Force a full page reload to reset everything
    window.location.reload();
  };

  // Update a top-level field
  const updateField = (section, field, value) => {
    // Ensure value is a primitive type
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      console.warn('Attempted to set object as field value:', field, value);
      return;
    }
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      },
      updatedAt: new Date().toISOString()
    }));
  };

  // Update a nested field (section.subsection.field)
  const updateNestedField = (section, subsection, field, value) => {
    // Ensure value is a primitive type
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      console.warn('Attempted to set object as nested field value:', field, value);
      return;
    }
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [subsection]: {
          ...((prev[section]?.[subsection]) || {}),
          [field]: value
        }
      },
      updatedAt: new Date().toISOString()
    }));
  };

  // Update an item in an array
  const updateArrayItem = (section, itemId, field, value) => {
    // Ensure value is a primitive type
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      console.warn('Attempted to set object as array item value:', field, value);
      return;
    }
    setFormData(prev => ({
      ...prev,
      [section]: (prev[section] || []).map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      ),
      updatedAt: new Date().toISOString()
    }));
  };

  // Add an item to an array
  const addArrayItem = (section, item) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), { ...item, id: crypto.randomUUID() }],
      updatedAt: new Date().toISOString()
    }));
  };

  // Remove an item from an array
  const removeArrayItem = (section, itemId) => {
    setFormData(prev => ({
      ...prev,
      [section]: (prev[section] || []).filter(item => item.id !== itemId),
      updatedAt: new Date().toISOString()
    }));
  };

  return (
    <div className="case-form">
      <header className="form-header">
        <h1>نظام إدارة الحالات</h1>
        <p>تسجيل وتقييم الحالات المستفيدة</p>
      </header>

      <ProgressBar
        currentStep={currentStep}
        totalSteps={steps.length}
        steps={steps}
        goToStep={goToStep}
      />

      <div className="form-content">
        <CurrentStepComponent
          data={formData}
          updateField={updateField}
          updateNestedField={updateNestedField}
          updateArrayItem={updateArrayItem}
          addArrayItem={addArrayItem}
          removeArrayItem={removeArrayItem}
        />
      </div>

      <div className="form-actions">
        <div className="actions-left">
          {currentStep > 0 && (
            <button className="btn btn-secondary" onClick={prevStep}>
              السابق
            </button>
          )}
          <button className="btn btn-outline" onClick={clearAllAndReset}>
            حالة جديدة
          </button>
        </div>

        <div className="actions-center">
          {isSaving ? (
            <span className="save-status saving">جاري الحفظ...</span>
          ) : lastSaved ? (
            <span className="save-status saved">
              آخر حفظ: {lastSaved.toLocaleTimeString('ar-EG')}
            </span>
          ) : null}
        </div>

        <div className="actions-right">
          {currentStep < steps.length - 1 ? (
            <button className="btn btn-primary" onClick={nextStep}>
              التالي
            </button>
          ) : (
            <button className="btn btn-success" onClick={handleSubmit}>
              إرسال الحالة
            </button>
          )}
        </div>
      </div>

      <footer className="form-footer">
        <p>جميع البيانات محفوظة تلقائياً | {String(formData.basicInfo?.fullName || 'حالة جديدة')}</p>
      </footer>
    </div>
  );
};
