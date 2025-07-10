const express = require('express');
const router = express.Router();
const {
  fetchNewsAndAnalyze,
  getAllNewsAnalyses
} = require('../controllers/newsController');

router.post('/', fetchNewsAndAnalyze);
router.get('/', getAllNewsAnalyses); // Nuevo endpoint GET

module.exports = router;
