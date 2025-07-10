const { getNewsFromSerpApi } = require('../services/serpApiService');
const { analyzeSentiments } = require('../services/sentimentService');
const { formatResults } = require('../utils/formatResults');
const News = require('../models/News');

exports.fetchNewsAndAnalyze = async (req, res) => {
  const { keyword, date } = req.body;

  if (!keyword || !date) {
    return res.status(400).json({ error: 'Faltan campos: keyword o date' });
  }

  try {
    const articles = await getNewsFromSerpApi(keyword, date);
    const sentimentData = analyzeSentiments(articles);
    const formatted = formatResults(sentimentData);

    // Guarda el análisis en MongoDB
    const newAnalysis = new News({
      keyword,
      date,
      total: formatted.total_analizadas,
      porcentaje: formatted.porcentaje,
      top_positivas: formatted.top_positivas,
      top_negativas: formatted.top_negativas,
      top_neutras: formatted.top_neutras
    });

    await newAnalysis.save();

    res.json(formatted);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error al analizar noticias' });
  }
};

exports.getAllNewsAnalyses = async (req, res) => {
  try {
    const results = await News.find().sort({ createdAt: -1 }); // Más recientes primero
    res.json(results);
  } catch (error) {
    console.error('Error al obtener análisis:', error.message);
    res.status(500).json({ error: 'No se pudieron obtener los análisis' });
  }
};