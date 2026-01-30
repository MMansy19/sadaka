import React from 'react';
import { Input } from '../Input';

export const Step3PreviousMarriage = ({ data, updateField }) => {
  const previousMarriage = data.previousMarriage || {};

  const updateFieldDirect = (field, value) => {
    updateField('previousMarriage', field, value);
  };

  const separationOptions = [
    { value: 'divorce', label: 'طلاق' },
    { value: 'death', label: 'وفاة' },
    { value: 'separation', label: 'هجر' },
    { value: 'other', label: 'أخرى' }
  ];

  return (
    <div className="step-container">
      <h2>الزواج السابق</h2>

      <Input
        label="هل سبق الزواج من قبل؟"
        name="hasPreviousMarriage"
        value={previousMarriage.hasPreviousMarriage || false}
        onChange={(v) => updateFieldDirect('hasPreviousMarriage', v)}
        type="checkbox"
      />

      {previousMarriage.hasPreviousMarriage && (
        <div className="conditional-section">
          <div className="form-grid">
            <Input
              label="عدد الزيجات السابقة"
              name="numberOfMarriages"
              value={previousMarriage.numberOfMarriages || 1}
              onChange={(v) => updateFieldDirect('numberOfMarriages', parseInt(v) || 1)}
              type="number"
              min={1}
            />
            <Input
              label="سبب الانفصال"
              name="separationReason"
              value={previousMarriage.separationReason || ''}
              onChange={(v) => updateFieldDirect('separationReason', v)}
              type="select"
              options={separationOptions}
            />
          </div>
          <Input
            label="تأثير الزواج السابق على الحالة الحالية"
            name="impactOnSituation"
            value={previousMarriage.impactOnSituation || ''}
            onChange={(v) => updateFieldDirect('impactOnSituation', v)}
            type="textarea"
            placeholder="اشرح كيف يؤثر الزواج السابق على الوضع الحالي..."
          />
        </div>
      )}
    </div>
  );
};
