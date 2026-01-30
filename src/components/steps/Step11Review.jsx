import React from 'react';
import { formatCurrency } from '../../utils/calculations';

export const Step11Review = ({ data }) => {
  const basicInfo = data.basicInfo || {};
  const income = data.income || {};
  const expenses = data.expenses || {};
  const evaluation = data.evaluation || {};

  const netBalance = (income.totalIncome || 0) - (expenses.totalExpenses || 0);

  const steps = [
    { title: 'البيانات الأساسية', key: 'basicInfo' },
    { title: 'أفراد الأسرة', key: 'familyMembers', count: (data.familyMembers || []).length },
    { title: 'الزواج السابق', key: 'previousMarriage' },
    { title: 'الديون', key: 'debts', count: (data.debts?.debts || []).length },
    { title: 'الدخل', key: 'income', value: income.totalIncome },
    { title: 'المصروفات', key: 'expenses', value: expenses.totalExpenses },
    { title: 'العمل', key: 'work' },
    { title: 'السكن', key: 'housing' },
    { title: 'الأجهزة والأثاث', key: 'appliances', count: (data.appliances?.available || []).length },
    { title: 'التقييم', key: 'evaluation', decision: evaluation.decision }
  ];

  return (
    <div className="step-container">
      <h2>مراجعة وإرسال</h2>

      <div className="review-summary">
        <div className="review-card">
          <h3>ملخص الحالة</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="label">الاسم:</span>
              <span className="value">{basicInfo.fullName || '-'}</span>
            </div>
            <div className="summary-item">
              <span className="label">الرقم القومي:</span>
              <span className="value">{basicInfo.nationalId || '-'}</span>
            </div>
            <div className="summary-item">
              <span className="label">العنوان:</span>
              <span className="value">{basicInfo.address || '-'}</span>
            </div>
            <div className="summary-item">
              <span className="label">عدد أفراد الأسرة:</span>
              <span className="value">{basicInfo.familyMembersCount || 0}</span>
            </div>
          </div>
        </div>

        <div className="review-card">
          <h3>الحالة المالية</h3>
          <div className="summary-grid financial">
            <div className="summary-item income">
              <span className="label">إجمالي الدخل:</span>
              <span className="value">{formatCurrency(income.totalIncome || 0)}</span>
            </div>
            <div className="summary-item expenses">
              <span className="label">إجمالي المصروفات:</span>
              <span className="value">{formatCurrency(expenses.totalExpenses || 0)}</span>
            </div>
            <div className={`summary-item balance ${netBalance >= 0 ? 'positive' : 'negative'}`}>
              <span className="label">الفائض/العجز:</span>
              <span className="value">{formatCurrency(netBalance)}</span>
            </div>
          </div>
        </div>

        <div className="review-card">
          <h3>قائمة المراجعة</h3>
          <div className="checklist">
            {steps.map((step, index) => (
              <div key={step.key} className="checklist-item">
                <span className="check-number">{index + 1}</span>
                <span className="check-title">{step.title}</span>
                {step.count !== undefined && (
                  <span className="check-info">({step.count})</span>
                )}
                {step.value !== undefined && (
                  <span className="check-value">{formatCurrency(step.value)}</span>
                )}
                {step.decision && (
                  <span className={`check-decision ${step.decision === 'deserving' ? 'deserving' : ''}`}>
                    {step.decision === 'deserving' ? '✓ تستحق' : '○ قيد المراجعة'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="review-card">
          <h3>القرار النهائي</h3>
          <div className="final-decision">
            {evaluation.decision ? (
              <>
                <div className={`decision-badge ${evaluation.decision}`}>
                  {evaluation.decision === 'deserving' && '✓ تستحق المساعدة'}
                  {evaluation.decision === 'notDeserving' && '✗ لا تستحق'}
                  {evaluation.decision === 'needsFurtherInvestigation' && '○ تحتاج مراجعة'}
                  {evaluation.decision === 'partial' && '△ مساعدة جزئية'}
                </div>
                <p className="decision-reason">{evaluation.decisionReason || 'لا يوجد سبب مسجل'}</p>
              </>
            ) : (
              <p className="no-decision">لم يتم اتخاذ قرار بعد</p>
            )}
          </div>
        </div>
      </div>

      <div className="review-notice">
        <p>✓ تم حفظ جميع البيانات تلقائياً</p>
        <p>✓ يمكنك العودة لأي خطوة لتعديل البيانات</p>
      </div>
    </div>
  );
};
