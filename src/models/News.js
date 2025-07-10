const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  keyword: String,
  date: String,
  total: Number,
  porcentaje: {
    positivas: String,
    negativas: String,
    neutras: String
  },
  top_positivas: Array,
  top_negativas: Array,
  top_neutras: Array,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', newsSchema);
