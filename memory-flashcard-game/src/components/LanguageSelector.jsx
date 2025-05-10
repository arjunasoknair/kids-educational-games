import React from 'react';

const LanguageSelector = ({ language, onChange }) => {
  return (
    <div>
      <h3>Select Language</h3>
      <select value={language} onChange={e => onChange(e.target.value)}>
        <option value="en">English Only</option>
        <option value="ml">Malayalam Only</option>
        <option value="both">Both</option>
      </select>
    </div>
  );
};

export default LanguageSelector; 