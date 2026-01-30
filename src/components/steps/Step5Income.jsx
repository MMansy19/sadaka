import React from 'react';
import { Input } from '../ui';
import { formatCurrency } from '../../utils';

export const Step5Income = ({ data, updateNestedField }) => {
  const income = data.income || {};
  const sources = income.sources || {};

  const updateIncomeSource = (field, value) => {
    updateNestedField('income', 'sources', field, parseFloat(value) || 0);
  };

  const incomeSources = [
    { key: 'salary', label: 'راتب' },
    { key: 'business', label: 'مشروع خاص' },
    { key: 'pension', label: 'معاش' },
    { key: 'charity', label: 'صدقات' },
    { key: 'assistance', label: 'مساعدات' },
    { key: 'rent', label: 'إيجار' },
    { key: 'other', label: 'أخرى' }
  ];

  return (
    <div className="step-container">
      <h2>مصادر الدخل</h2>

      <div className="form-grid">
        {incomeSources.map(source => (
          <Input
            key={source.key}
            label={source.label}
            name={`income-${source.key}`}
            value={sources[source.key] || 0}
            onChange={(v) => updateIncomeSource(source.key, v)}
            type="number"
            min={0}
            placeholder="0"
          />
        ))}
      </div>

      <div className="total-box income-total">
        <span className="total-label">إجمالي الدخل الشهري:</span>
        <span className="total-value">{formatCurrency(income.totalIncome || 0)}</span>
      </div>
    </div>
  );
};
