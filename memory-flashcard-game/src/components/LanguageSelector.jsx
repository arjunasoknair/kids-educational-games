import React from 'react';

const LanguageSelector = ({ language, onChange }) => {
  return (
    <div style={{ minWidth: 180 }}>
      <label style={{ fontWeight: 600, color: '#6c63ff', marginBottom: 4, display: 'block', fontSize: '1.05rem' }}>Language</label>
      <select
        value={language}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '0.5rem 1rem',
          borderRadius: 8,
          border: '2px solid #cce0ff',
          background: '#fff',
          color: '#333',
          fontSize: '1.1rem',
          fontWeight: 500,
          outline: 'none',
          boxShadow: '0 1px 4px #0001',
          appearance: 'none',
          cursor: 'pointer',
        }}
      >
        <option value="en">English Only</option>
        <option value="ml">Malayalam Only</option>
        <option value="both">Both</option>
      </select>
    </div>
  );
};

export default LanguageSelector; 