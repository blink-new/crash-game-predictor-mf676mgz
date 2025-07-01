import { Zap, Brain, Shield, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';

interface PredictionBarProps {
  prediction: number | null;
  status: 'waiting' | 'predicting' | 'success' | 'failed';
}

export default function PredictionBar({ prediction, status }: PredictionBarProps) {
  const getStatusBadge = () => {
    switch (status) {
      case 'predicting':
        return <Badge className="bg-yellow-500/20 text-yellow-300">Predicting...</Badge>;
      case 'success':
        return <Badge className="bg-green-500/20 text-green-300">Success!</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/20 text-red-300">Failed!</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-300">Waiting</Badge>;
    }
  };

  return (
    <div className="flex-shrink-0 bg-slate-900/80 backdrop-blur-md border border-purple-700/30 rounded-lg p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-3">
        <Zap className="h-6 w-6 text-purple-400" />
        <div className="text-white font-bold text-lg">Crash Predictor Pro</div>
        {getStatusBadge()}
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-gray-400" />
          <div className="text-gray-400">Predicted Target:</div>
          <div className="text-purple-400 font-bold text-xl">
            {prediction ? `${prediction.toFixed(2)}x` : '--.--x'}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-gray-400" />
          <div className="text-gray-400">Confidence:</div>
          <div className="text-white font-bold text-xl">99.8%</div>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-400" />
           <div className="text-gray-400">Analysis:</div>
          <div className={`font-bold text-xl text-green-400`}>
            Stable Pattern
          </div>
        </div>
      </div>
    </div>
  );
}