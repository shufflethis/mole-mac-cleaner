import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(null);
  const [cleaning, setCleaning] = useState(false);
  const [activeTab, setActiveTab] = useState('clean');

  const startScan = async () => {
    setScanning(true);
    // Simulate scan - in real app: invoke('scan')
    setTimeout(() => {
      setResults({
        caches: { count: 847, size: '12.4 GB' },
        logs: { count: 234, size: '3.2 GB' },
        trash: { count: 45, size: '2.1 GB' },
        browser: { count: 1203, size: '4.8 GB' },
        total: '22.5 GB'
      });
      setScanning(false);
    }, 2000);
  };

  const startClean = async () => {
    setCleaning(true);
    setTimeout(() => {
      setCleaning(false);
      setResults(null);
      alert('22.5 GB befreit!');
    }, 3000);
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <span className="logo-icon">🧹</span>
          <span className="logo-text">Mole</span>
        </div>

        <nav className="nav">
          <button
            className={`nav-item ${activeTab === 'clean' ? 'active' : ''}`}
            onClick={() => setActiveTab('clean')}
          >
            <span>🗑️</span> Deep Clean
          </button>
          <button
            className={`nav-item ${activeTab === 'uninstall' ? 'active' : ''}`}
            onClick={() => setActiveTab('uninstall')}
          >
            <span>📦</span> Uninstaller
          </button>
          <button
            className={`nav-item ${activeTab === 'disk' ? 'active' : ''}`}
            onClick={() => setActiveTab('disk')}
          >
            <span>📊</span> Disk Analyzer
          </button>
          <button
            className={`nav-item ${activeTab === 'optimize' ? 'active' : ''}`}
            onClick={() => setActiveTab('optimize')}
          >
            <span>⚡</span> Optimize
          </button>
          <button
            className={`nav-item ${activeTab === 'monitor' ? 'active' : ''}`}
            onClick={() => setActiveTab('monitor')}
          >
            <span>📈</span> Monitor
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="pro-badge">PRO</div>
          <span>Lifetime License</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main">
        {activeTab === 'clean' && (
          <div className="clean-view">
            <h1>Deep Clean</h1>
            <p className="subtitle">Finde und entferne unnötige Dateien</p>

            {!results && !scanning && (
              <div className="scan-prompt">
                <div className="scan-icon">🔍</div>
                <p>Klicke auf Scan um deinen Mac zu analysieren</p>
                <button className="btn-primary" onClick={startScan}>
                  Scan starten
                </button>
              </div>
            )}

            {scanning && (
              <div className="scanning">
                <div className="spinner"></div>
                <p>Scanne deinen Mac...</p>
              </div>
            )}

            {results && !cleaning && (
              <div className="results">
                <div className="results-grid">
                  <div className="result-card">
                    <span className="result-icon">📁</span>
                    <div className="result-info">
                      <span className="result-label">Caches</span>
                      <span className="result-size">{results.caches.size}</span>
                      <span className="result-count">{results.caches.count} Dateien</span>
                    </div>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="result-card">
                    <span className="result-icon">📝</span>
                    <div className="result-info">
                      <span className="result-label">Logs</span>
                      <span className="result-size">{results.logs.size}</span>
                      <span className="result-count">{results.logs.count} Dateien</span>
                    </div>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="result-card">
                    <span className="result-icon">🗑️</span>
                    <div className="result-info">
                      <span className="result-label">Papierkorb</span>
                      <span className="result-size">{results.trash.size}</span>
                      <span className="result-count">{results.trash.count} Dateien</span>
                    </div>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="result-card">
                    <span className="result-icon">🌐</span>
                    <div className="result-info">
                      <span className="result-label">Browser-Daten</span>
                      <span className="result-size">{results.browser.size}</span>
                      <span className="result-count">{results.browser.count} Dateien</span>
                    </div>
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>

                <div className="results-footer">
                  <div className="total">
                    <span>Gesamt:</span>
                    <span className="total-size">{results.total}</span>
                  </div>
                  <button className="btn-clean" onClick={startClean}>
                    Jetzt bereinigen
                  </button>
                </div>
              </div>
            )}

            {cleaning && (
              <div className="cleaning">
                <div className="spinner"></div>
                <p>Bereinige...</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'uninstall' && (
          <div className="uninstall-view">
            <h1>App Uninstaller</h1>
            <p className="subtitle">Entferne Apps komplett mit allen Überresten</p>
            {/* App list would go here */}
            <p style={{color: '#888', marginTop: '40px'}}>App-Liste wird geladen...</p>
          </div>
        )}

        {activeTab === 'disk' && (
          <div className="disk-view">
            <h1>Disk Analyzer</h1>
            <p className="subtitle">Visualisiere deinen Speicherplatz</p>
            {/* Disk visualization would go here */}
          </div>
        )}

        {activeTab === 'optimize' && (
          <div className="optimize-view">
            <h1>System Optimize</h1>
            <p className="subtitle">Optimiere deinen Mac für beste Performance</p>
          </div>
        )}

        {activeTab === 'monitor' && (
          <div className="monitor-view">
            <h1>System Monitor</h1>
            <p className="subtitle">Echtzeit-Statistiken</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
