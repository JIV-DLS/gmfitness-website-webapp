import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from '@/hooks/useI18n';

const Contact = () => {
  const { t } = useI18n();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [selectedObjectives, setSelectedObjectives] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Ce champ est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Ce champ est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Ce champ est requis';
    }
    
    if (!formData.service) {
      newErrors.service = 'Ce champ est requis';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Ce champ est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('submitting');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Formulaire soumis:', formData);
      setStatus('success');
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
        setSelectedObjectives([]);
        setStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Erreur:', error);
      setStatus('error');
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  const services = [
    'Coaching Personnel',
    'Coaching Collectif', 
    'Coaching en Ligne',
    'Coaching Nutrition'
  ];

  const commonObjectives = [
    "💪 Prendre du muscle",
    "⚖️ Perdre du poids", 
    "🏃‍♀️ Améliorer ma condition physique",
    "🩹 Reprendre après une blessure",
    "👰 Préparer un événement (mariage, vacances...)",
    "😌 Réduire le stress",
    "🧘‍♀️ Améliorer ma posture",
    "🔄 Reprendre le sport après une pause"
  ];

  const handleObjectiveToggle = (objective) => {
    const newObjectives = selectedObjectives.includes(objective)
      ? selectedObjectives.filter(obj => obj !== objective)
      : [...selectedObjectives, objective];
    
    setSelectedObjectives(newObjectives);
    
    // Simplified message update without complex regex
    const objectiveText = newObjectives.length > 0 
      ? `Mes objectifs : ${newObjectives.join(', ')}\n\n`
      : '';
    
    // Only use the base message without the objectives part
    const baseMessage = formData.message.split('\n\n').slice(-1)[0] || '';
    
    setFormData({
      ...formData,
      message: objectiveText + baseMessage
    });
  };

  return (
    <section id="contact" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-max">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Contactez <span className="text-primary-600 dark:text-primary-400">Moi</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Prêt à commencer votre transformation ? Contactez-moi dès aujourd'hui !
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Formulaire de contact */}
          <motion.div
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Envoyez-moi un message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  placeholder="Votre nom et prénom"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  placeholder="votre.email@exemple.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  placeholder="+33 1 23 45 67 89"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type de coaching *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.service ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                >
                  <option value="">Choisir un service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
                {errors.service && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.service}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>

                {/* Suggestions d'objectifs */}
                <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-3">
                    💡 Sélectionnez vos objectifs (optionnel)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {commonObjectives.map((objective, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleObjectiveToggle(objective)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedObjectives.includes(objective)
                            ? 'bg-primary-500 text-white shadow-md transform scale-105'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                        }`}
                      >
                        {objective}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none`}
                  placeholder="Décrivez vos objectifs, votre niveau actuel, vos disponibilités..."
                />
                {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                  status === 'submitting'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg'
                }`}
                whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
              >
                {status === 'submitting' && '⏳ Envoi en cours...'}
                {status === 'success' && '✅ Message envoyé !'}
                {status === 'error' && '❌ Erreur - Réessayer'}
                {status === 'idle' && '📧 Envoyer le message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Informations de contact */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Informations de Contact
            </h3>

            <div className="grid gap-6">
              <div className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl">📍</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Adresse</h4>
                  <p className="text-gray-600 dark:text-gray-300">Salle de Sport Premium</p>
                  <p className="text-gray-600 dark:text-gray-300">123 Rue du Fitness</p>
                  <p className="text-gray-600 dark:text-gray-300">75001 Paris</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl">📞</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Téléphone</h4>
                  <p className="text-gray-600 dark:text-gray-300">+33 1 23 45 67 89</p>
                  <p className="text-gray-600 dark:text-gray-300">Disponible 7j/7</p>
                  <p className="text-gray-600 dark:text-gray-300">6h - 21h</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl">✉️</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h4>
                  <p className="text-gray-600 dark:text-gray-300">contact@gmfitness.fr</p>
                  <p className="text-gray-600 dark:text-gray-300">Réponse sous 24h</p>
                  <p className="text-gray-600 dark:text-gray-300">Support prioritaire</p>
                </div>
              </div>
            </div>

            {/* Offre Spéciale */}
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">🎁 Offre Spéciale</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Première séance d'évaluation <strong>100% gratuite</strong> pour tous les nouveaux clients.
                Aucun engagement, découvrez ma méthode sans risque !
              </p>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                ⭐ Bilan complet • 📋 Plan personnalisé • 🥗 Conseils nutrition
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;