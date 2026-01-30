import React from 'react';
import { Input, Button } from '../ui';

export const Step2FamilyMembers = ({ data, updateArrayItem, addArrayItem, removeArrayItem }) => {
  const familyMembers = data.familyMembers || [];

  const relationOptions = [
    { value: 'spouse', label: 'زوج/ة' },
    { value: 'son', label: 'ابن' },
    { value: 'daughter', label: 'ابنة' },
    { value: 'father', label: 'أب' },
    { value: 'mother', label: 'أم' },
    { value: 'brother', label: 'أخ' },
    { value: 'sister', label: 'أخت' },
    { value: 'other', label: 'آخر' }
  ];

  const educationOptions = [
    { value: 'none', label: 'بدون' },
    { value: 'primary', label: 'ابتدائي' },
    { value: 'middle', label: 'إعدادي' },
    { value: 'secondary', label: 'ثانوي' },
    { value: 'university', label: 'جامعي' },
    { value: 'higher', label: 'دراسات عليا' }
  ];

  const addMember = () => {
    addArrayItem('familyMembers', {
      name: '',
      relation: '',
      age: 0,
      education: '',
      occupation: '',
      monthlyIncome: 0,
      isDependent: true
    });
  };

  return (
    <div className="step-container">
      <div className="step-header-inline">
        <h2>أفراد الأسرة</h2>
        <Button variant="primary" onClick={addMember}>
          + إضافة فرد
        </Button>
      </div>

      {familyMembers.length === 0 ? (
        <div className="empty-state">
          <p>لا يوجد أفراد مسجلين. اضغط على "إضافة فرد" لإضافة أحد أفراد الأسرة.</p>
        </div>
      ) : (
        <div className="members-list">
          {familyMembers.map((member) => (
            <div key={member.id} className="member-card">
              <div className="member-header">
                <h4>فرد</h4>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeArrayItem('familyMembers', member.id)}
                >
                  حذف
                </Button>
              </div>
              <div className="form-grid">
                <Input
                  label="الاسم"
                  name={`name-${member.id}`}
                  value={member.name || ''}
                  onChange={(v) => updateArrayItem('familyMembers', member.id, 'name', v)}
                  type="text"
                  required
                />
                <Input
                  label="صلة القرابة"
                  name={`relation-${member.id}`}
                  value={member.relation || ''}
                  onChange={(v) => updateArrayItem('familyMembers', member.id, 'relation', v)}
                  type="select"
                  options={relationOptions}
                  required
                />
                <Input
                  label="العمر"
                  name={`age-${member.id}`}
                  value={member.age || 0}
                  onChange={(v) => updateArrayItem('familyMembers', member.id, 'age', parseInt(v) || 0)}
                  type="number"
                  min={0}
                  max={120}
                  required
                />
                <Input
                  label="المستوى التعليمي"
                  name={`education-${member.id}`}
                  value={member.education || ''}
                  onChange={(v) => updateArrayItem('familyMembers', member.id, 'education', v)}
                  type="select"
                  options={educationOptions}
                />
                <Input
                  label="المهنة"
                  name={`occupation-${member.id}`}
                  value={member.occupation || ''}
                  onChange={(v) => updateArrayItem('familyMembers', member.id, 'occupation', v)}
                  type="text"
                />
                <Input
                  label="الدخل الشهري (ج.م)"
                  name={`monthlyIncome-${member.id}`}
                  value={member.monthlyIncome || 0}
                  onChange={(v) => updateArrayItem('familyMembers', member.id, 'monthlyIncome', parseFloat(v) || 0)}
                  type="number"
                  min={0}
                />
                <Input
                  label="يعيل الأسرة"
                  name={`isDependent-${member.id}`}
                  value={member.isDependent !== false}
                  onChange={(v) => updateArrayItem('familyMembers', member.id, 'isDependent', v)}
                  type="checkbox"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
