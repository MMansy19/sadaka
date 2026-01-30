import React, { useRef } from 'react';
import { formatCurrency, formatDate, formatDateTime } from '../utils';
import './CasePrint.css';

export const CasePrint = ({ data, onClose }) => {
  const basicInfo = data.basicInfo || {};
  const income = data.income || {};
  const expenses = data.expenses || {};
  const evaluation = data.evaluation || {};
  const housing = data.housing || {};
  const work = data.work || {};
  const previousMarriage = data.previousMarriage || {};
  const debts = data.debts || {};
  const appliances = data.appliances || {};

  const handlePrint = () => {
    window.print();
  };

  const getDecisionText = (dec) => {
    const decisions = {
      deserving: 'تستحق المساعدة',
      notDeserving: 'لا تستحق',
      needsFurtherInvestigation: 'تحتاج لمزيد من البحث',
      partial: 'مساعدة جزئية'
    };
    return decisions[dec] || 'قيد المراجعة';
  };

  const getMaritalStatus = (status) => {
    const statuses = {
      married: 'متزوج/ة',
      divorced: 'مطلق/ة',
      widowed: 'أرمل/ة',
      single: 'أعزب/عزباء'
    };
    return statuses[status] || status;
  };

  const getHousingType = (type) => {
    const types = {
      apartment: 'شقة',
      house: 'منزل مستقل',
      room: 'غرفة',
      shared: 'مشترك',
      homeless: 'بدون مسكن'
    };
    return types[type] || type;
  };

  const getOwnership = (owner) => {
    const owners = {
      owned: 'ملك',
      rented: 'إيجار',
      ceded: 'مقاربة',
      withRelative: 'مع أقارب',
      other: 'أخرى'
    };
    return owners[owner] || owner;
  };

  const netBalance = (income.totalIncome || 0) - (expenses.totalExpenses || 0);

  return (
    <div className="print-modal-overlay" onClick={onClose}>
      <div className="print-modal" onClick={e => e.stopPropagation()}>
        <div className="print-header-actions">
          <button className="print-btn" onClick={handlePrint}>
            طباعة
          </button>
          <button className="close-btn" onClick={onClose}>
            إغلاق
          </button>
        </div>

        <div className="print-container">
          {/* Page 1 */}
          <div className="print-page page-1">
            {/* Header */}
            <div className="print-header">
              <div className="org-logo">
                <div className="logo-icon">☪</div>
                <div className="org-name">جمعية البر والإحسان</div>
              </div>
              <div className="doc-title">استمارة تسجيل الحالة</div>
              <div className="doc-meta">
                <span>رقم الحالة: {data.id?.slice(0, 8) || '-'}</span>
                <span>التاريخ: {formatDate(data.createdAt)}</span>
              </div>
            </div>

            {/* Basic Info - Page 1 */}
            <div className="print-section">
              <div className="section-title">البيانات الأساسية</div>
              <table className="print-table">
                <tbody>
                  <tr>
                    <td className="label">الاسم الكامل</td>
                    <td className="value">{basicInfo.fullName || '-'}</td>
                    <td className="label">الرقم القومي</td>
                    <td className="value">{basicInfo.nationalId || '-'}</td>
                  </tr>
                  <tr>
                    <td className="label">رقم الهاتف</td>
                    <td className="value">{basicInfo.phone || '-'}</td>
                    <td className="label">الحالة الاجتماعية</td>
                    <td className="value">{getMaritalStatus(basicInfo.maritalStatus)}</td>
                  </tr>
                  <tr>
                    <td className="label">المحافظة</td>
                    <td className="value">{basicInfo.governorate || '-'}</td>
                    <td className="label">عدد أفراد الأسرة</td>
                    <td className="value">{basicInfo.familyMembersCount || 0}</td>
                  </tr>
                  <tr>
                    <td className="label full-row">العنوان</td>
                    <td className="value full-row" colSpan="3">{basicInfo.address || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Family Members - Page 1 */}
            <div className="print-section">
              <div className="section-title">أفراد الأسرة</div>
              {data.familyMembers?.length > 0 ? (
                <table className="print-table members-table">
                  <thead>
                    <tr>
                      <th>الاسم</th>
                      <th>صلة القرابة</th>
                      <th>العمر</th>
                      <th>المستوى التعليمي</th>
                      <th>المهنة</th>
                      <th>دخل شهري</th>
                      <th>يعيل الأسرة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.familyMembers.map(member => (
                      <tr key={member.id}>
                        <td>{member.name || '-'}</td>
                        <td>{member.relation || '-'}</td>
                        <td>{member.age || 0}</td>
                        <td>{member.education || '-'}</td>
                        <td>{member.occupation || '-'}</td>
                        <td>{formatCurrency(member.monthlyIncome || 0)}</td>
                        <td>{member.isDependent ? 'نعم' : 'لا'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="empty-data">لا يوجد أفراد مسجلين</div>
              )}
            </div>

            {/* Previous Marriage - Page 1 */}
            <div className="print-section">
              <div className="section-title">الزواج السابق</div>
              <table className="print-table compact">
                <tbody>
                  <tr>
                    <td className="label">هل سبق الزواج من قبل؟</td>
                    <td className="value">{previousMarriage.hasPreviousMarriage ? 'نعم' : 'لا'}</td>
                    <td className="label">عدد الزيجات السابقة</td>
                    <td className="value">{previousMarriage.numberOfMarriages || '-'}</td>
                  </tr>
                  <tr>
                    <td className="label">سبب الانفصال</td>
                    <td className="value" colSpan="3">{previousMarriage.separationReason || '-'}</td>
                  </tr>
                  <tr>
                    <td className="label full-row">تأثير الزواج السابق</td>
                    <td className="value full-row" colSpan="3">{previousMarriage.impactOnSituation || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Debts - Page 1 */}
            <div className="print-section">
              <div className="section-title">الديون والقضايا</div>
              <table className="print-table compact">
                <tbody>
                  <tr>
                    <td className="label">هل يوجد ديون؟</td>
                    <td className="value">{debts.hasDebts ? 'نعم' : 'لا'}</td>
                    <td className="label">هل توجد قضايا قانونية؟</td>
                    <td className="value">{debts.hasLegalCases ? 'نعم' : 'لا'}</td>
                  </tr>
                </tbody>
              </table>
              {debts.hasDebts && debts.debts?.length > 0 && (
                <table className="print-table nested-table">
                  <thead>
                    <tr>
                      <th>نوع الدين</th>
                      <th>المبلغ الإجمالي</th>
                      <th>القسط الشهري</th>
                      <th>الجهة الدائنة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {debts.debts.map(debt => (
                      <tr key={debt.id}>
                        <td>{debt.type || '-'}</td>
                        <td>{formatCurrency(debt.amount || 0)}</td>
                        <td>{formatCurrency(debt.monthlyPayment || 0)}</td>
                        <td>{debt.creditor || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Financial Summary - Page 1 */}
            <div className="print-section highlight-section">
              <div className="section-title">ملخص الحالة المالية</div>
              <div className="financial-grid">
                <div className="financial-item">
                  <span className="fin-label">إجمالي الدخل الشهري</span>
                  <span className="fin-value income">{formatCurrency(income.totalIncome || 0)}</span>
                </div>
                <div className="financial-item">
                  <span className="fin-label">إجمالي المصروفات</span>
                  <span className="fin-value expense">{formatCurrency(expenses.totalExpenses || 0)}</span>
                </div>
                <div className="financial-item">
                  <span className="fin-label">الفائض/العجز</span>
                  <span className={`fin-value ${netBalance >= 0 ? 'positive' : 'negative'}`}>
                    {formatCurrency(netBalance)}
                  </span>
                </div>
              </div>
            </div>

            {/* Page Footer */}
            <div className="page-footer">
              <div className="footer-line">توقيع الباحث: _________________</div>
              <div className="footer-line">التاريخ: _________________</div>
            </div>
          </div>

          {/* Page 2 */}
          <div className="print-page page-2">
            {/* Header */}
            <div className="print-header">
              <div className="org-logo">
                <div className="logo-icon">☪</div>
                <div className="org-name">جمعية البر والإحسان</div>
              </div>
              <div className="doc-title">استمارة تسجيل الحالة - صفحة 2</div>
              <div className="doc-meta">
                <span>رقم الحالة: {data.id?.slice(0, 8) || '-'}</span>
              </div>
            </div>

            {/* Work Status - Page 2 */}
            <div className="print-section">
              <div className="section-title">العمل والاستقرار</div>
              <table className="print-table compact">
                <tbody>
                  <tr>
                    <td className="label">عدد العاملين في الأسرة</td>
                    <td className="value">{work.workingMembersCount || 0}</td>
                    <td className="label">هل يوجد بالغ لا يستطيع العمل؟</td>
                    <td className="value">{work.unableToWork ? 'نعم' : 'لا'}</td>
                  </tr>
                  <tr>
                    <td className="label">هل تمتلك الأسرة مهارات؟</td>
                    <td className="value">{work.hasSkills ? 'نعم' : 'لا'}</td>
                    <td className="label">المهارات</td>
                    <td className="value">{(work.skills || []).join(', ') || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Housing - Page 2 */}
            <div className="print-section">
              <div className="section-title">السكن</div>
              <table className="print-table compact">
                <tbody>
                  <tr>
                    <td className="label">نوع السكن</td>
                    <td className="value">{getHousingType(housing.type)}</td>
                    <td className="label">الملكية</td>
                    <td className="value">{getOwnership(housing.ownership)}</td>
                  </tr>
                  <tr>
                    <td className="label">عدد الغرف</td>
                    <td className="value">{housing.roomsCount || 0}</td>
                    <td className="label">نوع الأرضية</td>
                    <td className="value">{housing.floorType || '-'}</td>
                  </tr>
                  <tr>
                    <td className="label">المرافق المتاحة</td>
                    <td className="value" colSpan="3">
                      {[
                        housing.hasBathroom !== false && 'حمام',
                        housing.hasKitchen !== false && 'مطبخ',
                        housing.hasElectricity !== false && 'كهرباء',
                        housing.hasWater !== false && 'مياه',
                        housing.hasGas !== false && 'غاز'
                      ].filter(Boolean).join(' - ') || '-'}
                    </td>
                  </tr>
                  <tr>
                    <td className="label full-row">ملاحظات</td>
                    <td className="value full-row" colSpan="3">{housing.notes || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Appliances - Page 2 */}
            <div className="print-section">
              <div className="section-title">الأجهزة والأثاث</div>
              <div className="appliances-list">
                <div className="appliance-item">
                  <span className="appliance-label">الأجهزة المتوفرة:</span>
                  <span className="appliance-value">
                    {(appliances.available || []).map(a => {
                      const names = {
                        tv: 'تلفاز',
                        refrigerator: 'ثلاجة',
                        washingMachine: 'غسالة',
                        microwave: 'ميكروويف',
                        ac: 'تكييف',
                        fan: 'مروحة',
                        cooker: 'بوتاجاز',
                        waterHeater: 'سخان',
                        computer: 'كمبيوتر',
                        internet: 'إنترنت'
                      };
                      return names[a] || a;
                    }).join(' - ') || 'لا يوجد'}
                  </span>
                </div>
              </div>
              {appliances.furniture?.length > 0 && (
                <table className="print-table nested-table">
                  <thead>
                    <tr>
                      <th>قطعة الأثاث</th>
                      <th>الحالة</th>
                      <th>العدد</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appliances.furniture.map(item => (
                      <tr key={item.id}>
                        <td>{item.item || '-'}</td>
                        <td>{item.condition || '-'}</td>
                        <td>{item.quantity || 1}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Evaluation - Page 2 */}
            <div className="print-section">
              <div className="section-title">التقييم والقرار النهائي</div>
              <table className="print-table">
                <tbody>
                  <tr>
                    <td className="label">اسم الباحث</td>
                    <td className="value">{evaluation.researcherName || '-'}</td>
                    <td className="label">تاريخ الزيارة</td>
                    <td className="value">{formatDate(evaluation.visitDate)}</td>
                  </tr>
                  <tr>
                    <td className="label full-row">ملخص التقييم</td>
                    <td className="value full-row" colSpan="3">{evaluation.summary || '-'}</td>
                  </tr>
                  <tr>
                    <td className="label">القرار</td>
                    <td className="value">{getDecisionText(evaluation.decision)}</td>
                    <td className="label">سبب القرار</td>
                    <td className="value">{evaluation.decisionReason || '-'}</td>
                  </tr>
                  <tr>
                    <td className="label">نوع المساعدة المقترحة</td>
                    <td className="value">{evaluation.recommendedAid || '-'}</td>
                    <td className="label">المبلغ المقترح</td>
                    <td className="value">{formatCurrency(evaluation.recommendedAmount || 0)}</td>
                  </tr>
                  <tr>
                    <td className="label">أولوية الحالة</td>
                    <td className="value">
                      {evaluation.priorityLevel === 'high' ? 'عالية' :
                       evaluation.priorityLevel === 'medium' ? 'متوسطة' :
                       evaluation.priorityLevel === 'low' ? 'منخفضة' : '-'}
                    </td>
                    <td className="label">تاريخ التقديم</td>
                    <td className="value">{formatDateTime(evaluation.submittedAt)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Signatures - Page 2 */}
            <div className="print-section signatures-section">
              <div className="section-title">التوقيعات</div>
              <div className="signatures-grid">
                <div className="signature-box">
                  <div className="signature-label">توقيع الباحث</div>
                  <div className="signature-line"></div>
                  <div className="signature-name">{evaluation.researcherName || '_________________'}</div>
                </div>
                <div className="signature-box">
                  <div className="signature-label">توقيع المشرف</div>
                  <div className="signature-line"></div>
                  <div className="signature-name">_________________</div>
                </div>
                <div className="signature-box">
                  <div className="signature-label">توقيع المتقدم</div>
                  <div className="signature-line"></div>
                  <div className="signature-name">{basicInfo.fullName || '_________________'}</div>
                </div>
              </div>
            </div>

            {/* Page Footer */}
            <div className="page-footer">
              <div className="footer-text">
                تم إعداد هذه الاستمارة وفقاً لمعايير جمعية البر والإحسان
              </div>
              <div className="footer-date">
                تاريخ الطباعة: {formatDateTime(new Date().toISOString())}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasePrint;
