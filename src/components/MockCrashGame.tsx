import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { DollarSign, Target, Users } from 'lucide-react';

interface MockCrashGameProps {
  onGameStateChange: (status: 'waiting' | 'predicting' | 'success' | 'failed', crashPoint?: number) => void;
  prediction: number | null;
}

const MockCrashGame = ({ onGameStateChange, prediction }: MockCrashGameProps) => {
  const [multiplier, setMultiplier] = useState(1.0);
  const [gameState, setGameState] = useState('waiting'); // waiting, running, crashed
  const [crashPoint, setCrashPoint] = useState(0);
  const [betAmount, setBetAmount] = useState(10);
  const [autoCashout, setAutoCashout] = useState(2.0);
  const [history, setHistory] = useState<number[]>([]);

  const gameLoopRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (gameState === 'running') {
      gameLoopRef.current = setInterval(() => {
        setMultiplier(m => m * 1.01);
      }, 50);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'running' && multiplier >= crashPoint && crashPoint > 0) {
      setGameState('crashed');
      setHistory(h => [crashPoint, ...h.slice(0, 10)]);
      const success = prediction !== null && crashPoint >= prediction;
      onGameStateChange(success ? 'success' : 'failed', crashPoint);
    }
  }, [multiplier, crashPoint, gameState, prediction, onGameStateChange]);

  const startGame = () => {
    const newCrashPoint = Math.random() * 10 + 1;
    setCrashPoint(newCrashPoint);
    setMultiplier(1.0);
    setGameState('running');
    onGameStateChange('predicting');

    // Reset to waiting after a delay
    setTimeout(() => {
      setGameState('waiting');
      onGameStateChange('waiting');
    }, 15000);
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-4 text-white">
      {/* Game Area */}
      <div className="flex-1 flex flex-col bg-slate-900/50 rounded-lg p-4 border border-purple-700/30">
        <div className="flex-grow flex items-center justify-center relative">
          <div 
            className={`font-mono text-7xl font-bold transition-colors duration-300 ${
              gameState === 'running' ? 'text-sky-300' : gameState === 'crashed' ? 'text-red-500' : 'text-gray-500'
            }`}>
            {multiplier.toFixed(2)}x
          </div>
          {gameState === 'crashed' && (
            <div className="absolute font-bold text-2xl text-red-500 animate-pulse">CRASHED @ {crashPoint.toFixed(2)}x</div>
          )}
        </div>
        <div className="h-20 flex-shrink-0">
          <div className="h-full w-full bg-slate-800/50 rounded-lg p-2">
            <div className="text-xs text-gray-400 mb-1">History</div>
            <div className="flex gap-2">
              {history.map((val, i) => (
                <div key={i} className={`px-2 py-1 rounded text-sm font-mono ${val < 2 ? 'text-red-400' : 'text-green-400'}`}>
                  {val.toFixed(2)}x
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="w-full lg:w-80 flex-shrink-0">
        <Card className="bg-slate-800/50 border-purple-700/30">
          <CardContent className="p-4 space-y-4">
            <div>
              <label className="text-sm text-gray-400">Bet Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  type="number"
                  value={betAmount}
                  onChange={e => setBetAmount(Number(e.target.value))}
                  className="pl-9 bg-slate-700/50 border-purple-700/50"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400">Auto Cashout</label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  type="number"
                  value={autoCashout}
                  onChange={e => setAutoCashout(Number(e.target.value))}
                  className="pl-9 bg-slate-700/50 border-purple-700/50"
                />
              </div>
            </div>
            <Button 
              onClick={startGame}
              disabled={gameState === 'running'}
              className="w-full text-lg font-bold py-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-500"
            >
              {gameState === 'running' ? 'Running...' : 'Place Bet'}
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-purple-700/30 mt-4">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-400">
                <Users className="h-4 w-4" />
                <span>Players</span>
              </div>
              <span className="text-white font-bold">127</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-400">
                <DollarSign className="h-4 w-4" />
                <span>Total Wagered</span>
              </div>
              <span className="text-white font-bold">$5,432.10</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MockCrashGame;