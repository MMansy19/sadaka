import React from 'react';
import { formatCurrency } from '../../utils';

export const Step11Review = ({ data }) => {
  // Safely extract values with fallbacks
  const basicInfo = data.basicInfo || {};
  const income = data.income || {};
  const expenses = data.expenses || {};
  const evaluation = data.evaluation || {};

  // Ensure all values are primitive types
  const fullName = String(basicInfo.fullName || '');
  const nationalId = String(basicInfo.nationalId || '');
  const address = String(basicInfo.address || '');
  const familyMembersCount = Number(basicInfo.familyMembersCount) || 0;
  const totalIncome = Number(income.totalIncome) || 0;
  const totalExpenses = Number(expenses.totalExpenses) || 0;
  const netBalance = totalIncome - totalExpenses;
  const decision = String(evaluation.decision || '');
  const decisionReason = String(evaluation.decisionReason || '');

  const familyMembersCountVal = Array.isArray(data.familyMembers) ? data.familyMembers.length : 0;
  const debtsCount = Array.isArray(data.debts?.debts) ? data.debts.debts.length : 0;
  const appliancesCount = Array.isArray(data.appliances?.available) ? data.appliances.available.length : 0;

  const steps = [
    { title: 'البيانات الأساسية', key: 'basicInfo' },
    { title: 'أفراد الأسرة', key: 'familyMembers', count: familyMembersCountVal },
    { title: 'الزواج السابق', key: 'previousMarriage' },
    { title: 'الديون', key: 'debts', count: debtsCount },
    { title: 'الدخل', key: 'income', value: totalIncome },
    { title: 'المصروفات', key: 'expenses', value: totalExpenses },
    { title: 'العمل', key: 'work' },
    { title: 'السكن', key: 'housing' },
    { title: 'الأجهزة والأثاث', key: 'appliances', count: appliancesCount },
    { title: 'التقييم', key: 'evaluation', decision: decision }
  ];

  const getDecisionText = (dec) => {
    if (dec === 'deserving') return '✓ تستحق';
    if (dec === 'notDeserving') return '✗ لا تستحق';
    if (dec === 'needsFurtherInvestigation') return '○ تحتاج مراجعة';
    if (dec === 'partial') return '△ مساعدة جزئية';
    return '○ قيد المراجعة';
  };

  const getDecisionBadge = (dec) => {
    if (dec === 'deserving') return '✓ تستحق المساعدة';
    if (dec === 'notDeserving') return '✗ لا تستحق';
    if (dec === 'needsFurtherInvestigation') return '○ تحتاج مراجعة';
    if (dec === 'partial') return '△ مساعدة جزئية';
    return '';
  };

  return (
    <div className="step-container">
      <h2>مراجعة وإرسال</h2>

      <div className="review-summary">
        <div className="review-card">
          <h3>ملخص الحالة</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="label">الاسم:</span>
              <span className="value">{fullName || '-'}</span>
            </div>
            <div className="summary-item">
              <span className="label">الرقم القومي:</span>
              <span className="value">{nationalId || '-'}</span>
            </div>
            <div className="summary-item">
              <span className="label">العنوان:</span>
              <span className="value">{address || '-'}</span>
            </div>
            <div className="summary-item">
              <span className="label">عدد أفراد الأسرة:</span>
              <span className="value">{familyMembersCount}</span>
            </div>
          </div>
        </div>

        <div className="review-card">
          <h3>الحالة المالية</h3>
          <div className="summary-grid financial">
            <div className="summary-item income">
              <span className="label">إجمالي الدخل:</span>
              <span className="value">{formatCurrency(totalIncome)}</span>
            </div>
            <div className="summary-item expenses">
              <span className="label">إجمالي المصروفات:</span>
              <span className="value">{formatCurrency(totalExpenses)}</span>
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
                {step.count !== undefined && step.count > 0 && (
                  <span className="check-info">({step.count})</span>
                )}
                {step.value !== undefined && (
                  <span className="check-value">{formatCurrency(step.value)}</span>
                )}
                {step.decision && (
                  <span className={`check-decision ${step.decision === 'deserving' ? 'deserving' : ''}`}>
                    {getDecisionText(step.decision)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="review-card">
          <h3>القرار النهائي</h3>
          <div className="final-decision">
            {decision ? (
              <>
                <div className={`decision-badge ${decision}`}>
                  {getDecisionBadge(decision)}
                </div>
                <p className="decision-reason">{decisionReason || 'لا يوجد سبب مسجل'}</p>
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
