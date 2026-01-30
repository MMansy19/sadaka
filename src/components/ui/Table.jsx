import React, { useState, useMemo, useCallback } from 'react';
import './Table.css';

export const Table = ({
  data,
  columns,
  keyExtractor,
  loading = false,
  emptyMessage = 'لا توجد بيانات',
  onRowClick,
  stickyHeader = false,
  className = ''
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = sortConfig.key.startsWith('.')
        ? sortConfig.key.slice(1).split('.').reduce((obj, key) => obj?.[key], a)
        : a[sortConfig.key];
      const bValue = sortConfig.key.startsWith('.')
        ? sortConfig.key.slice(1).split('.').reduce((obj, key) => obj?.[key], b)
        : b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  const renderCell = (row, column, index) => {
    if (column.render) {
      return column.render(row[column.key], row, index);
    }

    const value = column.key.startsWith('.')
      ? column.key.slice(1).split('.').reduce((obj, key) => obj?.[key], row)
      : row[column.key];

    return column.format ? column.format(value) : value;
  };

  if (loading) {
    return (
      <div className="ui-table__loading">
        <div className="ui-table__spinner" />
        <span>جاري التحميل...</span>
      </div>
    );
  }

  return (
    <div className={`ui-table-wrapper ${className}`}>
      <table className={`ui-table ${stickyHeader ? 'ui-table--sticky' : ''}`}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{ width: column.width }}
                onClick={() => column.sortable !== false && handleSort(column.key)}
                className={column.sortable !== false ? 'ui-table__th--sortable' : ''}
              >
                {column.title}
                {sortConfig.key === column.key && (
                  <span className="ui-table__sort-icon">
                    {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="ui-table__empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr
                key={keyExtractor ? keyExtractor(row) : rowIndex}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? 'ui-table__row--clickable' : ''}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {renderCell(row, column, rowIndex)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
