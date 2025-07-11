import axios from 'axios';
import { NewsAnalysis, AnalysisRequest } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const newsApi = {
  analyzeNews: async (data: AnalysisRequest): Promise<NewsAnalysis> => {
    const response = await api.post('/news', data);
    return response.data;
  },

  getAllAnalyses: async (): Promise<NewsAnalysis[]> => {
    const response = await api.get('/news');
    return response.data;
  },
};

export default api;