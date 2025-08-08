import React, { Component } from 'react';
import { motion } from 'framer-motion';

/**
 * Error Boundary pour gérer les erreurs React
 * Version JavaScript corrigée
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    if (process.env.NODE_ENV === 'production') {
      // En production, on pourrait envoyer l'erreur à un service de monitoring
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      // Affichage personnalisé si fourni
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Affichage par défaut
      return (
        <motion.div
          className="min-h-[400px] flex items-center justify-center p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center max-w-md">
            <motion.div
              className="text-6xl mb-6"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              🚨
            </motion.div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Oops ! Une erreur s'est produite
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ne vous inquiétez pas, notre équipe technique a été notifiée. 
              Vous pouvez essayer de recharger la page ou revenir plus tard.
            </p>

            <div className="space-y-4">
              <motion.button
                onClick={this.handleRetry}
                className="btn-primary w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Réessayer
              </motion.button>
              
              <motion.button
                onClick={() => window.location.reload()}
                className="btn-secondary w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Recharger la page
              </motion.button>
            </div>

            {/* Affichage des détails de l'erreur en mode dev */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.details
                className="mt-8 text-left bg-red-50 dark:bg-red-900/20 p-4 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <summary className="cursor-pointer font-semibold text-red-700 dark:text-red-400 mb-2">
                  Détails de l'erreur (dev only)
                </summary>
                <pre className="text-sm text-red-600 dark:text-red-400 whitespace-pre-wrap overflow-auto">
                  {this.state.error.stack}
                </pre>
                {this.state.errorInfo && (
                  <pre className="text-sm text-red-600 dark:text-red-400 whitespace-pre-wrap overflow-auto mt-2">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </motion.details>
            )}
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

/**
 * HOC pour wrapper facilement les composants avec ErrorBoundary
 */
export function withErrorBoundary(WrappedComponent, fallback) {
  const WithErrorBoundaryComponent = (props) => (
    <ErrorBoundary fallback={fallback}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundaryComponent.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithErrorBoundaryComponent;
}

/**
 * Hook pour throw des erreurs qui seront catchées par ErrorBoundary
 */
export function useErrorHandler() {
  return (error) => {
    throw error;
  };
}