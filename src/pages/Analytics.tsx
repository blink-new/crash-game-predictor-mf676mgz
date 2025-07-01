import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart as PieChartIcon,
  Calendar,
  Download,
  Filter,
  Target,
  Clock,
  DollarSign
} from 'lucide-react';

const performanceData = [
  { date: '2024-01-15', predictions: 45, successful: 32, accuracy: 71.1 },
  { date: '2024-01-16', predictions: 52, successful: 39, accuracy: 75.0 },
  { date: '2024-01-17', predictions: 38, successful: 28, accuracy: 73.7 },
  { date: '2024-01-18', predictions: 61, successful: 47, accuracy: 77.0 },
  { date: '2024-01-19', predictions: 49, successful: 35, accuracy: 71.4 },
  { date: '2024-01-20', predictions: 55, successful: 43, accuracy: 78.2 },
  { date: '2024-01-21', predictions: 43, successful: 34, accuracy: 79.1 }
];

const sitePerformance = [
  { site: 'FaucetPay', predictions: 312, successful: 245, accuracy: 78.5, avgMultiplier: 2.34 },
  { site: 'BC.Game', predictions: 289, successful: 208, accuracy: 72.0, avgMultiplier: 2.89 },
  { site: 'BetFury', predictions: 267, successful: 201, accuracy: 75.3, avgMultiplier: 2.12 },
  { site: 'Stake', predictions: 198, successful: 142, accuracy: 71.7, avgMultiplier: 3.45 },
  { site: 'Roobet', predictions: 181, successful: 120, accuracy: 66.3, avgMultiplier: 2.67 }
];

const multiplierDistribution = [
  { range: '1.0-1.5x', count: 234, percentage: 23.4 },
  { range: '1.5-2.0x', count: 312, percentage: 31.2 },
  { range: '2.0-3.0x', count: 198, percentage: 19.8 },
  { range: '3.0-5.0x', count: 156, percentage: 15.6 },
  { range: '5.0x+', count: 100, percentage: 10.0 }
];

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

export default function Analytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-300 text-lg">
            Comprehensive insights into prediction performance and trends
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/20">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/20">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-purple-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Overall Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">73.5%</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-green-400">+2.3% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400 flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Total Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">1,247</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-green-400">+127 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Avg Multiplier
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">2.67x</div>
            <div className="flex items-center text-sm">
              <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
              <span className="text-red-400">-0.12x from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-700/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Active Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">94.2%</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-green-400">+1.8% uptime</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Over Time */}
        <Card className="bg-slate-800/50 border-purple-700/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Accuracy Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #7c3aed',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#8b5cf6" 
                  fill="url(#colorAccuracy)" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Multiplier Distribution */}
        <Card className="bg-slate-800/50 border-purple-700/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <PieChartIcon className="h-5 w-5 mr-2" />
              Multiplier Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={multiplierDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {multiplierDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #7c3aed',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {multiplierDistribution.map((item, index) => (
                <div key={item.range} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-gray-300">{item.range}</span>
                  <span className="text-sm text-gray-400">({item.percentage}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Site Performance Table */}
      <Card className="bg-slate-800/50 border-purple-700/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Site Performance Breakdown
            </div>
            <Badge className="bg-purple-600 text-white">
              5 Sites Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sitePerformance.map((site, index) => (
              <div key={site.site} className="bg-slate-700/30 rounded-lg p-4 border border-purple-700/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold`}
                         style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                      {site.site.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{site.site}</h3>
                      <div className="text-sm text-gray-400">{site.predictions} total predictions</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{site.accuracy}%</div>
                    <div className="text-sm text-gray-400">accuracy</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-gray-400 text-sm">Successful</div>
                    <div className="text-green-400 font-semibold">{site.successful}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Failed</div>
                    <div className="text-red-400 font-semibold">{site.predictions - site.successful}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Avg Multiplier</div>
                    <div className="text-purple-400 font-semibold">{site.avgMultiplier}x</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Performance</div>
                    <Progress value={site.accuracy} className="h-2 mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-slate-800/50 border-purple-700/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Recent Predictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { site: 'FaucetPay', predicted: 2.34, actual: 2.41, result: 'success', time: '2 minutes ago' },
              { site: 'BC.Game', predicted: 3.12, actual: 1.89, result: 'failed', time: '5 minutes ago' },
              { site: 'BetFury', predicted: 1.95, actual: 2.12, result: 'success', time: '8 minutes ago' },
              { site: 'Stake', predicted: 4.21, actual: 4.05, result: 'success', time: '12 minutes ago' },
              { site: 'FaucetPay', predicted: 2.67, actual: 1.23, result: 'failed', time: '15 minutes ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-purple-700/20 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${activity.result === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-white font-medium">{activity.site}</span>
                  <Badge variant="outline" className={`${activity.result === 'success' ? 'border-green-500 text-green-300' : 'border-red-500 text-red-300'}`}>
                    {activity.result}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-400">Predicted: <span className="text-purple-400">{activity.predicted}x</span></span>
                  <span className="text-gray-400">Actual: <span className="text-white">{activity.actual}x</span></span>
                  <span className="text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}