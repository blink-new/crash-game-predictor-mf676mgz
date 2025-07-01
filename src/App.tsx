import { ThemeProvider } from 'next-themes';
import Browser from './pages/Browser';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Browser />
      </div>
    </ThemeProvider>
  );
}

export default App;
