import { useState } from 'react';
import { Lock, RefreshCw, ArrowLeft, ArrowRight, Home, Star } from 'lucide-react';
import PredictionBar from '../components/PredictionBar';
import MockCrashGame from '../components/MockCrashGame';

const sites = {
  'crash-game.io': {
    title: 'CyberCrash',
    component: <MockCrashGame />,
  },
  'faucetpay.io': {
    title: 'FaucetPay',
    component: <div className="text-white">Welcome to the FaucetPay simulation!</div>,
  },
  'bc.game': {
    title: 'BC.Game',
    component: <div className="text-white">Welcome to the BC.Game simulation!</div>,
  },
};

export default function Browser() {
  const [url, setUrl] = useState('crash-game.io');
  const [history, setHistory] = useState(['crash-game.io']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigate = (newUrl: string) => {
    if (newUrl in sites) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newUrl);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setUrl(newUrl);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setUrl(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setUrl(history[historyIndex + 1]);
    }
  };

  const activeSite = sites[url as keyof typeof sites];

  return (
    <div className="h-screen flex flex-col p-4 space-y-4">
      <PredictionBar />
      <div className="flex-grow flex flex-col bg-slate-800/50 border border-purple-700/30 rounded-lg shadow-2xl shadow-purple-900/20 overflow-hidden">
        {/* Browser Chrome */}
        <div className="flex-shrink-0 h-14 bg-slate-900/80 backdrop-blur-md border-b border-purple-700/30 flex items-center px-4 space-x-2">
          <div className="flex space-x-1">
            <button onClick={goBack} disabled={historyIndex === 0} className="p-2 rounded-full hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed">
              <ArrowLeft className="h-4 w-4 text-white" />
            </button>
            <button onClick={goForward} disabled={historyIndex === history.length - 1} className="p-2 rounded-full hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed">
              <ArrowRight className="h-4 w-4 text-white" />
            </button>
            <button className="p-2 rounded-full hover:bg-slate-700">
              <RefreshCw className="h-4 w-4 text-white" />
            </button>
            <button onClick={() => navigate('crash-game.io')} className="p-2 rounded-full hover:bg-slate-700">
              <Home className="h-4 w-4 text-white" />
            </button>
          </div>
          <div className="flex-grow flex items-center bg-slate-800 rounded-full px-4 py-1.5">
            <Lock className="h-4 w-4 text-green-400 mr-2" />
            <input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && navigate(url)}
              className="w-full bg-transparent text-white focus:outline-none"
            />
            <Star className="h-4 w-4 text-yellow-400 ml-2" />
          </div>
        </div>

        {/* Browser Content */}
        <div className="flex-grow p-4 overflow-y-auto">
          {activeSite ? (
            activeSite.component
          ) : (
            <div className="text-white text-center p-8">
              <h2 className="text-2xl font-bold">Site not found</h2>
              <p>The URL you entered is not a valid simulated site.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}