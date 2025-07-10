const Sentiment = require('sentiment');
const sentiment = new Sentiment();

exports.analyzeSentiments = (articles) => {
  return articles.map(article => {
    const analysis = sentiment.analyze(article.snippet);
    return {
      ...article,
      score: analysis.score
    };
  });
};
