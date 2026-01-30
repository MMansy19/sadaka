import React, { useState, useEffect, useMemo } from 'react';
import { formatCurrency, formatDate } from '../utils';
import { Button, Card, CardBody, Badge, StatsCard } from './ui';
import { CasePrint } from './CasePrint';

// Mock data for demonstration
const MOCK_CASES = [
  {
    id: '1',
    basicInfo: {
      nationalId: '29501011234567',
      fullName: 'أحمد محمد علي',
      phone: '01012345678',
      governorate: 'القاهرة',
      address: '15 شارع التحرير، وسط البلد',
      maritalStatus: 'married',
      familyMembersCount: 4,
      caseType: 'new'
    },
    familyMembers: [
      { id: 'm1', name: 'سارة أحمد', relation: 'spouse', age: 32, isDependent: true },
      { id: 'm2', name: 'عمر أحمد', relation: 'son', age: 8, isDependent: true }
    ],
    income: {
      sources: { salary: 3500, business: 0, pension: 0, charity: 0, assistance: 0, rent: 0, other: 0 },
      totalIncome: 3500
    },
    expenses: {
      items: { food: 1500, treatment: 200, rent: 800, education: 300, utilities: 300, transportation: 200, clothing: 200, other: 100 },
      totalExpenses: 3600
    },
    evaluation: {
      decision: 'deserving',
      recommendedAmount: 500,
      priorityLevel: 'high'
    },
    status: 'approved',
    createdAt: '2025-01-15T10:30:00Z'
  },
  {
    id: '2',
    basicInfo: {
      nationalId: '29502021234567',
      fullName: 'فاطمة علي Hassan',
      phone: '01098765432',
      governorate: 'الإسكندرية',
      address: '7 شارع البحر، المنتزه',
      maritalStatus: 'widowed',
      familyMembersCount: 3,
      caseType: 'urgent'
    },
    familyMembers: [
      { id: 'm3', name: 'مريم أحمد', relation: 'daughter', age: 12, isDependent: true },
      { id: 'm4', name: 'أحمد أحمد', relation: 'son', age: 15, isDependent: true }
    ],
    income: {
      sources: { salary: 0, business: 0, pension: 800, charity: 500, assistance: 300, rent: 0, other: 0 },
      totalIncome: 1600
    },
    expenses: {
      items: { food: 1000, treatment: 400, rent: 600, education: 200, utilities: 200, transportation: 150, clothing: 150, other: 50 },
      totalExpenses: 2750
    },
    evaluation: {
      decision: 'deserving',
      recommendedAmount: 1000,
      priorityLevel: 'urgent'
    },
    status: 'underReview',
    createdAt: '2025-01-20T14:15:00Z'
  },
  {
    id: '3',
    basicInfo: {
      nationalId: '29503031234567',
      fullName: 'عمر إبراهيم',
      phone: '01111223344',
      governorate: 'الجيزة',
      address: '25 مجمع النصر، الهرم',
      maritalStatus: 'single',
      familyMembersCount: 1,
      caseType: 'followUp'
    },
    familyMembers: [],
    income: {
      sources: { salary: 0, business: 1200, pension: 0, charity: 0, assistance: 0, rent: 0, other: 200 },
      totalIncome: 1400
    },
    expenses: {
      items: { food: 600, treatment: 100, rent: 400, education: 0, utilities: 150, transportation: 100, clothing: 100, other: 50 },
      totalExpenses: 1500
    },
    evaluation: {
      decision: 'partial',
      recommendedAmount: 200,
      priorityLevel: 'low'
    },
    status: 'closed',
    createdAt: '2025-01-10T09:00:00Z'
  },
  {
    id: '4',
    basicInfo: {
      nationalId: '29504041234567',
      fullName: 'خالد أحمد Mohammed',
      phone: '01222334455',
      governorate: 'المنوفية',
      address: '3 عزبة السلام، شبين الكوم',
      maritalStatus: 'divorced',
      familyMembersCount: 5,
      caseType: 'new'
    },
    familyMembers: [
      { id: 'm5', name: 'منى خالد', relation: 'daughter', age: 10, isDependent: true },
      { id: 'm6', name: 'ياسين خالد', relation: 'son', age: 7, isDependent: true },
      { id: 'm7', name: 'فاطمة خالد', relation: 'daughter', age: 4, isDependent: true }
    ],
    income: {
      sources: { salary: 2500, business: 0, pension: 0, charity: 300, assistance: 0, rent: 0, other: 0 },
      totalIncome: 2800
    },
    expenses: {
      items: { food: 1800, treatment: 300, rent: 700, education: 150, utilities: 400, transportation: 250, clothing: 300, other: 100 },
      totalExpenses: 5000
    },
    evaluation: {
      decision: 'deserving',
      recommendedAmount: 1500,
      priorityLevel: 'high'
    },
    status: 'submitted',
    createdAt: '2025-01-25T16:45:00Z'
  },
  {
    id: '5',
    basicInfo: {
      nationalId: '29505051234567',
      fullName: 'سارة عبد الرحمن',
      phone: '01155667788',
      governorate: 'طنطا',
      address: '12 شارع سعيد، وسط البلد',
      maritalStatus: 'married',
      familyMembersCount: 6,
      caseType: 'urgent'
    },
    familyMembers: [
      { id: 'm8', name: 'عبد الله', relation: 'son', age: 16, isDependent: true },
      { id: 'm9', name: 'مريم', relation: 'daughter', age: 14, isDependent: true },
      { id: 'm10', name: 'أحمد', relation: 'son', age: 11, isDependent: true },
      { id: 'm11', name: 'فاطمة', relation: 'daughter', age: 6, isDependent: true }
    ],
    income: {
      sources: { salary: 4000, business: 0, pension: 0, charity: 0, assistance: 0, rent: 0, other: 0 },
      totalIncome: 4000
    },
    expenses: {
      items: { food: 2500, treatment: 500, rent: 1000, education: 400, utilities: 500, transportation: 300, clothing: 400, other: 200 },
      totalExpenses: 5800
    },
    evaluation: {
      decision: 'needsFurtherInvestigation',
      recommendedAmount: 0,
      priorityLevel: 'medium'
    },
    status: 'rejected',
    createdAt: '2025-01-18T11:20:00Z'
  }
];

const STATUS_LABELS = {
  draft: 'مسودة',
  submitted: 'مقدم',
  underReview: 'قيد المراجعة',
  approved: 'موافق',
  rejected: 'مرفوض',
  closed: 'مغلق'
};

export const CasesList = ({ onNewCase, onViewCase }) => {
  const [cases, setCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showStats, setShowStats] = useState(true);
  const [printCase, setPrintCase] = useState(null);

  // Load cases from localStorage or use mock data
  useEffect(() => {
    const savedCases = localStorage.getItem('sadaka_cases');
    if (savedCases && savedCases !== '[]') {
      try {
        const parsed = JSON.parse(savedCases);
        setCases(parsed);
      } catch (e) {
        setCases(MOCK_CASES);
      }
    } else {
      setCases(MOCK_CASES);
      localStorage.setItem('sadaka_cases', JSON.stringify(MOCK_CASES));
    }
  }, []);

  // Filter and search cases
  const filteredCases = useMemo(() => {
    let result = [...cases];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(c =>
        String(c.basicInfo?.fullName || '').toLowerCase().includes(term) ||
        String(c.basicInfo?.nationalId || '').includes(term) ||
        String(c.basicInfo?.phone || '').includes(term)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(c => c.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      result = result.filter(c => c.evaluation?.priorityLevel === priorityFilter);
    }

    // Date filter
    const today = new Date();
    if (dateFilter === 'today') {
      result = result.filter(c => {
        const date = new Date(c.createdAt);
        return date.toDateString() === today.toDateString();
      });
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      result = result.filter(c => new Date(c.createdAt) >= weekAgo);
    } else if (dateFilter === 'month') {
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      result = result.filter(c => new Date(c.createdAt) >= monthAgo);
    }

    // Sort
    result.sort((a, b) => {
      let aVal, bVal;
      if (sortBy === 'fullName') {
        aVal = String(a.basicInfo?.fullName || '').toLowerCase();
        bVal = String(b.basicInfo?.fullName || '').toLowerCase();
      } else if (sortBy === 'status') {
        aVal = a.status || '';
        bVal = b.status || '';
      } else if (sortBy === 'date') {
        aVal = new Date(a.createdAt || 0).getTime();
        bVal = new Date(b.createdAt || 0).getTime();
      } else {
        aVal = new Date(a.createdAt || 0).getTime();
        bVal = new Date(b.createdAt || 0).getTime();
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return result;
  }, [cases, searchTerm, statusFilter, priorityFilter, dateFilter, sortBy, sortOrder]);

  // Statistics
  const stats = useMemo(() => {
    const total = cases.length;
    const byStatus = {};
    const byPriority = {};
    let totalIncome = 0;
    let totalRecommended = 0;

    cases.forEach(c => {
      // By status
      byStatus[c.status] = (byStatus[c.status] || 0) + 1;
      // By priority
      const priority = c.evaluation?.priorityLevel || 'unknown';
      byPriority[priority] = (byPriority[priority] || 0) + 1;
      // Totals
      totalIncome += Number(c.income?.totalIncome) || 0;
      totalRecommended += Number(c.evaluation?.recommendedAmount) || 0;
    });

    return { total, byStatus, byPriority, totalIncome, totalRecommended };
  }, [cases]);

  return (
    <div className="cases-list">
      <header className="cases-header">
        <h1>قائمة الحالات</h1>
        <Button variant="primary" onClick={onNewCase}>
          + حالة جديدة
        </Button>
      </header>

      {/* Statistics Dashboard */}
      {showStats && (
        <div className="stats-dashboard">
          <StatsCard
            title="إجمالي الحالات"
            value={stats.total}
            icon="📋"
            variant="primary"
          />
          <StatsCard
            title="الدخل الإجمالي"
            value={formatCurrency(stats.totalIncome)}
            icon="💰"
            variant="success"
          />
          <StatsCard
            title="المساعدة المقترحة"
            value={formatCurrency(stats.totalRecommended)}
            icon="🤝"
            variant="warning"
          />
          <StatsCard
            title="الحالة Approved"
            value={stats.byStatus.approved || 0}
            icon="✅"
            variant="success"
          />
          <StatsCard
            title="قيد المراجعة"
            value={stats.byStatus.underReview || 0}
            icon="⏳"
            variant="warning"
          />
          <StatsCard
            title="أولوية عالية"
            value={stats.byPriority.high || 0}
            icon="⚠️"
            variant="danger"
          />
        </div>
      )}

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="بحث بالاسم أو الرقم القومي أو الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filters-row">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">جميع الحالات</option>
            <option value="draft">مسودة</option>
            <option value="submitted">مقدم</option>
            <option value="underReview">قيد المراجعة</option>
            <option value="approved">موافق</option>
            <option value="rejected">مرفوض</option>
            <option value="closed">مغلق</option>
          </select>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="all">جميع الأولويات</option>
            <option value="high">عالية</option>
            <option value="medium">متوسطة</option>
            <option value="low">منخفضة</option>
          </select>
          <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
            <option value="all">جميع التواريخ</option>
            <option value="today">اليوم</option>
            <option value="week">آخر أسبوع</option>
            <option value="month">آخر شهر</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">تاريخ الإنشاء</option>
            <option value="fullName">الاسم</option>
            <option value="status">الحالة</option>
          </select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowStats(!showStats)}
          >
            {showStats ? 'إخفاء الإحصائيات' : 'إظهار الإحصائيات'}
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className="results-count">
        تم العثور على {filteredCases.length} حالة
      </div>

      {/* Cases Table */}
      <div className="cases-table-container">
        <table className="cases-table">
          <thead>
            <tr>
              <th>#</th>
              <th>الاسم</th>
              <th>الرقم القومي</th>
              <th>المحافظة</th>
              <th>الأفراد</th>
              <th>الدخل</th>
              <th>الحالة</th>
              <th>الأولوية</th>
              <th>التاريخ</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((caseItem, index) => (
              <tr key={caseItem.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="case-name">{caseItem.basicInfo?.fullName || '-'}</div>
                  <div className="case-phone">{caseItem.basicInfo?.phone || ''}</div>
                </td>
                <td className="national-id">{caseItem.basicInfo?.nationalId || '-'}</td>
                <td>{caseItem.basicInfo?.governorate || '-'}</td>
                <td>{caseItem.basicInfo?.familyMembersCount || 0}</td>
                <td>{formatCurrency(caseItem.income?.totalIncome || 0)}</td>
                <td>
                  <Badge variant={caseItem.status === 'approved' ? 'success' : caseItem.status === 'rejected' ? 'danger' : caseItem.status === 'underReview' ? 'warning' : 'default'}>
                    {STATUS_LABELS[caseItem.status] || caseItem.status}
                  </Badge>
                </td>
                <td>
                  <Badge variant={caseItem.evaluation?.priorityLevel === 'high' ? 'danger' : caseItem.evaluation?.priorityLevel === 'medium' ? 'warning' : 'default'}>
                    {caseItem.evaluation?.priorityLevel === 'high' ? 'عالية' :
                     caseItem.evaluation?.priorityLevel === 'medium' ? 'متوسطة' :
                     caseItem.evaluation?.priorityLevel === 'low' ? 'منخفضة' : '-'}
                  </Badge>
                </td>
                <td>{formatDate(caseItem.createdAt)}</td>
                <td>
                  <div className="action-buttons">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewCase(caseItem)}
                    >
                      عرض
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPrintCase(caseItem)}
                    >
                      طباعة
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCases.length === 0 && (
        <div className="no-results">
          <p>لا توجد حالات تطابق معايير البحث</p>
        </div>
      )}

      {printCase && (
        <CasePrint data={printCase} onClose={() => setPrintCase(null)} />
      )}
    </div>
  );
};

export default CasesList;
