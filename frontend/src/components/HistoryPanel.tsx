import React from 'react';
import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { NewsAnalysis } from '../types';

interface HistoryPanelProps {
  analyses: NewsAnalysis[];
  onSelectAnalysis: (analysis: NewsAnalysis) => void;
  selectedAnalysis?: NewsAnalysis;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  analyses, 
  onSelectAnalysis, 
  selectedAnalysis 
}) => {
  if (analyses.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Historial</h3>
        </div>
        <p className="text-gray-500 text-center py-8">
          No hay análisis previos. Realiza tu primera búsqueda para comenzar.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Historial de Análisis</h3>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {analyses.map((analysis) => {
          const isSelected = selectedAnalysis?._id === analysis._id;
          const positivePercent = parseFloat(analysis.porcentaje.positivas);
          const negativePercent = parseFloat(analysis.porcentaje.negativas);
          
          return (
            <div
              key={analysis._id}
              onClick={() => onSelectAnalysis(analysis)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-50 border-blue-200 shadow-sm'
                  : 'bg-white/40 border-white/30 hover:bg-white/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 truncate">
                  {analysis.keyword}
                </h4>
                <span className="text-xs text-gray-500">
                  {new Date(analysis.createdAt).toLocaleDateString('es-ES')}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-green-600">{analysis.porcentaje.positivas}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingDown className="w-3 h-3 text-red-600" />
                  <span className="text-red-600">{analysis.porcentaje.negativas}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Minus className="w-3 h-3 text-gray-600" />
                  <span className="text-gray-600">{analysis.porcentaje.neutras}</span>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full flex">
                    <div 
                      className="bg-green-500"
                      style={{ width: `${positivePercent}%` }}
                    />
                    <div 
                      className="bg-red-500"
                      style={{ width: `${negativePercent}%` }}
                    />
                    <div 
                      className="bg-gray-400"
                      style={{ width: `${parseFloat(analysis.porcentaje.neutras)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryPanel;