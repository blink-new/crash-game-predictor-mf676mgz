import { Link, useLocation } from 'react-router-dom';
import { Target, Search, Brain, BarChart3, Zap } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: BarChart3 },
  { path: '/discovery', label: 'Discovery', icon: Search },
  { path: '/predictor', label: 'Predictor', icon: Brain },
  { path: '/analytics', label: 'Analytics', icon: Target },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="border-b border-purple-800/30 bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-white">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-xl">CrashPredict</div>
              <div className="text-xs text-purple-300 -mt-1">AI Platform</div>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                      : 'text-gray-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}