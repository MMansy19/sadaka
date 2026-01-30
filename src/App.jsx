import React, { useState, useEffect } from 'react';
import { CaseForm } from './components/CaseForm';
import CasesList from './components/CasesList';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'form'
  const [selectedCase, setSelectedCase] = useState(null);

  // Load saved view preference
  useEffect(() => {
    const savedView = localStorage.getItem('sadaka_view');
    if (savedView) {
      setCurrentView(savedView);
    }
  }, []);

  const switchView = (view) => {
    setCurrentView(view);
    localStorage.setItem('sadaka_view', view);
  };

  const handleNewCase = () => {
    setSelectedCase(null);
    switchView('form');
  };

  const handleViewCase = (caseData) => {
    setSelectedCase(caseData);
    switchView('form');
  };

  const handleBackToList = () => {
    setSelectedCase(null);
    switchView('list');
  };

  return (
    <div className="app">
      {currentView === 'list' ? (
        <CasesList
          onNewCase={handleNewCase}
          onViewCase={handleViewCase}
        />
      ) : (
        <div className="form-view">
          <div className="form-nav">
            <button className="btn btn-outline" onClick={handleBackToList}>
              ← العودة للقائمة
            </button>
            <span className="nav-title">{selectedCase ? 'عرض الحالة' : 'حالة جديدة'}</span>
          </div>
          <CaseForm initialData={selectedCase} />
        </div>
      )}
    </div>
  );
}

export default App;
