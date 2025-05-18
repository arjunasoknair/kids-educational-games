import React from 'react';

const TopicSelector = ({ topics, selectedTopic, onSelect, disabled }) => {
  return (
    <div style={{ minWidth: 180 }}>
      <label style={{ fontWeight: 600, color: '#6c63ff', marginBottom: 4, display: 'block', fontSize: '1.05rem' }}>Topic</label>
      <select
        value={selectedTopic}
        onChange={e => onSelect(e.target.value)}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '0.5rem 1rem',
          borderRadius: 8,
          border: '2px solid #cce0ff',
          background: disabled ? '#f3f3f3' : '#fff',
          color: '#333',
          fontSize: '1.1rem',
          fontWeight: 500,
          outline: 'none',
          boxShadow: '0 1px 4px #0001',
          appearance: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {topics.map(topic => (
          <option key={topic.value} value={topic.value}>{topic.label}</option>
        ))}
      </select>
    </div>
  );
};

export default TopicSelector; 