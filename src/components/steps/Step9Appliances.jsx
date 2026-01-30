import React from 'react';
import { Input } from '../Input';

export const Step9Appliances = ({ data, updateField, addArrayItem, removeArrayItem }) => {
  const appliances = data.appliances || {};

  const updateFieldDirect = (field, value) => {
    updateField('appliances', field, value);
  };

  const updateFurnitureArray = (index, field, value) => {
    const newFurniture = [...(appliances.furniture || [])];
    newFurniture[index] = { ...newFurniture[index], [field]: value };
    updateFieldDirect('furniture', newFurniture);
  };

  const applianceList = [
    { key: 'tv', label: 'تلفاز' },
    { key: 'refrigerator', label: 'ثلاجة' },
    { key: 'washingMachine', label: 'غسالة' },
    { key: 'microwave', label: 'ميكروويف' },
    { key: 'ac', label: 'تكييف' },
    { key: 'fan', label: 'مروحة' },
    { key: 'cooker', label: 'بوتاجاز' },
    { key: 'waterHeater', label: 'سخان' },
    { key: 'computer', label: 'كمبيوتر' },
    { key: 'internet', label: 'إنترنت' }
  ];

  const conditionOptions = [
    { value: 'excellent', label: 'ممتاز' },
    { value: 'good', label: 'جيد' },
    { value: 'fair', label: 'متوسط' },
    { value: 'poor', label: 'سيء' }
  ];

  const toggleAppliance = (key) => {
    const current = appliances.available || [];
    if (current.includes(key)) {
      updateFieldDirect('available', current.filter(k => k !== key));
    } else {
      updateFieldDirect('available', [...current, key]);
    }
  };

  const addFurniture = () => {
    const newFurniture = [...(appliances.furniture || []), {
      id: crypto.randomUUID(),
      item: '',
      condition: 'good',
      quantity: 1
    }];
    updateFieldDirect('furniture', newFurniture);
  };

  return (
    <div className="step-container">
      <h2>الأجهزة والأثاث</h2>

      <div className="appliances-section">
        <h4>الأجهزة المتوفرة</h4>
        <div className="appliances-grid">
          {applianceList.map(appliance => (
            <label key={appliance.key} className="appliance-item">
              <input
                type="checkbox"
                checked={(appliances.available || []).includes(appliance.key)}
                onChange={() => toggleAppliance(appliance.key)}
              />
              <span>{appliance.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="furniture-section">
        <div className="step-header-inline">
          <h4>الأثاث</h4>
          <button type="button" className="btn btn-primary btn-sm" onClick={addFurniture}>
            + إضافة أثاث
          </button>
        </div>

        {(!appliances.furniture || appliances.furniture.length === 0) ? (
          <div className="empty-state">
            <p>لا يوجد أثاث مسجل.</p>
          </div>
        ) : (
          <div className="furniture-list">
            {(appliances.furniture || []).map((item, index) => (
              <div key={item.id} className="furniture-card">
                <div className="furniture-row">
                  <Input
                    label="قطعة الأثاث"
                    name={`furniture-item-${item.id}`}
                    value={item.item || ''}
                    onChange={(v) => updateFurnitureArray(index, 'item', v)}
                    type="text"
                    placeholder="اسم قطعة الأثاث"
                  />
                  <Input
                    label="الحالة"
                    name={`furniture-condition-${item.id}`}
                    value={item.condition || 'good'}
                    onChange={(v) => updateFurnitureArray(index, 'condition', v)}
                    type="select"
                    options={conditionOptions}
                  />
                  <Input
                    label="العدد"
                    name={`furniture-quantity-${item.id}`}
                    value={item.quantity || 1}
                    onChange={(v) => updateFurnitureArray(index, 'quantity', parseInt(v) || 1)}
                    type="number"
                    min={1}
                  />
                  <button
                    type="button"
                    className="btn btn-danger btn-sm remove-btn"
                    onClick={() => {
                      const newFurniture = appliances.furniture.filter(f => f.id !== item.id);
                      updateFieldDirect('furniture', newFurniture);
                    }}
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
