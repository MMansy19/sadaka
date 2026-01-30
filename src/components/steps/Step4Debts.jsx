import { Input } from '../Input';

export const Step4Debts = ({ data, updateField, addArrayItem, removeArrayItem }) => {
  const debts = data.debts || {};

  const updateFieldDirect = (field, value) => {
    updateField('debts', field, value);
  };

  const updateDebtsArray = (index, field, value) => {
    const newDebts = [...(debts.debts || [])];
    newDebts[index] = { ...newDebts[index], [field]: value };
    updateFieldDirect('debts', newDebts);
  };

  const debtTypeOptions = [
    { value: 'bank', label: 'بنك' },
    { value: 'microfinance', label: 'تمويل متناهي الصغر' },
    { value: 'shop', label: 'محل تجاري' },
    { value: 'individual', label: 'أفراد' },
    { value: 'utilities', label: 'فواتير خدمات' },
    { value: 'rent', label: 'إيجار' },
    { value: 'other', label: 'أخرى' }
  ];

  const addDebt = () => {
    const newDebts = [...(debts.debts || []), {
      id: crypto.randomUUID(),
      type: '',
      amount: 0,
      monthlyPayment: 0,
      creditor: '',
      description: ''
    }];
    updateFieldDirect('debts', newDebts);
  };

  return (
    <div className="step-container">
      <h2>الديون والقضايا</h2>

      <Input
        label="هل يوجد ديون؟"
        name="hasDebts"
        value={debts.hasDebts || false}
        onChange={(v) => updateFieldDirect('hasDebts', v)}
        type="checkbox"
      />

      {debts.hasDebts && (
        <div className="conditional-section">
          <div className="step-header-inline">
            <h3>قائمة الديون</h3>
            <button type="button" className="btn btn-primary btn-sm" onClick={addDebt}>
              + إضافة دين
            </button>
          </div>

          {(!debts.debts || debts.debts.length === 0) ? (
            <div className="empty-state">
              <p>لا يوجد ديون مسجلة.</p>
            </div>
          ) : (
            <div className="debts-list">
              {debts.debts.map((debt, index) => (
                <div key={debt.id} className="debt-card">
                  <div className="debt-header">
                    <h4>دين #{index + 1}</h4>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        const newDebts = debts.debts.filter(d => d.id !== debt.id);
                        updateFieldDirect('debts', newDebts);
                      }}
                    >
                      حذف
                    </button>
                  </div>
                  <div className="form-grid">
                    <Input
                      label="نوع الدين"
                      name={`debt-type-${debt.id}`}
                      value={debt.type || ''}
                      onChange={(v) => updateDebtsArray(index, 'type', v)}
                      type="select"
                      options={debtTypeOptions}
                    />
                    <Input
                      label="المبلغ الإجمالي (ج.م)"
                      name={`debt-amount-${debt.id}`}
                      value={debt.amount || 0}
                      onChange={(v) => updateDebtsArray(index, 'amount', parseFloat(v) || 0)}
                      type="number"
                      min={0}
                    />
                    <Input
                      label="القسط الشهري (ج.م)"
                      name={`debt-monthly-${debt.id}`}
                      value={debt.monthlyPayment || 0}
                      onChange={(v) => updateDebtsArray(index, 'monthlyPayment', parseFloat(v) || 0)}
                      type="number"
                      min={0}
                    />
                    <Input
                      label="الجهة الدائنة"
                      name={`debt-creditor-${debt.id}`}
                      value={debt.creditor || ''}
                      onChange={(v) => updateDebtsArray(index, 'creditor', v)}
                      type="text"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Input
        label="هل توجد قضايا قانونية؟"
        name="hasLegalCases"
        value={debts.hasLegalCases || false}
        onChange={(v) => updateFieldDirect('hasLegalCases', v)}
        type="checkbox"
      />
    </div>
  );
};
