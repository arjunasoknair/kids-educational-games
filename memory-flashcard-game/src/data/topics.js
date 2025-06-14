// Define all available topics with their emojis and translations
export const TOPICS = {
  animals: {
    label: 'Animals',
    items: [
      { emoji: '🐶', en: 'Dog', ml: 'നായ' },
      { emoji: '🐱', en: 'Cat', ml: 'പൂച്ച' },
      { emoji: '🐘', en: 'Elephant', ml: 'ആന' },
      { emoji: '🦁', en: 'Lion', ml: 'സിംഹം' },
      { emoji: '🐯', en: 'Tiger', ml: 'കടുവ' },
      { emoji: '🐮', en: 'Cow', ml: 'പശു' },
      { emoji: '🐵', en: 'Monkey', ml: 'കുരങ്ങൻ' },
      { emoji: '🐰', en: 'Rabbit', ml: 'മുയല്‍' },
    ],
    audioPath: 'animals'
  },
  body_parts: {
    label: 'Body Parts',
    items: [
      { emoji: '👁️', en: 'Eye', ml: 'കണ്ണ്' },
      { emoji: '👃', en: 'Nose', ml: 'മൂക്ക്' },
      { emoji: '👄', en: 'Mouth', ml: 'വായ' },
      { emoji: '👂', en: 'Ear', ml: 'ചെവി' },
      { emoji: '👋', en: 'Hand', ml: 'കൈ' },
      { emoji: '🦶', en: 'Foot', ml: 'പാദം' },
      { emoji: '🦵', en: 'Leg', ml: 'കാല്‍' },
      { emoji: '👩‍🦲', en: 'Face', ml: 'മുഖം' },
      { emoji: '☝️', en: 'Finger', ml: 'വിരൽ' },
    ],
    audioPath: 'body_parts'
  },
  colors: {
    label: 'Colors',
    items: [
      { emoji: '🔴', en: 'Red', ml: 'ചുവപ്പ്' },
      { emoji: '🔵', en: 'Blue', ml: 'നീല' },
      { emoji: '🟢', en: 'Green', ml: 'പച്ച' },
      { emoji: '🟡', en: 'Yellow', ml: 'മഞ്ഞ' },
      { emoji: '🟠', en: 'Orange', ml: 'ഓറഞ്ച്' },
      { emoji: '🟣', en: 'Purple', ml: 'ധൂമ്രം' },
      { emoji: '⚫', en: 'Black', ml: 'കറുപ്പ്' },
      { emoji: '⚪', en: 'White', ml: 'വെള്ള' },
    ],
    audioPath: 'colors'
  },
  numbers: {
    label: 'Numbers',
    items: [
      { emoji: '1️⃣', en: 'One', ml: 'ഒന്ന്' },
      { emoji: '2️⃣', en: 'Two', ml: 'രണ്ട്' },
      { emoji: '3️⃣', en: 'Three', ml: 'മൂന്ന്' },
      { emoji: '4️⃣', en: 'Four', ml: 'നാല്' },
      { emoji: '5️⃣', en: 'Five', ml: 'അഞ്ച്' },
      { emoji: '6️⃣', en: 'Six', ml: 'ആറ്' },
      { emoji: '7️⃣', en: 'Seven', ml: 'ഏഴ്' },
      { emoji: '8️⃣', en: 'Eight', ml: 'എട്ട്' },
    ],
    audioPath: 'numbers'
  }
};

// Helper function to get topic data
export const getTopicData = (topicId) => {
  return TOPICS[topicId] || TOPICS.animals; // Default to animals if topic not found
};

// Helper function to get all available topics
export const getAvailableTopics = () => {
  return Object.entries(TOPICS).map(([id, topic]) => ({
    id,
    label: topic.label
  }));
}; 