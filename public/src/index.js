import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function TradingApp() {
  const [tab, setTab] = useState('dashboard');
  const [assetClass, setAssetClass] = useState('stocks');
  const [signals, setSignals] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [watchlist, setWatchlist] = useState(['AAPL', 'GOOGL', 'MSFT']);

  useEffect(() => {
    const data = {};
    const sigs = [];
    watchlist.forEach(sym => {
      const price = 100 + Math.random() * 200;
      data[sym] = { price: price.toFixed(2), change: (Math.random() - 0.5) * 10 };
      if (Math.random() > 0.5) sigs.push({ symbol: sym, action: 'BUY', strength: Math.floor(Math.random() * 40 + 60) });
    });
    setMarketData(data);
    setSignals(sigs);
  }, [watchlist]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 border-b-2 border-cyan-500 p-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold text-cyan-300">🚀 AI Trading System</h1>
            <p className="text-gray-300 mt-2">LIVE • Multi-Asset • AI Powered</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-400">$100K</div>
            <div className="text-xl text-purple-300">Signals: {signals.length}</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border-b border-gray-700 p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex gap-3 flex-wrap items-center">
          <button onClick={() => setAssetClass('stocks')} className={`px-4 py-2 rounded border font-bold ${assetClass === 'stocks' ? 'bg-cyan-600' : 'bg-gray-800'}`}>📈 Stocks</button>
          <button onClick={() => setAssetClass('forex')} className={`px-4 py-2 rounded border font-bold ${assetClass === 'forex' ? 'bg-cyan-600' : 'bg-gray-800'}`}>💱 Forex</button>
          <button onClick={() => setAssetClass('crypto')} className={`px-4 py-2 rounded border font-bold ${assetClass === 'crypto' ? 'bg-cyan-600' : 'bg-gray-800'}`}>₿ Crypto</button>

          <div className="flex gap-2 ml-auto">
            <button onClick={() => setTab('dashboard')} className={`px-3 py-2 rounded border text-sm ${tab === 'dashboard' ? 'bg-blue-600' : 'bg-gray-800'}`}>📊 Dashboard</button>
            <button onClick={() => setTab('signals')} className={`px-3 py-2 rounded border text-sm ${tab === 'signals' ? 'bg-blue-600' : 'bg-gray-800'}`}>📈 Signals</button>
            <button onClick={() => setTab('news')} className={`px-3 py-2 rounded border text-sm ${tab === 'news' ? 'bg-blue-600' : 'bg-gray-800'}`}>📰 News</button>
            <button onClick={() => setTab('ai')} className={`px-3 py-2 rounded border text-sm ${tab === 'ai' ? 'bg-blue-600' : 'bg-gray-800'}`}>🤖 AI</button>
            <button onClick={() => setTab('risk')} className={`px-3 py-2 rounded border text-sm ${tab === 'risk' ? 'bg-blue-600' : 'bg-gray-800'}`}>⚠️ Risk</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {tab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-gray-900 border border-cyan-500 p-6 rounded text-center"><div className="text-sm text-gray-400">SIGNALS</div><div className="text-4xl font-bold text-cyan-400 mt-2">{signals.length}</div></div>
              <div className="bg-gray-900 border border-blue-500 p-6 rounded text-center"><div className="text-sm text-gray-400">ASSETS</div><div className="text-4xl font-bold text-blue-400 mt-2">{watchlist.length}</div></div>
              <div className="bg-gray-900 border border-green-500 p-6 rounded text-center"><div className="text-sm text-gray-400">PORTFOLIO</div><div className="text-4xl font-bold text-green-400 mt-2">$100K</div></div>
              <div className="bg-gray-900 border border-purple-500 p-6 rounded text-center"><div className="text-sm text-gray-400">STATUS</div><div className="text-4xl font-bold text-purple-400 mt-2">✅ LIVE</div></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {watchlist.map(sym => marketData[sym] && (
                <div key={sym} className="bg-gray-900 border border-cyan-500 p-6 rounded">
                  <div className="text-3xl font-bold text-white mb-2">{sym}</div>
                  <div className="text-4xl font-bold text-cyan-300">${marketData[sym].price}</div>
                  <div className={`text-lg font-bold ${parseFloat(marketData[sym].change) > 0 ? 'text-green-400' : 'text-red-400'}`}>{marketData[sym].change > 0 ? '+' : ''}{marketData[sym].change.toFixed(2)}%</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'signals' && (
          <div className="bg-gray-900 border-2 border-cyan-500 p-8 rounded">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">Trading Signals</h2>
            {signals.length === 0 ? <p className="text-xl text-gray-400">No signals yet</p> : (
              <div className="space-y-3">
                {signals.map((s, i) => (
                  <div key={i} className="flex justify-between items-center bg-gray-800 p-6 rounded border border-gray-700">
                    <div className="text-2xl font-bold">{s.symbol}</div>
                    <div className="text-3xl font-bold text-purple-400">{s.strength}%</div>
                    <div className={`px-4 py-2 rounded font-bold text-white ${s.action === 'BUY' ? 'bg-green-600' : 'bg-red-600'}`}>{s.action}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'news' && (
          <div className="bg-gray-900 border-2 border-cyan-500 p-8 rounded">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">📰 Market News</h2>
            {['Fed Rate Decision', 'Tech Earnings Beat', 'Oil Surge', 'Euro Decline', 'Bitcoin Rally'].map((news, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded border border-gray-700 mb-3">
                <div className="text-lg font-bold text-white">{news}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'ai' && (
          <div className="bg-gray-900 border-2 border-cyan-500 p-8 rounded">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">🤖 AI Intelligence</h2>
            <textarea placeholder="Ask about market..." className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 text-gray-100 mb-3 h-24"></textarea>
            <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-bold text-lg mb-4">Get Analysis</button>
            <div className="bg-gray-800 p-6 rounded border-2 border-green-700">
              <p className="text-gray-300 text-lg">Market sentiment: BULLISH • Active signals: {signals.length} • Sharpe Ratio: 1.45</p>
            </div>
          </div>
        )}

        {tab === 'risk' && (
          <div className="bg-gray-900 border-2 border-cyan-500 p-8 rounded">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">⚠️ Risk Management</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800 border border-green-700 p-6 rounded text-center"><div className="text-sm text-gray-400">SHARPE</div><div className="text-4xl font-bold text-green-400 mt-3">1.45</div></div>
              <div className="bg-gray-800 border border-yellow-700 p-6 rounded text-center"><div className="text-sm text-gray-400">VOLATILITY</div><div className="text-4xl font-bold text-yellow-400 mt-3">18.5%</div></div>
              <div className="bg-gray-800 border border-red-700 p-6 rounded text-center"><div className="text-sm text-gray-400">MAX DD</div><div className="text-4xl font-bold text-red-400 mt-3">12.3%</div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TradingApp />);
```

