import { motion } from "framer-motion";
import { useState } from "react";
import { Map } from '@/components/common/Map';
import { SocialIcons } from '@/components/common/SocialIcons';

const Contact = () => {
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
    if (!e?.target) return;
    
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Ce champ est requis';
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = 'Ce champ est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.phone?.trim()) {
      newErrors.phone = 'Ce champ est requis';
    }
    
    if (!formData.service) {
      newErrors.service = 'Ce champ est requis';
    }
    
    if (!formData.message?.trim()) {
      newErrors.message = 'Ce champ est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

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
    'Coaching Individuel',
    'Coaching Collectif',
    'Programmes en Ligne', 
    'Interventions Entreprises'
  ];

  const commonObjectives = [
    "💪 Prendre du muscle",
    "⚖️ Perdre du poids", 
    "🏃‍♀️ Améliorer ma condition physique",
    "🩹 Reprendre après une blessure",
    "👰 Préparer un événement (mariage, vacances...)",
    "😌 Réduire le stress",
    "🧘‍♀️ Améliorer ma posture",
    "🔄 Reprendre le sport après une pause",
    "💯 Gagner en confiance en soi",
    "🏋️‍♀️ Améliorer ma force",
    "🎯 Perdre du ventre",
    "✨ Tonifier mon corps",
    "🫁 Améliorer mon endurance",
    "🥗 Corriger mes habitudes alimentaires",
    "📅 Me motiver à faire du sport régulièrement",
    "🏆 Atteindre mes objectifs rapidement"
  ];

  const handleObjectiveToggle = (objective) => {
    const newObjectives = selectedObjectives.includes(objective)
      ? selectedObjectives.filter(obj => obj !== objective)
      : [...selectedObjectives, objective];
    
    setSelectedObjectives(newObjectives);
    
    const objectiveText = newObjectives.length > 0 
      ? `Mes objectifs : ${newObjectives.join(', ')}\n\n`
      : '';
    
    const currentMessage = (formData.message || '').replace(/^Mes objectifs : .*?\n\n/, '');
    
    setFormData(prev => ({
      ...prev,
      message: objectiveText + currentMessage
    }));
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-ocean-50/80 to-azure-100/80 dark:from-ocean-900/80 dark:to-azure-800/80 backdrop-blur-sm">
      <div className="container-max">
        <motion.div
          className="text-center mb-8 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
            Commençons Votre <span className="text-primary-600 dark:text-primary-400">Transformation</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Prêt à atteindre vos objectifs ? Contactez-moi dès maintenant pour une séance découverte gratuite.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Formulaire de contact */}
          <motion.div
            className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 lg:p-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
              Séance Découverte Gratuite
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
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
                  className={`w-full px-3 lg:px-4 py-2 lg:py-3 rounded-lg border ${
                    errors.name 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  placeholder="Votre nom complet"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
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
                  className={`w-full px-3 lg:px-4 py-2 lg:py-3 rounded-lg border ${
                    errors.phone 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  placeholder="+33 6 XX XX XX XX"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
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
                  className={`w-full px-3 lg:px-4 py-2 lg:py-3 rounded-lg border ${
                    errors.email 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                  placeholder="votre.email@exemple.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Service souhaité *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-3 lg:px-4 py-2 lg:py-3 rounded-lg border ${
                    errors.service 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                >
                  <option value="">Sélectionnez un service</option>
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
                
                <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-3">
                    💡 Sélectionnez vos objectifs (cliquez pour ajouter) :
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {commonObjectives.map((objective, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleObjectiveToggle(objective)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                          selectedObjectives.includes(objective)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30'
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
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none`}
                  placeholder="Ajoutez des détails : votre niveau actuel, vos disponibilités, contraintes particulières, expériences passées..."
                />
                
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  💬 Plus vous êtes précis, plus je pourrai vous proposer un programme adapté !
                </div>
                
                {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                  status === 'submitting'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : status === 'success'
                    ? 'bg-green-500 hover:bg-green-600'
                    : status === 'error'
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'btn-primary'
                }`}
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
              >
                {status === 'submitting' && '⏳ Envoi en cours...'}
                {status === 'success' && '✅ Message envoyé !'}
                {status === 'error' && '❌ Erreur - Réessayer'}
                {status === 'idle' && '🚀 Réserver ma séance gratuite'}
              </motion.button>
            </form>
          </motion.div>

          {/* Informations de contact - HARDCODED NO MAPPING */}
          <motion.div
            className="space-y-6 lg:space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
              Informations de Contact
            </h3>

            {/* Contact info hardcoded - NO MAPPING */}
            <div className="grid gap-4 lg:gap-6">
              <div className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="text-2xl">📍</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Localisation</h4>
                  <p className="text-gray-600 dark:text-gray-300">Côte d'Azur</p>
                  <p className="text-gray-600 dark:text-gray-300">Déplacements possibles</p>
                  <p className="text-gray-600 dark:text-gray-300">À domicile ou en extérieur</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="text-2xl">📞</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Téléphone</h4>
                  <p className="text-gray-600 dark:text-gray-300">06 17 04 35 99</p>
                  <p className="text-gray-600 dark:text-gray-300">Disponible 7j/7</p>
                  <p className="text-gray-600 dark:text-gray-300">Réponse rapide</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="text-2xl">📱</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Instagram</h4>
                  <p className="text-gray-600 dark:text-gray-300">@gilsonmendes_coach</p>
                  <p className="text-gray-600 dark:text-gray-300">Conseils quotidiens</p>
                  <p className="text-gray-600 dark:text-gray-300">Transformations clients</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 lg:space-x-4 p-3 lg:p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="text-2xl">⏰</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Horaires</h4>
                  <p className="text-gray-600 dark:text-gray-300">Sur rendez-vous</p>
                  <p className="text-gray-600 dark:text-gray-300">Flexibilité horaire</p>
                  <p className="text-gray-600 dark:text-gray-300">Séances adaptées</p>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">🎁 Offre Spéciale</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Première séance d'évaluation 100% gratuite pour tous les nouveaux clients. Aucun engagement, découvrez ma méthode sans risque !
              </p>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                ⭐ Bilan complet • 📋 Plan personnalisé • 🥗 Conseils nutrition
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-2xl p-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Réseaux Sociaux</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Suivez mes conseils et découvrez les transformations de mes clients
              </p>
              <SocialIcons
                platforms={['instagram', 'facebook', 'tiktok', 'whatsapp', 'youtube']}
                variant="default"
                showLabels={true}
              />
            </div>
          </motion.div>
        </div>

        {/* Carte des lieux de séances */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Lieux de séances
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez les différents lieux où nous pouvons nous entraîner ensemble. Je me déplace également à votre domicile dans toute la Côte d'Azur.
            </p>
          </div>
          
          <Map />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;