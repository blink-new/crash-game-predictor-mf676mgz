import { useState, useEffect } from 'react';
import { Zap, Brain, Shield, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { Badge } from './ui/badge';

export default function PredictionBar() {
  const [prediction, setPrediction] = useState(2.34);
  const [confidence, setConfidence] = useState(87);
  const [trend, setTrend] = useState('bullish');

  useEffect(() => {
    const interval = setInterval(() => {
      setPrediction(prev => Math.max(1.01, prev + (Math.random() - 0.5) * 0.3));
      setConfidence(prev => Math.max(50, Math.min(99, prev + (Math.random() - 0.5) * 8)));
      if (Math.random() > 0.5) {
        setTrend(t => t === 'bullish' ? 'bearish' : 'bullish');
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = () => {
    switch (trend) {
      case 'bullish': return <TrendingUp className="h-5 w-5 text-green-400" />;
      case 'bearish': return <TrendingDown className="h-5 w-5 text-red-400" />;
      default: return <Activity className="h-5 w-5 text-yellow-400" />;
    }
  };

  return (
    <div className="flex-shrink-0 bg-slate-900/80 backdrop-blur-md border border-purple-700/30 rounded-lg p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-3">
        <Zap className="h-6 w-6 text-purple-400" />
        <div className="text-white font-bold text-lg">Crash Predictor</div>
        <Badge className="bg-green-500/20 text-green-300">Active</Badge>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-gray-400" />
          <div className="text-gray-400">Prediction:</div>
          <div className="text-purple-400 font-bold text-xl">{prediction.toFixed(2)}x</div>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-gray-400" />
          <div className="text-gray-400">Confidence:</div>
          <div className="text-white font-bold text-xl">{confidence.toFixed(0)}%</div>
        </div>
        <div className="flex items-center space-x-2">
          {getTrendIcon()}
          <div className="text-gray-400">Trend:</div>
          <div className={`font-bold text-xl ${trend === 'bullish' ? 'text-green-400' : 'text-red-400'}`}>
            {trend.charAt(0).toUpperCase() + trend.slice(1)}
          </div>
        </div>
      </div>
    </div>
  );
}