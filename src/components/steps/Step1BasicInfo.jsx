import React from 'react';
import { Input } from '../Input';

export const Step1BasicInfo = ({ data, updateField, errors }) => {
  const basicInfo = data.basicInfo || {};

  const maritalStatusOptions = [
    { value: 'married', label: 'متزوج/ة' },
    { value: 'divorced', label: 'مطلق/ة' },
    { value: 'widowed', label: 'أرمل/ة' },
    { value: 'single', label: 'أعزب/عزباء' }
  ];

  const governorates = [
    'القاهرة', 'الإسكندرية', 'الجيزة', 'القليوبية', 'المنوفية', 'الشرقية',
    'الدقهلية', 'كفر الشيخ', 'الغربية', 'البحيرة', 'الإسماعيلية', 'السويس',
    'بورسعيد', 'شمال سيناء', 'جنوب سيناء', 'البحر الأحمر', 'أسيوط', 'المنيا',
    'بني سويف', 'الفيوم', 'سوهاج', 'قنا', 'الأقصر', 'أسوان', 'الوادي الجديد',
    'مرسى مطروح', 'العامرية', 'الزقازيق', 'العريش', 'رأس غارب', 'دهب', 'نويبع'
  ];

  return (
    <div className="step-container">
      <h2>البيانات الأساسية</h2>
      <div className="form-grid">
        <Input
          label="الرقم القومي"
          name="nationalId"
          value={basicInfo.nationalId || ''}
          onChange={(v) => updateField('basicInfo', 'nationalId', v)}
          type="text"
          required
          placeholder="أدخل الرقم القومي (14 رقم)"
        />
        <Input
          label="الاسم الكامل"
          name="fullName"
          value={basicInfo.fullName || ''}
          onChange={(v) => updateField('basicInfo', 'fullName', v)}
          type="text"
          required
          placeholder="أدخل الاسم الكامل"
        />
        <Input
          label="رقم الهاتف"
          name="phone"
          value={basicInfo.phone || ''}
          onChange={(v) => updateField('basicInfo', 'phone', v)}
          type="tel"
          required
          placeholder="أدخل رقم الهاتف (11 رقم)"
        />
        <Input
          label="المحافظة"
          name="governorate"
          value={basicInfo.governorate || ''}
          onChange={(v) => updateField('basicInfo', 'governorate', v)}
          type="select"
          options={governorates.map(g => ({ value: g, label: g }))}
          required
        />
        <Input
          label="العنوان الكامل"
          name="address"
          value={basicInfo.address || ''}
          onChange={(v) => updateField('basicInfo', 'address', v)}
          type="textarea"
          required
          placeholder="أدخل العنوان بالتفصيل"
        />
        <Input
          label="الحالة الاجتماعية"
          name="maritalStatus"
          value={basicInfo.maritalStatus || ''}
          onChange={(v) => updateField('basicInfo', 'maritalStatus', v)}
          type="select"
          options={maritalStatusOptions}
          required
        />
        <Input
          label="عدد أفراد الأسرة"
          name="familyMembersCount"
          value={basicInfo.familyMembersCount || 1}
          onChange={(v) => updateField('basicInfo', 'familyMembersCount', parseInt(v) || 1)}
          type="number"
          min={1}
          required
        />
        <Input
          label="نوع الحالة"
          name="caseType"
          value={basicInfo.caseType || 'new'}
          onChange={(v) => updateField('basicInfo', 'caseType', v)}
          type="select"
          options={[
            { value: 'new', label: 'جديدة' },
            { value: 'followUp', label: 'متابعة' },
            { value: 'urgent', label: 'عاجلة' }
          ]}
        />
      </div>
    </div>
  );
};
