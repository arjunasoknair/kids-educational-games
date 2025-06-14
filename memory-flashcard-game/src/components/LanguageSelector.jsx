import React from 'react';

const labelStyle = {
  fontSize: '1.05rem',
  fontWeight: 600,
  color: '#6c63ff',
  marginBottom: 4,
  display: 'block',
};

const selectStyle = {
  width: '100%',
  padding: '0.5rem 2.2rem 0.5rem 1rem', // extra right padding for chevron
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
  transition: 'border-color 0.2s',
};

const chevronStyle = {
  position: 'absolute',
  right: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  fontSize: '1.1rem',
  color: '#6c63ff',
};

const wrapperStyle = {
  position: 'relative',
  minWidth: 180,
};

const LanguageSelector = ({ language, onChange, style }) => {
  return (
    <div style={{ ...wrapperStyle, ...style }}>
      <label htmlFor="language-select" style={labelStyle}>Language</label>
      <div style={{ position: 'relative' }}>
        <select
          id="language-select"
          value={language}
          onChange={e => onChange(e.target.value)}
          style={selectStyle}
          onFocus={e => e.target.style.borderColor = '#6c63ff'}
          onBlur={e => e.target.style.borderColor = '#cce0ff'}
        >
          <option value="en">English Only</option>
          <option value="ml">Malayalam Only</option>
          <option value="both">Both</option>
        </select>
        <span style={chevronStyle}>▼</span>
      </div>
    </div>
  );
};

export default LanguageSelector; 