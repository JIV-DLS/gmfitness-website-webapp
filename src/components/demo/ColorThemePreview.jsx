import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';

const COLOR_THEMES = [
  {
    id: 'current-red',
    name: '🔴 Rouge Actuel',
    description: 'Palette rouge énergique actuelle',
    psychology: 'Passion, force, action immédiate',
    primary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    pros: ['Très énergique', 'Attractif', 'Mémorable'],
    cons: ['Peut être agressif', 'Associé danger/urgence', 'Fatiguant'],
    bestFor: ['CrossFit', 'HIIT', 'Sports intenses']
  },
  {
    id: 'blue-ocean',
    name: '🌊 Bleu Océan (Recommandé)',
    description: 'Bleu professionnel avec touches oranges',
    psychology: 'Confiance, professionnalisme, sérénité',
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    accent: '#ea580c',
    pros: ['Très professionnel', 'Inspire confiance', 'Universellement apprécié'],
    cons: ['Peut sembler froid', 'Moins énergique'],
    bestFor: ['Coaching premium', 'Clientèle corporate', 'Coaching bien-être']
  },
  {
    id: 'emerald-health',
    name: '💚 Vert Émeraude',
    description: 'Vert santé et bien-être',
    psychology: 'Santé, nature, croissance, équilibre',
    primary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
    accent: '#1e40af',
    pros: ['Associé santé/bien-être', 'Apaisant', 'Positif'],
    cons: ['Peut sembler médical', 'Moins dynamique'],
    bestFor: ['Nutrition', 'Yoga', 'Wellness coaching', 'Rééducation']
  },
  {
    id: 'orange-energy',
    name: '🧡 Orange Dynamique',
    description: 'Orange énergique et motivant',
    psychology: 'Énergie, motivation, chaleur humaine',
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    accent: '#1e3a8a',
    pros: ['Très énergisant', 'Chaleureux', 'Motivant'],
    cons: ['Peut être fatigant', 'Moins professionnel'],
    bestFor: ['Fitness fun', 'Motivation', 'Coaching jeune']
  },
  {
    id: 'purple-premium',
    name: '💜 Violet Premium',
    description: 'Violet innovant et haut de gamme',
    psychology: 'Innovation, luxe, transformation',
    primary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
    accent: '#f59e0b',
    pros: ['Différenciant', 'Premium', 'Moderne'],
    cons: ['Moins "sport"', 'Peut sembler étrange'],
    bestFor: ['Coaching de luxe', 'Transformation', 'Innovation']
  }
];

/**
 * Composant de preview des thèmes couleurs pour coach sportif
 */
const ColorThemePreview = memo(() => {
  const [selectedTheme, setSelectedTheme] = useState(COLOR_THEMES[1]); // Bleu par défaut

  const applyThemeStyles = (theme) => ({
    '--primary-50': theme.primary[50],
    '--primary-100': theme.primary[100],
    '--primary-200': theme.primary[200],
    '--primary-300': theme.primary[300],
    '--primary-400': theme.primary[400],
    '--primary-500': theme.primary[500],
    '--primary-600': theme.primary[600],
    '--primary-700': theme.primary[700],
    '--primary-800': theme.primary[800],
    '--primary-900': theme.primary[900],
    '--accent': theme.accent || theme.primary[500],
      });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🎨 Comparateur de Thèmes Couleurs
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Quelle palette correspond le mieux à votre image de coach sportif ?
        </p>
      </div>

      {/* Sélecteur de thèmes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COLOR_THEMES.map((theme) => (
          <motion.button
            key={theme.id}
            onClick={() => setSelectedTheme(theme)}
            className={`
              p-4 rounded-xl border-2 text-left transition-all duration-300
              ${selectedTheme.id === theme.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div 
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: theme.primary[600] }}
              />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {theme.name}
              </h3>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {theme.description}
            </p>
            
            <div className="flex space-x-1">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => (
                <div
                  key={weight}
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: theme.primary[weight] }}
                />
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Preview du thème sélectionné */}
      <motion.div
        key={selectedTheme.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
        style={applyThemeStyles(selectedTheme)}
      >
        <div className="space-y-6">
          {/* Header preview */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Preview: {selectedTheme.name}
            </h3>
            
            {/* Buttons preview */}
            <div className="flex flex-wrap gap-3 mb-4">
              <button 
                className="px-4 py-2 rounded-lg font-semibold text-white shadow-sm hover:shadow-md transition-all"
                style={{ backgroundColor: selectedTheme.primary[600] }}
              >
                Réserver une séance
              </button>
              <button 
                className="px-4 py-2 rounded-lg font-semibold border-2 transition-all"
                style={{ 
                  borderColor: selectedTheme.primary[600],
                  color: selectedTheme.primary[600]
                }}
              >
                En savoir plus
              </button>
              {selectedTheme.accent && (
                <button 
                  className="px-4 py-2 rounded-lg font-semibold text-white transition-all"
                  style={{ backgroundColor: selectedTheme.accent }}
                >
                  Accent Color
                </button>
              )}
            </div>

            {/* Card preview */}
            <div 
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4"
              style={{ borderLeftColor: selectedTheme.primary[600] }}
            >
              <h4 className="font-semibold text-gray-900 dark:text-white">Témoignage Client</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                "Guillaume est un excellent coach, je recommande vivement !"
              </p>
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: selectedTheme.primary[500] }}>⭐</span>
                ))}
              </div>
            </div>
          </div>

          {/* Analyse du thème */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                🧠 Psychologie des Couleurs
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {selectedTheme.psychology}
              </p>
              
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-green-700 dark:text-green-400">✅ Avantages</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                    {selectedTheme.pros.map((pro, idx) => (
                      <li key={idx}>{pro}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-red-700 dark:text-red-400">❌ Inconvénients</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                    {selectedTheme.cons.map((con, idx) => (
                      <li key={idx}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                🎯 Idéal Pour
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedTheme.bestFor.map((use, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: selectedTheme.primary[600] }}
                  >
                    {use}
                  </span>
                ))}
              </div>

              {/* Palette complète */}
              <div className="mt-6">
                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Palette Complète</h5>
                <div className="grid grid-cols-5 gap-1 mb-2">
                  {Object.entries(selectedTheme.primary).map(([weight, color]) => (
                    <div key={weight} className="text-center">
                      <div 
                        className="w-full h-8 rounded border border-gray-200 dark:border-gray-600"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{weight}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Primaire: {selectedTheme.primary[600]}
                  {selectedTheme.accent && ` | Accent: ${selectedTheme.accent}`}
                </p>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                console.log(`Thème sélectionné: ${selectedTheme.name}`);
                // Ici on pourrait appliquer le thème
              }}
              className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              style={{ backgroundColor: selectedTheme.primary[600] }}
            >
              Appliquer ce thème
            </button>
          </div>
        </div>
      </motion.div>

      {/* Recommandations personnalisées */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          🎯 Mes Recommandations pour Coach Sportif
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">🥇 Coaching Premium</h4>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Bleu Océan</strong> - Inspire confiance et professionnalisme. 
              Parfait pour une clientèle haut de gamme.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">🥈 Wellness/Nutrition</h4>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Vert Émeraude</strong> - Évoque santé et bien-être naturel. 
              Idéal pour coaching holistique.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">🥉 Fitness Dynamique</h4>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Orange Énergie</strong> - Pure motivation et énergie. 
              Parfait pour HIIT, CrossFit, fitness intense.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

ColorThemePreview.displayName = 'ColorThemePreview';

export default ColorThemePreview;