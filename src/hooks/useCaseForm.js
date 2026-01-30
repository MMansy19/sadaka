import { useState, useEffect, useCallback } from 'react';
import { getEmptyCase } from '../schema/caseSchema';
import { calculateTotalIncome, calculateTotalExpenses } from '../utils/calculations';

const STORAGE_KEY = 'sadaka_cases_draft';

export const useCaseForm = (caseId = null) => {
  const [formData, setFormData] = useState(() => getEmptyCase());
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(parsed);
        setCurrentStep(parsed._currentStep || 0);
      } catch (e) {
        console.error('Failed to load draft:', e);
      }
    }
  }, []);

  // Auto-save to localStorage
  const saveDraft = useCallback(async () => {
    setIsSaving(true);
    const dataToSave = {
      ...formData,
      _currentStep: currentStep
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));

    // Also save to cases list
    const cases = JSON.parse(localStorage.getItem('sadaka_cases') || '[]');
    const existingIndex = cases.findIndex(c => c.id === formData.id);
    if (existingIndex >= 0) {
      cases[existingIndex] = dataToSave;
    } else {
      cases.push(dataToSave);
    }
    localStorage.setItem('sadaka_cases', JSON.stringify(cases));

    setLastSaved(new Date());
    setIsSaving(false);
  }, [formData, currentStep]);

  // Auto-save whenever formData or currentStep changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft();
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData, saveDraft]);

  // Calculate totals automatically
  useEffect(() => {
    const sources = formData.income?.sources || {};
    const items = formData.expenses?.items || {};
    const totalIncome = calculateTotalIncome(sources);
    const totalExpenses = calculateTotalExpenses(items);

    if (totalIncome !== (formData.income?.totalIncome) || totalExpenses !== (formData.expenses?.totalExpenses)) {
      setFormData(prev => ({
        ...prev,
        income: { ...(prev.income || {}), totalIncome, sources: sources },
        expenses: { ...(prev.expenses || {}), totalExpenses, items: items }
      }));
    }
  }, [formData.income?.sources, formData.expenses?.items]);

  const updateField = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      },
      updatedAt: new Date().toISOString()
    }));
    // Clear error for this field
    if (errors[`${section}.${field}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${section}.${field}`];
        return newErrors;
      });
    }
  };

  const updateNestedField = (section, subsection, field, value) => {
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

  const updateArrayItem = (section, itemId, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: (prev[section] || []).map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      ),
      updatedAt: new Date().toISOString()
    }));
  };

  const addArrayItem = (section, item) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), { ...item, id: crypto.randomUUID() }],
      updatedAt: new Date().toISOString()
    }));
  };

  const removeArrayItem = (section, itemId) => {
    setFormData(prev => ({
      ...prev,
      [section]: (prev[section] || []).filter(item => item.id !== itemId),
      updatedAt: new Date().toISOString()
    }));
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const resetForm = () => {
    const newCase = getEmptyCase();
    setFormData(newCase);
    setCurrentStep(0);
    setErrors({});
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    formData,
    setFormData,
    currentStep,
    setCurrentStep,
    errors,
    setErrors,
    isSaving,
    lastSaved,
    updateField,
    updateNestedField,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
    goToStep,
    nextStep,
    prevStep,
    resetForm,
    saveDraft
  };
};
