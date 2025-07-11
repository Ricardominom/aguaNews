import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SentimentChartProps {
  porcentaje: {
    positivas: string;
    negativas: string;
    neutras: string;
  };
  total: number;
}

const SentimentChart: React.FC<SentimentChartProps> = ({ porcentaje, total }) => {
  const positivePercent = parseFloat(porcentaje.positivas);
  const negativePercent = parseFloat(porcentaje.negativas);
  const neutralPercent = parseFloat(porcentaje.neutras);

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Distribución de Sentimientos</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Positivas</p>
              <p className="text-sm text-gray-600">{Math.round((positivePercent / 100) * total)} noticias</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-green-600">{porcentaje.positivas}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Negativas</p>
              <p className="text-sm text-gray-600">{Math.round((negativePercent / 100) * total)} noticias</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-red-600">{porcentaje.negativas}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Minus className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Neutras</p>
              <p className="text-sm text-gray-600">{Math.round((neutralPercent / 100) * total)} noticias</p>
            </div>
          </div>
          <span className="text-2xl font-bold text-gray-600">{porcentaje.neutras}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Distribución visual</span>
          <span>{total} noticias analizadas</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div className="h-full flex">
            <div 
              className="bg-green-500 transition-all duration-1000 ease-out"
              style={{ width: `${positivePercent}%` }}
            />
            <div 
              className="bg-red-500 transition-all duration-1000 ease-out"
              style={{ width: `${negativePercent}%` }}
            />
            <div 
              className="bg-gray-400 transition-all duration-1000 ease-out"
              style={{ width: `${neutralPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentChart;