import React from 'react';
import { Input } from '../ui';

export const Step8Housing = ({ data, updateField }) => {
  const housing = data.housing || {};

  const updateFieldDirect = (field, value) => {
    updateField('housing', field, value);
  };

  const typeOptions = [
    { value: 'apartment', label: 'شقة' },
    { value: 'house', label: 'منزل مستقل' },
    { value: 'room', label: 'غرفة' },
    { value: 'shared', label: 'مشترك' },
    { value: 'homeless', label: 'بدون مسكن' }
  ];

  const ownershipOptions = [
    { value: 'owned', label: 'ملك' },
    { value: 'rented', label: 'إيجار' },
    { value: 'ceded', label: 'مقاربة' },
    { value: 'withRelative', label: 'مع أقارب' },
    { value: 'other', label: 'أخرى' }
  ];

  const floorOptions = [
    { value: 'tile', label: 'بلاط' },
    { value: 'cement', label: 'أسمنت' },
    { value: 'earth', label: 'تراب' },
    { value: 'wood', label: 'خشب' },
    { value: 'other', label: 'أخرى' }
  ];

  const wallConditionOptions = [
    { value: 'good', label: 'جيدة' },
    { value: 'medium', label: 'متوسطة' },
    { value: 'poor', label: 'سيئة' }
  ];

  return (
    <div className="step-container">
      <h2>السكن</h2>

      <div className="form-grid">
        <Input
          label="نوع السكن"
          name="type"
          value={housing.type || ''}
          onChange={(v) => updateFieldDirect('type', v)}
          type="select"
          options={typeOptions}
        />
        <Input
          label="الملكية"
          name="ownership"
          value={housing.ownership || ''}
          onChange={(v) => updateFieldDirect('ownership', v)}
          type="select"
          options={ownershipOptions}
        />
        <Input
          label="عدد الغرف"
          name="roomsCount"
          value={housing.roomsCount || 0}
          onChange={(v) => updateFieldDirect('roomsCount', parseInt(v) || 0)}
          type="number"
          min={0}
        />
        <Input
          label="نوع الأرضية"
          name="floorType"
          value={housing.floorType || ''}
          onChange={(v) => updateFieldDirect('floorType', v)}
          type="select"
          options={floorOptions}
        />
        <Input
          label="حالة الجدران"
          name="wallCondition"
          value={housing.wallCondition || 'good'}
          onChange={(v) => updateFieldDirect('wallCondition', v)}
          type="select"
          options={wallConditionOptions}
        />
      </div>

      <div className="utilities-grid">
        <h4>المرافق المتاحة</h4>
        <div className="utility-items">
          <Input
            label="حمام"
            name="hasBathroom"
            value={housing.hasBathroom !== false}
            onChange={(v) => updateFieldDirect('hasBathroom', v)}
            type="checkbox"
          />
          <Input
            label="مطبخ"
            name="hasKitchen"
            value={housing.hasKitchen !== false}
            onChange={(v) => updateFieldDirect('hasKitchen', v)}
            type="checkbox"
          />
          <Input
            label="كهرباء"
            name="hasElectricity"
            value={housing.hasElectricity !== false}
            onChange={(v) => updateFieldDirect('hasElectricity', v)}
            type="checkbox"
          />
          <Input
            label="مياه"
            name="hasWater"
            value={housing.hasWater !== false}
            onChange={(v) => updateFieldDirect('hasWater', v)}
            type="checkbox"
          />
          <Input
            label="غاز"
            name="hasGas"
            value={housing.hasGas !== false}
            onChange={(v) => updateFieldDirect('hasGas', v)}
            type="checkbox"
          />
        </div>
      </div>

      <Input
        label="ملاحظات إضافية"
        name="notes"
        value={housing.notes || ''}
        onChange={(v) => updateFieldDirect('notes', v)}
        type="textarea"
        placeholder="أي ملاحظات حول السكن..."
      />
    </div>
  );
};
