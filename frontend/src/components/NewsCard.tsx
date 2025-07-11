import React from 'react';
import { ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
  type: 'positive' | 'negative' | 'neutral';
}

const NewsCard: React.FC<NewsCardProps> = ({ article, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getScoreColor = () => {
    if (article.score > 1) return 'text-green-600 bg-green-50';
    if (article.score < -1) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/80 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          {getIcon()}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor()}`}>
            Score: {article.score > 0 ? '+' : ''}{article.score}
          </span>
        </div>
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-100 rounded-lg"
        >
          <ExternalLink className="w-4 h-4 text-gray-500" />
        </a>
      </div>
      
      <h4 className="font-medium text-gray-900 mb-2 line-clamp-2 leading-snug">
        {article.title}
      </h4>
      
      <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
        {article.snippet}
      </p>
    </div>
  );
};

export default NewsCard;