import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n' // Initialise i18next
import { ThemeProvider } from '@/components/common/ThemeProvider'

// Error handling pour les erreurs non catchées
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Meta theme-color pour les navigateurs mobiles
const metaThemeColor = document.createElement('meta');
metaThemeColor.name = 'theme-color';
metaThemeColor.content = '#ffffff';
document.head.appendChild(metaThemeColor);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)