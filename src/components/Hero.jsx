import { motion } from "framer-motion";
import { useI18n } from '@/hooks/useI18n';

const Hero = () => {
  const { t } = useI18n();

  return (
    <section id="accueil" className="section-padding pt-32 bg-gradient-to-br from-azure-50/60 to-ocean-100/60 dark:from-azure-900/60 dark:to-ocean-800/60 backdrop-blur-sm">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t('hero.title', 'Transformez Votre')}{" "}
              <span className="text-primary-600 dark:text-primary-400">
                {t('hero.titleHighlight', 'Corps')}
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t('hero.subtitle', 'Coach sportif professionnel avec 8+ ans d\'expérience. Coaching personnalisé, programmes sur-mesure et suivi nutritionnel pour atteindre vos objectifs rapidement.')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.a
                href="#contact"
                className="btn-primary text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.cta.primary', 'Commencer Maintenant')}
              </motion.a>
              
              <motion.a
                href="#services"
                className="btn-secondary text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.cta.secondary', 'Découvrir les Services')}
              </motion.a>
            </motion.div>

            <motion.div
              className="mt-12 grid grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">200+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('hero.stats.clients', 'Clients Transformés')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">8+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('hero.stats.experience', 'Années d\'Expérience')}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('hero.stats.success', 'Taux de Réussite')}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative z-10">
              <motion.div
                className="bg-primary-600 dark:bg-primary-500 rounded-2xl p-8 text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-4">
                  {t('hero.freeSession.title', 'Séance Découverte Gratuite')}
                </h3>
                <p className="mb-6">
                  {t('hero.freeSession.description', 'Évaluation complète, plan d\'entraînement personnalisé et conseils nutrition.')}
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> {t('hero.freeSession.features.assessment', 'Bilan physique complet')}
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> {t('hero.freeSession.features.program', 'Programme sur-mesure')}
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> {t('hero.freeSession.features.nutrition', 'Conseils nutrition')}
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span> {t('hero.freeSession.features.followup', 'Suivi personnalisé')}
                  </li>
                </ul>
                <motion.a
                  href="#contact"
                  className="bg-white dark:bg-gray-100 text-primary-600 dark:text-primary-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors block text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('hero.freeSession.cta', 'Réserver Maintenant')}
                </motion.a>
              </motion.div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-primary-300 dark:from-primary-800 dark:to-primary-700 rounded-2xl transform rotate-3 scale-105 opacity-20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;