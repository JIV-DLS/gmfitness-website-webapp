import { motion } from "framer-motion";
import { useI18n } from '@/hooks/useI18n';

const Services = () => {
  const { t } = useI18n();

  const services = [
    {
      icon: "💪",
      titleKey: "services.items.personal.title",
      descriptionKey: "services.items.personal.description",
      featuresKeys: [
        "services.items.personal.features.custom",
        "services.items.personal.features.psychology",
        "services.items.personal.features.mobility",
        "services.items.personal.features.mindfulness"
      ],
      priceKey: "services.items.personal.price"
    },
    {
      icon: "👥",
      titleKey: "services.items.group.title",
      descriptionKey: "services.items.group.description",
      featuresKeys: [
        "services.items.group.features.small",
        "services.items.group.features.quality",
        "services.items.group.features.affordable",
        "services.items.group.features.motivation"
      ],
      priceKey: "services.items.group.price"
    },
    {
      icon: "🏠",
      titleKey: "services.items.online.title",
      descriptionKey: "services.items.online.description",
      featuresKeys: [
        "services.items.online.features.videos",
        "services.items.online.features.plans",
        "services.items.online.features.support",
        "services.items.online.features.flexible"
      ],
      priceKey: "services.items.online.price"
    },
    {
      icon: "🏢",
      titleKey: "services.items.corporate.title",
      descriptionKey: "services.items.corporate.description",
      featuresKeys: [
        "services.items.corporate.features.corporate",
        "services.items.corporate.features.associations",
        "services.items.corporate.features.seniors",
        "services.items.corporate.features.wellbeing"
      ],
      priceKey: "services.items.corporate.price"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="services" className="section-padding bg-white/90 dark:bg-azure-900/90 backdrop-blur-sm">
      <div className="container-max">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('services.title', 'Mes')} <span className="text-primary-600 dark:text-primary-400">
              {t('services.titleHighlight', 'Services')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('services.subtitle', 'Des solutions adaptées à tous les besoins et tous les budgets pour vous accompagner vers vos objectifs de forme et de bien-être.')}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t(service.titleKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t(service.descriptionKey)}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {service.featuresKeys.map((featureKey, idx) => (
                  <div key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 dark:text-green-400 mr-3">✓</span>
                    <span className="text-sm">{t(featureKey)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-600 pt-6 text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                  {t(service.priceKey)}
                </div>
                <motion.button
                  className="btn-primary w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('services.choose', 'Choisir ce service')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center bg-gray-50 dark:bg-gray-700 rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('services.unsure.title', 'Pas sûr du service qui vous convient ?')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('services.unsure.subtitle', 'Discutons de vos objectifs lors d\'un appel gratuit de 15 minutes')}
          </p>
          <motion.a
            href="#contact"
            className="btn-secondary inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('services.unsure.cta', 'Appel Gratuit')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;