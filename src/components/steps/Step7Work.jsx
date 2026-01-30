import React from 'react';
import { Input } from '../Input';

export const Step7Work = ({ data, updateField }) => {
  const work = data.work || {};

  const updateFieldDirect = (field, value) => {
    updateField('work', field, value);
  };

  const reasonOptions = [
    { value: 'illness', label: 'مرض' },
    { value: 'disability', label: 'إعاقة' },
    { value: 'oldAge', label: 'كبر السن' },
    { value: 'noJobs', label: 'عدم توفر أعمال' },
    { value: 'caregiving', label: 'الاعمال المنزلية/رعاية' },
    { value: 'other', label: 'أخرى' }
  ];

  return (
    <div className="step-container">
      <h2>العمل والاستقرار</h2>

      <div className="form-grid">
        <Input
          label="عدد العاملين في الأسرة"
          name="workingMembersCount"
          value={work.workingMembersCount || 0}
          onChange={(v) => updateFieldDirect('workingMembersCount', parseInt(v) || 0)}
          type="number"
          min={0}
        />
      </div>

      <Input
        label="هل يوجد بالغ لا يستطيع العمل؟"
        name="unableToWork"
        value={work.unableToWork || false}
        onChange={(v) => updateFieldDirect('unableToWork', v)}
        type="checkbox"
      />

      {work.unableToWork && (
        <div className="conditional-section">
          <Input
            label="أسباب عدم القدرة على العمل"
            name="unableToWorkReasons"
            value={work.unableToWorkReasons || []}
            onChange={(v) => updateFieldDirect('unableToWorkReasons', [v])}
            type="checkbox"
            options={reasonOptions}
          />
        </div>
      )}

      <Input
        label="هل تمتلك الأسرة مهارات يمكن توظيفها؟"
        name="hasSkills"
        value={work.hasSkills || false}
        onChange={(v) => updateFieldDirect('hasSkills', v)}
        type="checkbox"
      />

      {work.hasSkills && (
        <div className="conditional-section">
          <Input
            label="المهارات"
            name="skills"
            value={(work.skills || []).join(', ')}
            onChange={(v) => updateFieldDirect('skills', v.split(',').map(s => s.trim()))}
            type="textarea"
            placeholder="اذكر المهارات مفصولة بفواصل"
          />
        </div>
      )}
    </div>
  );
};
