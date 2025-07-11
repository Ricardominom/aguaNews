import React, { useState, useEffect } from 'react';
import { AlertCircle, Newspaper } from 'lucide-react';
import SearchForm from './components/SearchForm';
import NewsResults from './components/NewsResults';
import HistoryPanel from './components/HistoryPanel';
import { newsApi } from './services/api';
import { NewsAnalysis } from './types';

function App() {
  const [currentAnalysis, setCurrentAnalysis] = useState<NewsAnalysis | null>(null);
  const [allAnalyses, setAllAnalyses] = useState<NewsAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAllAnalyses();
  }, []);

  const loadAllAnalyses = async () => {
    try {
      const analyses = await newsApi.getAllAnalyses();
      setAllAnalyses(analyses);
    } catch (err) {
      console.error('Error loading analyses:', err);
    }
  };

  const handleSearch = async (keyword: string, date: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const analysis = await newsApi.analyzeNews({ keyword, date });
      setCurrentAnalysis(analysis);
      await loadAllAnalyses(); // Refresh history
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al analizar las noticias');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAnalysis = (analysis: NewsAnalysis) => {
    setCurrentAnalysis(analysis);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Newspaper className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            News Sentiment Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Analiza el sentimiento de las noticias en tiempo real usando inteligencia artificial
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Search Form */}
          <div className="lg:col-span-3">
            <SearchForm onSubmit={handleSearch} isLoading={isLoading} />
            
            {/* Error Message */}
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Results */}
            {currentAnalysis && !isLoading && (
              <div className="mt-8">
                <NewsResults analysis={currentAnalysis} />
              </div>
            )}
          </div>

          {/* History Panel */}
          <div className="lg:col-span-1">
            <HistoryPanel
              analyses={allAnalyses}
              onSelectAnalysis={handleSelectAnalysis}
              selectedAnalysis={currentAnalysis}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            Powered by SerpAPI & Sentiment Analysis
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;