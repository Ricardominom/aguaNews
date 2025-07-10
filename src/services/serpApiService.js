const axios = require('axios');

exports.getNewsFromSerpApi = async (keyword, date) => {
  const params = {
    q: keyword,
    tbm: 'nws',
    api_key: process.env.SERPAPI_KEY,
    num: 20,
    tbs: date === 'hoy' ? 'qdr:d' : 'qdr:d1'
  };

  const response = await axios.get('https://serpapi.com/search.json', { params });
  const results = response.data.news_results || [];

  return results.slice(0, 15).map(article => ({
    title: article.title,
    snippet: article.snippet,
    link: article.link
  }));
};
