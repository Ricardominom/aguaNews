import React from 'react';
import { NewsAnalysis } from '../types';
import SentimentChart from './SentimentChart';
import NewsCard from './NewsCard';

interface NewsResultsProps {
  analysis: NewsAnalysis;
}

const NewsResults: React.FC<NewsResultsProps> = ({ analysis }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Análisis: "{analysis.keyword}"
        </h2>
        <p className="text-gray-600">
          {analysis.date === 'hoy' ? 'Noticias de hoy' : 'Noticias de ayer'} • 
          {new Date(analysis.createdAt).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>

      <SentimentChart porcentaje={analysis.porcentaje} total={analysis.total} />

      <div className="grid lg:grid-cols-3 gap-8">
        {analysis.top_positivas.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Noticias Positivas
            </h3>
            <div className="space-y-3">
              {analysis.top_positivas.map((article, index) => (
                <NewsCard key={index} article={article} type="positive" />
              ))}
            </div>
          </div>
        )}

        {analysis.top_negativas.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-red-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Noticias Negativas
            </h3>
            <div className="space-y-3">
              {analysis.top_negativas.map((article, index) => (
                <NewsCard key={index} article={article} type="negative" />
              ))}
            </div>
          </div>
        )}

        {analysis.top_neutras.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              Noticias Neutras
            </h3>
            <div className="space-y-3">
              {analysis.top_neutras.map((article, index) => (
                <NewsCard key={index} article={article} type="neutral" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsResults;