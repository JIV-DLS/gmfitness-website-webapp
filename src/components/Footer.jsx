import { motion } from "framer-motion";
import { useI18n } from '@/hooks/useI18n';
import { SocialIcons } from '@/components/common/SocialIcons';
import { useEffect } from 'react';

const Footer = () => {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  // Gérer les événements du formulaire Sendinblue
  useEffect(() => {
    const handleFormSubmit = (event) => {
      const form = document.getElementById('sib-form');
      if (form && event.target === form) {
        // Gérer la soumission du formulaire
        const successMsg = document.getElementById('success-message');
        const errorMsg = document.getElementById('error-message');
        
        // Masquer les messages existants
        successMsg?.classList.add('hidden');
        errorMsg?.classList.add('hidden');
        
        // Simuler un délai pour les réponses serveur
        setTimeout(() => {
          // En cas de succès (le script Sendinblue gère la vraie logique)
          if (successMsg) {
            successMsg.classList.remove('hidden');
          }
        }, 1000);
      }
    };

    const handleFormError = () => {
      const errorMsg = document.getElementById('error-message');
      const successMsg = document.getElementById('success-message');
      
      successMsg?.classList.add('hidden');
      errorMsg?.classList.remove('hidden');
    };

    // Écouter les événements du formulaire
    document.addEventListener('submit', handleFormSubmit);
    window.addEventListener('sib-form-error', handleFormError);
    
    return () => {
      document.removeEventListener('submit', handleFormSubmit);
      window.removeEventListener('sib-form-error', handleFormError);
    };
  }, []);

  const footerLinks = {
    services: [
      { name: t('footer.services.personal'), href: "#services" },
      { name: t('footer.services.group'), href: "#services" },
      { name: t('footer.services.online'), href: "#services" },
      { name: t('footer.services.nutrition'), href: "#services" }
    ],
    company: [
      { name: t('footer.navigation.about'), href: "#about" },
      { name: t('footer.navigation.services'), href: "#services" },
      { name: t('footer.navigation.contact'), href: "#contact" },
      { name: t('footer.navigation.testimonials'), href: "#testimonials" }
    ],
    legal: [
      { name: t('footer.legal.terms'), href: "#" },
      { name: t('footer.legal.conditions'), href: "#" },
      { name: t('footer.legal.privacy'), href: "#" },
      { name: t('footer.legal.cookies'), href: "#" }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-azure-900 via-ocean-900 to-azure-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary-400 mb-4">
                  {t('footer.brand.name')}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  {t('footer.brand.description')}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="mr-3 text-primary-400">📍</span>
                  <span>{t('footer.brand.location')}</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="mr-3 text-primary-400">📞</span>
                  <span>{t('footer.brand.phone')}</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="mr-3 text-primary-400">✉️</span>
                  <span>{t('footer.brand.email')}</span>
                </div>
              </div>
            </motion.div>

            {/* Services Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold mb-6 text-white">{t('footer.services.title')}</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Navigation</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4 lg:col-span-1"
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Restez Connecté</h4>
              
              <div className="mb-6">
                <p className="text-gray-300 mb-4 text-sm">
                  Recevez mes conseils fitness et nutrition chaque semaine
                </p>
                
                {/* Newsletter Sendinblue/Brevo - Native Integration */}
                <div className="w-full max-w-md mx-auto lg:mx-0">
                  <div id="sib-form-container" className="sib-form-container">
                    {/* Success Message */}
                    <div id="success-message" className="hidden p-3 mb-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                          Votre inscription est confirmée ! 🎉
                        </span>
                      </div>
                    </div>

                    {/* Error Message */}
                    <div id="error-message" className="hidden p-3 mb-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                          Erreur lors de l'inscription. Veuillez réessayer.
                        </span>
                      </div>
                    </div>

                    {/* Newsletter Form */}
                    <form id="sib-form" method="POST" action="https://15e78585.sibforms.com/serve/MUIFAOR33He0VWnsOQmpAvAtRpFiMsvng1pHRsBHghAl2ajsEQNwtlKnYSh6H-vVyzcH2LENvwVsCEB5WLyPex6fk1blDa7YXDcQxTd8_rwu_yIqwh8xQJbc8sZZ1VIRITfktw1Db2nW894YDTWc7RacalYRm9knk-9mwS6G3Ck-3zY5fRmaX_SvN4eIgHUn5L0cwcNVMB3Gfgt_" data-type="subscription" noValidate>
                      
                      {/* Email Input */}
                      <div className="mb-4">
                        <label htmlFor="EMAIL" className="block text-sm font-medium text-gray-300 mb-2">
                          Votre adresse email
                        </label>
                        <input
                          type="email"
                          id="EMAIL"
                          name="EMAIL"
                          autoComplete="email"
                          placeholder="exemple@email.com"
                          required
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-white placeholder-gray-400 text-sm"
                        />
                        <div className="error-message text-red-400 text-xs mt-1 hidden"></div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="mr-2">📧</span>
                        S'inscrire à la Newsletter
                      </motion.button>

                      {/* Hidden Fields */}
                      <input type="text" name="email_address_check" value="" className="hidden" aria-hidden="true" />
                      <input type="hidden" name="locale" value="fr" />
                    </form>
                  </div>
                </div>
              </div>

                              <div>
                <p className="text-gray-300 mb-4 text-sm">Suivez-nous</p>
                <SocialIcons 
                  platforms={['facebook', 'tiktok', 'instagram', 'whatsapp', 'youtube']}
                  variant="footer"
                  showLabels={false}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Footer */}
        <motion.div
          className="border-t border-azure-700/30 py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-300">
              © {currentYear} GML Fitness. Tous droits réservés.
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {footerLinks.legal.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <motion.a
              href="#accueil"
              className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors"
              whileHover={{ y: -5 }}
            >
              <span className="mr-2">↑</span>
              Retour en haut
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;