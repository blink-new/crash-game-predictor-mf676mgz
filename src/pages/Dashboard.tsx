import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Activity,
  Globe,
  Zap,
  AlertTriangle
} from 'lucide-react';

interface ConnectedSite {
  id: string;
  name: string;
  url: string;
  status: 'connected' | 'disconnected' | 'analyzing';
  lastCrash: number;
  prediction: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
}

export default function Dashboard() {
  const [connectedSites, setConnectedSites] = useState<ConnectedSite[]>([
    {
      id: '1',
      name: 'FaucetPay',
      url: 'faucetpay.io',
      status: 'connected',
      lastCrash: 2.45,
      prediction: 3.12,
      confidence: 87,
      trend: 'up'
    },
    {
      id: '2', 
      name: 'BetFury',
      url: 'betfury.io',
      status: 'analyzing',
      lastCrash: 1.89,
      prediction: 2.67,
      confidence: 73,
      trend: 'stable'
    },
    {
      id: '3',
      name: 'BC.Game',
      url: 'bc.game',
      status: 'connected',
      lastCrash: 4.21,
      prediction: 1.95,
      confidence: 91,
      trend: 'down'
    }
  ]);

  const [totalPredictions] = useState(1247);
  const [successRate] = useState(73.5);
  const [activeSites] = useState(3);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setConnectedSites(prev => prev.map(site => ({
        ...site,
        prediction: Math.max(1.1, site.prediction + (Math.random() - 0.5) * 0.1),
        confidence: Math.max(50, Math.min(99, site.confidence + (Math.random() - 0.5) * 5)),
        lastCrash: Math.max(1.01, Math.random() * 5)
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'analyzing': return 'bg-yellow-500';
      case 'disconnected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">
          Crash Predictor Dashboard
        </h1>
        <p className="text-gray-300 text-lg">
          AI-powered crash game predictions across multiple platforms
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-purple-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Total Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalPredictions.toLocaleString()}</div>
            <div className="text-xs text-green-400 mt-1">+127 today</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{successRate}%</div>
            <Progress value={successRate} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400 flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Active Sites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{activeSites}</div>
            <div className="text-xs text-purple-400 mt-1">2 analyzing</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400 flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              AI Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">ONLINE</div>
            <div className="text-xs text-gray-400 mt-1">Learning mode</div>
          </CardContent>
        </Card>
      </div>

      {/* Connected Sites */}
      <Card className="bg-slate-800/50 border-purple-700/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Connected Sites
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectedSites.map((site) => (
            <div key={site.id} className="bg-slate-700/30 rounded-lg p-4 border border-purple-700/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(site.status)}`} />
                  <div>
                    <div className="text-white font-semibold">{site.name}</div>
                    <div className="text-gray-400 text-sm">{site.url}</div>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${site.status === 'connected' ? 'bg-green-500/20 text-green-300' : 
                              site.status === 'analyzing' ? 'bg-yellow-500/20 text-yellow-300' : 
                              'bg-red-500/20 text-red-300'}`}
                >
                  {site.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-gray-400 text-xs uppercase">Last Crash</div>
                  <div className="text-white font-mono text-lg">{site.lastCrash.toFixed(2)}x</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs uppercase flex items-center">
                    Next Prediction
                    {getTrendIcon(site.trend)}
                  </div>
                  <div className="text-purple-400 font-mono text-lg font-bold">{site.prediction.toFixed(2)}x</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs uppercase">Confidence</div>
                  <div className="flex items-center space-x-2">
                    <div className="text-white font-semibold">{site.confidence}%</div>
                    <Progress value={site.confidence} className="flex-1 h-2" />
                  </div>
                </div>
                <div className="flex items-end">
                  <Button size="sm" variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/20">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Alert */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-400 mt-1" />
            <div>
              <h3 className="text-white font-semibold mb-1">Demo Mode Active</h3>
              <p className="text-gray-300 text-sm">
                This is a demonstration of crash game prediction technology. 
                Actual gambling site integration requires compliance with terms of service and local regulations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}