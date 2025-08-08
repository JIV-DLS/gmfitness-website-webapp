import { motion } from "framer-motion";
import { useI18n } from '@/hooks/useI18n';

const About = () => {
  const { t } = useI18n();

  const achievements = [
    { 
      icon: "🏆", 
      titleKey: "about.achievements.certifications.title",
      itemsKeys: [
        "about.achievements.certifications.items.0",
        "about.achievements.certifications.items.1", 
        "about.achievements.certifications.items.2"
      ]
    },
    { 
      icon: "🎯", 
      titleKey: "about.achievements.specializations.title",
      itemsKeys: [
        "about.achievements.specializations.items.0",
        "about.achievements.specializations.items.1",
        "about.achievements.specializations.items.2",
        "about.achievements.specializations.items.3"
      ]
    },
    { 
      icon: "💪", 
      titleKey: "about.achievements.philosophy.title",
      itemsKeys: [
        "about.achievements.philosophy.items.0",
        "about.achievements.philosophy.items.1",
        "about.achievements.philosophy.items.2"
      ]
    }
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-azure-50/70 to-mediterranean-50/70 dark:from-azure-900/70 dark:to-mediterranean-900/70 backdrop-blur-sm">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('about.title', 'À Propos de')} <span className="text-primary-600 dark:text-primary-400">
                {t('about.titleHighlight', 'Moi')}
              </span>
            </h2>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                {t('about.bio.p1', 'Passionné de sport depuis toujours, j\'ai fait de ma passion mon métier il y a 8 ans. Diplômé BPJEPS et certifié en nutrition sportive, j\'accompagne mes clients vers leurs objectifs avec une approche personnalisée et bienveillante.')}
              </p>
              
              <p>
                {t('about.bio.p2', 'Ma philosophie ? ')}<strong className="text-gray-900 dark:text-white">
                  {t('about.bio.unique', 'Chaque personne est unique')}
                </strong>{' '}
                {t('about.bio.p2_continue', 'et mérite un accompagnement sur-mesure. Que vous souhaitiez perdre du poids, gagner en muscle ou simplement vous sentir mieux dans votre corps, nous trouverons ensemble la méthode qui vous convient.')}
              </p>
              
              <p>
                {t('about.bio.p3', 'Au-delà des séances d\'entraînement, je vous accompagne dans votre changement de vie : nutrition, motivation, habitudes… pour des résultats durables et un bien-être global.')}
              </p>
            </div>

            <motion.div
              className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {t('about.name', 'Gilson Mendes')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('about.role', 'Coach Sportif')}
                </div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {t('about.location', 'Côte d\'Azur')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('about.location_full', 'Côte d\'Azur & Alentours')}
                </div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {t('about.availability', '7j/7')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('about.hours', 'Sur RDV')}
                </div>
              </div>
            </motion.div>

            <motion.a
              href="#contact"
              className="btn-primary inline-block mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {t('about.cta', 'Commençons Ensemble')}
            </motion.a>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {t(achievement.titleKey)}
                      </h3>
                      <ul className="space-y-2">
                        {achievement.itemsKeys.map((itemKey, idx) => (
                          <li key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                            <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                            <span className="text-sm">{t(itemKey)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;