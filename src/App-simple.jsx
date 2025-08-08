import React from 'react';
import { AppProvider } from '@/context/AppContext';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ThemeProvider } from '@/components/common/ThemeProvider';

// Direct imports instead of lazy loading
import Header from './components/Header';
import Contact from './components/Contact';

function App() {
  return (
    <AppProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Header />
          <main>
            <section className="section-padding">
              <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
                🏋️ GM Fitness Test
              </h1>
              <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
                React app is working! Testing components...
              </p>
            </section>
            <Contact />
          </main>
        </div>
      </ErrorBoundary>
    </AppProvider>
  );
}

export default App;