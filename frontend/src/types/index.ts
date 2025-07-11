export interface NewsAnalysis {
  _id: string;
  keyword: string;
  date: string;
  total: number;
  porcentaje: {
    positivas: string;
    negativas: string;
    neutras: string;
  };
  top_positivas: NewsArticle[];
  top_negativas: NewsArticle[];
  top_neutras: NewsArticle[];
  createdAt: string;
}

export interface NewsArticle {
  title: string;
  snippet: string;
  link: string;
  score: number;
}

export interface AnalysisRequest {
  keyword: string;
  date: string;
}