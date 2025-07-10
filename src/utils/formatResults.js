exports.formatResults = (articles) => {
  const total = articles.length;
  const positives = articles.filter(a => a.score > 1);
  const negatives = articles.filter(a => a.score < -1);
  const neutrals = articles.filter(a => a.score >= -1 && a.score <= 1);

  const sortByScore = arr => [...arr].sort((a, b) => b.score - a.score);

  return {
    total_analizadas: total,
    porcentaje: {
      positivas: ((positives.length / total) * 100).toFixed(2) + '%',
      negativas: ((negatives.length / total) * 100).toFixed(2) + '%',
      neutras: ((neutrals.length / total) * 100).toFixed(2) + '%'
    },
    top_positivas: sortByScore(positives).slice(0, 5),
    top_negativas: sortByScore(negatives).reverse().slice(0, 5),
    top_neutras: sortByScore(neutrals).slice(0, 5)
  };
};
