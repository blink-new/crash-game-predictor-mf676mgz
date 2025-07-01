import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Globe, 
  Shield, 
  Zap, 
  Clock,
  ExternalLink,
  Plus,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface DiscoveredSite {
  id: string;
  name: string;
  url: string;
  description: string;
  hasAuth: boolean;
  hasCrashGame: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  popularity: number;
  lastChecked: string;
  status: 'available' | 'connected' | 'failed';
}

export default function Discovery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const [discoveredSites] = useState<DiscoveredSite[]>([
    {
      id: '1',
      name: 'FaucetPay',
      url: 'faucetpay.io',
      description: 'Multi-cryptocurrency faucet platform with built-in crash game',
      hasAuth: true,
      hasCrashGame: true,
      difficulty: 'Easy',
      popularity: 92,
      lastChecked: '2 minutes ago',
      status: 'connected'
    },
    {
      id: '2',
      name: 'BetFury',
      url: 'betfury.io',
      description: 'Cryptocurrency casino with crash, dice, and slots games',
      hasAuth: true,
      hasCrashGame: true,
      difficulty: 'Medium',
      popularity: 87,
      lastChecked: '5 minutes ago',
      status: 'available'
    },
    {
      id: '3',
      name: 'BC.Game',
      url: 'bc.game',
      description: 'Popular crypto casino with crash and original games',
      hasAuth: true,
      hasCrashGame: true,
      difficulty: 'Medium',
      popularity: 95,
      lastChecked: '1 minute ago',
      status: 'connected'
    },
    {
      id: '4',
      name: 'Stake',
      url: 'stake.com',
      description: 'Leading cryptocurrency casino with crash betting',
      hasAuth: true,
      hasCrashGame: true,
      difficulty: 'Hard',
      popularity: 98,
      lastChecked: '3 minutes ago',
      status: 'available'
    },
    {
      id: '5',
      name: 'Roobet',
      url: 'roobet.com',
      description: 'Crypto casino featuring crash and various betting games',
      hasAuth: true,
      hasCrashGame: true,
      difficulty: 'Medium',
      popularity: 83,
      lastChecked: '7 minutes ago',
      status: 'failed'
    }
  ]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSearching(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-300';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'Hard': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Plus className="h-4 w-4 text-purple-400" />;
    }
  };

  const filteredSites = discoveredSites.filter(site =>
    site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">
          Site Discovery
        </h1>
        <p className="text-gray-300 text-lg">
          Search and connect to gambling sites with crash games
        </p>
      </div>

      {/* Search */}
      <Card className="bg-slate-800/50 border-purple-700/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Search Sites
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              type="text"
              placeholder="Enter site URL or name (e.g., faucetpay.io, stake.com)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-slate-700/50 border-purple-700/50 text-white placeholder-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSearching ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>Scanning...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </div>
              )}
            </Button>
          </div>
          <div className="text-sm text-gray-400 mt-2">
            {filteredSites.length} sites found matching your criteria
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid gap-6">
        {filteredSites.map((site) => (
          <Card key={site.id} className="bg-slate-800/50 border-purple-700/30 hover:border-purple-600/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{site.name}</h3>
                      <Badge variant="outline" className="border-purple-500 text-purple-300">
                        {site.url}
                      </Badge>
                      <Badge className={getDifficultyColor(site.difficulty)}>
                        {site.difficulty}
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-3">{site.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">
                          {site.hasAuth ? 'Auth Required' : 'No Auth'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-purple-400" />
                        <span className="text-gray-300">
                          {site.hasCrashGame ? 'Crash Game Available' : 'No Crash Game'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <span className="text-gray-300">
                          Last checked {site.lastChecked}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-white mb-1">{site.popularity}%</div>
                  <div className="text-xs text-gray-400">Popularity</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-purple-700/30">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm" className="border-purple-500 text-purple-300 hover:bg-purple-500/20">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Site
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-600/20">
                    View Details
                  </Button>
                </div>
                
                <Button 
                  className={`flex items-center space-x-2 ${
                    site.status === 'connected' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : site.status === 'failed'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                  disabled={site.status === 'failed'}
                >
                  {getStatusIcon(site.status)}
                  <span>
                    {site.status === 'connected' ? 'Connected' : 
                     site.status === 'failed' ? 'Failed' : 'Connect'}
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Card */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/30">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-blue-400 mt-1" />
            <div>
              <h3 className="text-white font-semibold mb-1">Security & Compliance</h3>
              <p className="text-gray-300 text-sm">
                All site connections are simulated for demonstration purposes. 
                Real implementations must comply with site terms of service, authentication requirements, 
                and local gambling regulations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}