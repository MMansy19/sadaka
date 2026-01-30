import React from 'react';
import { Input } from '../ui';
import { formatCurrency } from '../../utils';

export const Step6Expenses = ({ data, updateNestedField }) => {
  const expenses = data.expenses || {};
  const items = expenses.items || {};

  const updateExpenseItem = (field, value) => {
    updateNestedField('expenses', 'items', field, parseFloat(value) || 0);
  };

  const expenseItems = [
    { key: 'food', label: 'الطعام' },
    { key: 'treatment', label: 'العلاج' },
    { key: 'rent', label: 'الإيجار' },
    { key: 'education', label: 'التعليم' },
    { key: 'utilities', label: 'المرافق (كهرباء/مياه/غاز)' },
    { key: 'transportation', label: 'المواصلات' },
    { key: 'clothing', label: 'الملابس' },
    { key: 'other', label: 'أخرى' }
  ];

  const income = data.income || {};
  const netBalance = (income.totalIncome || 0) - (expenses.totalExpenses || 0);
  const balanceClass = netBalance >= 0 ? 'positive' : 'negative';

  return (
    <div className="step-container">
      <h2>المصروفات</h2>

      <div className="form-grid">
        {expenseItems.map(expense => (
          <Input
            key={expense.key}
            label={expense.label}
            name={`expense-${expense.key}`}
            value={items[expense.key] || 0}
            onChange={(v) => updateExpenseItem(expense.key, v)}
            type="number"
            min={0}
            placeholder="0"
          />
        ))}
      </div>

      <div className="totals-grid">
        <div className="total-box expense-total">
          <span className="total-label">إجمالي المصروفات:</span>
          <span className="total-value">{formatCurrency(expenses.totalExpenses || 0)}</span>
        </div>
        <div className={`total-box balance-total ${balanceClass}`}>
          <span className="total-label">الفائض/العجز:</span>
          <span className="total-value">{formatCurrency(netBalance)}</span>
        </div>
      </div>
    </div>
  );
};
