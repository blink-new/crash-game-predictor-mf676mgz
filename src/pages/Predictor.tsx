import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Zap,
  AlertTriangle
} from 'lucide-react';

interface PredictionData {
  site: string;
  nextCrash: number;
  confidence: number;
  pattern: string;
  trend: 'bullish' | 'bearish' | 'neutral';
  lastUpdate: string;
}

export default function Predictor() {
  const [isRunning, setIsRunning] = useState(true);
  const [algorithmSettings, setAlgorithmSettings] = useState({
    sensitivity: [75],
    lookback: [50],
    riskFactor: [60]
  });
  
  const [predictions, setPredictions] = useState<PredictionData[]>([
    {
      site: 'FaucetPay',
      nextCrash: 2.34,
      confidence: 87,
      pattern: 'Rising Pattern',
      trend: 'bullish',
      lastUpdate: 'Just now'
    },
    {
      site: 'BC.Game',
      nextCrash: 1.89,
      confidence: 73,
      pattern: 'Volatile Range',
      trend: 'neutral',
      lastUpdate: '2s ago'
    },
    {
      site: 'BetFury',
      nextCrash: 3.45,
      confidence: 91,
      pattern: 'Bull Flag',
      trend: 'bullish',
      lastUpdate: '5s ago'
    }
  ]);

  const [performance] = useState({
    totalPredictions: 1247,
    successful: 916,
    failed: 331,
    accuracy: 73.5,
    streak: 12
  });

  // Simulate real-time predictions
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setPredictions(prev => prev.map(pred => ({
        ...pred,
        nextCrash: Math.max(1.01, pred.nextCrash + (Math.random() - 0.5) * 0.3),
        confidence: Math.max(50, Math.min(99, pred.confidence + (Math.random() - 0.5) * 8)),
        lastUpdate: 'Just now'
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'bullish': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'bearish': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'bullish': return 'text-green-400';
      case 'bearish': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">
          AI Prediction Engine
        </h1>
        <p className="text-gray-300 text-lg">
          Advanced machine learning algorithms for crash game predictions
        </p>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engine Status */}
        <Card className="bg-slate-800/50 border-purple-700/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Engine Status
              </div>
              <div className={`flex items-center space-x-2 ${isRunning ? 'text-green-400' : 'text-red-400'}`}>
                <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                <span className="text-sm font-medium">{isRunning ? 'ACTIVE' : 'STOPPED'}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Button 
                onClick={() => setIsRunning(!isRunning)}
                className={`flex-1 ${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isRunning ? 'Stop' : 'Start'}
              </Button>
              <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/20">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-gray-400">
              {isRunning ? 'Processing live data from connected sites' : 'Engine is paused'}
            </div>
          </CardContent>
        </Card>

        {/* Performance Stats */}
        <Card className="bg-slate-800/50 border-purple-700/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Accuracy</span>
              <span className="text-white font-bold">{performance.accuracy}%</span>
            </div>
            <Progress value={performance.accuracy} className="h-2" />
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-gray-400">Successful</div>
                <div className="text-green-400 font-semibold">{performance.successful}</div>
              </div>
              <div>
                <div className="text-gray-400">Failed</div>
                <div className="text-red-400 font-semibold">{performance.failed}</div>
              </div>
            </div>
            
            <div className="pt-2 border-t border-purple-700/30">
              <div className="flex justify-between">
                <span className="text-gray-400">Win Streak</span>
                <span className="text-purple-400 font-bold">{performance.streak}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Algorithm Settings */}
        <Card className="bg-slate-800/50 border-purple-700/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Algorithm Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-400">Sensitivity</label>
                <span className="text-white font-semibold">{algorithmSettings.sensitivity[0]}%</span>
              </div>
              <Slider
                value={algorithmSettings.sensitivity}
                onValueChange={(value) => setAlgorithmSettings(prev => ({ ...prev, sensitivity: value }))}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-400">Lookback Period</label>
                <span className="text-white font-semibold">{algorithmSettings.lookback[0]} rounds</span>
              </div>
              <Slider
                value={algorithmSettings.lookback}
                onValueChange={(value) => setAlgorithmSettings(prev => ({ ...prev, lookback: value }))}
                max={100}
                min={10}
                step={1}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-400">Risk Factor</label>
                <span className="text-white font-semibold">{algorithmSettings.riskFactor[0]}%</span>
              </div>
              <Slider
                value={algorithmSettings.riskFactor}
                onValueChange={(value) => setAlgorithmSettings(prev => ({ ...prev, riskFactor: value }))}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Predictions */}
      <Card className="bg-slate-800/50 border-purple-700/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Live Predictions
            </div>
            <Badge className="bg-purple-600 text-white">
              {predictions.length} Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {predictions.map((pred, index) => (
              <div key={index} className="bg-slate-700/30 rounded-lg p-4 border border-purple-700/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <h3 className="text-white font-semibold text-lg">{pred.site}</h3>
                    <Badge variant="outline" className="border-purple-500 text-purple-300">
                      {pred.pattern}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(pred.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(pred.trend)}`}>
                      {pred.trend.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-gray-400 text-sm mb-1">Next Crash</div>
                    <div className="text-2xl font-bold text-purple-400">{pred.nextCrash.toFixed(2)}x</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-sm mb-1">Confidence</div>
                    <div className="flex flex-col items-center space-y-1">
                      <div className="text-xl font-bold text-white">{pred.confidence}%</div>
                      <Progress value={pred.confidence} className="w-16 h-2" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-sm mb-1">Pattern Strength</div>
                    <div className="text-xl font-bold text-green-400">Strong</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-sm mb-1">Last Update</div>
                    <div className="text-sm text-gray-300">{pred.lastUpdate}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border-orange-500/30">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-orange-400 mt-1" />
            <div>
              <h3 className="text-white font-semibold mb-1">Important Disclaimer</h3>
              <p className="text-gray-300 text-sm">
                These predictions are for demonstration purposes only and do not guarantee results. 
                Gambling involves risk, and past performance does not indicate future results. 
                Please gamble responsibly and within your means.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}