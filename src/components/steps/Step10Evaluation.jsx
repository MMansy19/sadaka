import React from 'react';
import { Input } from '../ui';

export const Step10Evaluation = ({ data, updateField }) => {
  const evaluation = data.evaluation || {};

  const updateFieldDirect = (field, value) => {
    updateField('evaluation', field, value);
  };

  const decisionOptions = [
    { value: 'deserving', label: 'تستحق المساعدة' },
    { value: 'notDeserving', label: 'لا تستحق' },
    { value: 'needsFurtherInvestigation', label: 'تحتاج لمزيد من البحث' },
    { value: 'partial', label: 'مساعدة جزئية' }
  ];

  const aidOptions = [
    { value: 'monthly', label: 'مساعدة شهرية' },
    { value: 'once', label: 'مساعدة مرة واحدة' },
    { value: 'food', label: 'طرود غذائية' },
    { value: 'clothing', label: 'ملابس' },
    { value: 'medical', label: 'علاج' },
    { value: 'housing', label: 'سكن' },
    { value: 'none', label: 'لا شيء' },
    { value: 'other', label: 'أخرى' }
  ];

  const priorityOptions = [
    { value: 'high', label: 'عالية' },
    { value: 'medium', label: 'متوسطة' },
    { value: 'low', label: 'منخفضة' }
  ];

  return (
    <div className="step-container">
      <h2>التقييم والقرار النهائي</h2>

      <div className="form-grid">
        <Input
          label="اسم الباحث"
          name="researcherName"
          value={evaluation.researcherName || ''}
          onChange={(v) => updateFieldDirect('researcherName', v)}
          type="text"
          required
        />
        <Input
          label="تاريخ الزيارة"
          name="visitDate"
          value={evaluation.visitDate || ''}
          onChange={(v) => updateFieldDirect('visitDate', v)}
          type="date"
        />
      </div>

      <Input
        label="ملخص التقييم"
        name="summary"
        value={evaluation.summary || ''}
        onChange={(v) => updateFieldDirect('summary', v)}
        type="textarea"
        placeholder="اكتب ملخصاً شاملاً لتقييم الحالة..."
        rows={4}
      />

      <div className="form-grid">
        <Input
          label="القرار"
          name="decision"
          value={evaluation.decision || ''}
          onChange={(v) => updateFieldDirect('decision', v)}
          type="select"
          options={decisionOptions}
          required
        />
        <Input
          label="سبب القرار"
          name="decisionReason"
          value={evaluation.decisionReason || ''}
          onChange={(v) => updateFieldDirect('decisionReason', v)}
          type="textarea"
          placeholder="اشرح سبب القرار..."
        />
      </div>

      <div className="form-grid">
        <Input
          label="نوع المساعدة المقترحة"
          name="recommendedAid"
          value={evaluation.recommendedAid || ''}
          onChange={(v) => updateFieldDirect('recommendedAid', v)}
          type="select"
          options={aidOptions}
        />
        <Input
          label="المبلغ المقترح (ج.م)"
          name="recommendedAmount"
          value={evaluation.recommendedAmount || 0}
          onChange={(v) => updateFieldDirect('recommendedAmount', parseFloat(v) || 0)}
          type="number"
          min={0}
        />
        <Input
          label="أولوية الحالة"
          name="priorityLevel"
          value={evaluation.priorityLevel || 'medium'}
          onChange={(v) => updateFieldDirect('priorityLevel', v)}
          type="select"
          options={priorityOptions}
        />
      </div>

      <div className="signatures-section">
        <h4>التوقيعات</h4>
        <div className="form-grid">
          <Input
            label="توقيع الباحث"
            name="signatures-researcher"
            value={(evaluation.signatures || {}).researcher || ''}
            onChange={(v) => updateFieldDirect('signatures', { ...(evaluation.signatures || {}), researcher: v })}
            type="text"
            placeholder="التوقيع"
          />
          <Input
            label="توقيع المشرف"
            name="signatures-supervisor"
            value={(evaluation.signatures || {}).supervisor || ''}
            onChange={(v) => updateFieldDirect('signatures', { ...(evaluation.signatures || {}), supervisor: v })}
            type="text"
            placeholder="التوقيع"
          />
          <Input
            label="توقيع المتقدم"
            name="signatures-applicant"
            value={(evaluation.signatures || {}).applicant || ''}
            onChange={(v) => updateFieldDirect('signatures', { ...(evaluation.signatures || {}), applicant: v })}
            type="text"
            placeholder="التوقيع"
          />
        </div>
      </div>
    </div>
  );
};
