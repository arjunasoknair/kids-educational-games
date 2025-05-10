import React from 'react';

const TopicSelector = ({ topics, selectedTopic, onSelect }) => {
  return (
    <div>
      <h3>Select Topic</h3>
      <select value={selectedTopic} onChange={e => onSelect(e.target.value)}>
        {topics.map(topic => (
          <option key={topic.value} value={topic.value}>{topic.label}</option>
        ))}
      </select>
    </div>
  );
};

export default TopicSelector; 