const emojiSentiment = require('emoji-sentiment');
const emojiDataSource = require('emoji-datasource');

const filtered = emojiSentiment.filter((element) => {
  return (element.score > 0.6);
});

const get_short_name = () => {
  while (1) {
    const selected = filtered[Math.floor(Math.random() * filtered.length)].sequence;
    const matched = emojiDataSource.filter((element) => {
      return (element.unified == selected);
    });
    if (matched.length > 0) {
      return matched[0].short_name;
    }
  }
}

console.log(get_short_name());
