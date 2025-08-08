import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div style={{ padding: '20px', fontSize: '24px', color: 'red', background: 'yellow' }}>
      <h1>🔥 BARE MINIMUM REACT TEST 🔥</h1>
      <p>If you see this, React core is working!</p>
      <p>Current timestamp: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)