const emojiSentiment = require('emoji-sentiment');

const filtered = emojiSentiment.filter((element, index, array) => {
  return (element.score > 0.6);
});

const selected = filtered[Math.floor(Math.random() * filtered.length)];

console.log(selected.sequence);
