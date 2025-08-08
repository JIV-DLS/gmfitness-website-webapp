import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp, 
  FaYoutube, 
  FaTiktok, 
  FaLinkedinIn 
} from 'react-icons/fa';

/**
 * Composant pour afficher les icônes des réseaux sociaux
 * Pattern: Component avec props configurables
 */
export const SocialIcons = ({
  platforms = ['facebook', 'instagram', 'whatsapp'],
  variant = 'default', // 'default', 'compact', 'footer'
  showLabels = true,
  className = ''
}) => {
  
  const socialPlatforms = {
    facebook: {
      icon: FaFacebookF,
      label: 'Facebook',
      href: 'https://www.facebook.com/Gilson.Coach.sportif?mibextid=wwXIfr&rdid=QgqBM7sS9veZaLZg&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FtFnpwVeu%2F%3Fmibextid%3DwwXIfr%26al_applink_data%3D%257B%2522qpl_join_id%2522%253A%25226D8E0BF6-CEE4-4945-8EE1-0E35C5A73D58%2522%257D%26from_xma_click%3Dxma_e2ee%26tam_xma_content_type%3D2000%26is_fb_content%3Dtrue%26forward%3Dfalse%26ts%3D1754476913124%26pl%3D1',
      color: 'hover:!bg-blue-600 hover:!border-blue-600',
      bgColor: 'bg-blue-600'
    },
    instagram: {
      icon: FaInstagram,
      label: 'Instagram',
      href: 'https://www.instagram.com/gilson_mendes_coach_sportif/',
      color: 'hover:!bg-gradient-to-r hover:!from-purple-500 hover:!to-pink-500 hover:!border-purple-500',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    whatsapp: {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      href: 'https://wa.me/33617043599?text=Bonjour, je souhaite avoir des informations sur vos services de coaching',
      color: 'hover:!bg-green-500 hover:!border-green-500',
      bgColor: 'bg-green-500'
    },
    twitter: {
      icon: FaTwitter,
      label: 'Twitter',
      href: 'https://twitter.com/gilsonmendes_coach',
      color: 'hover:bg-blue-400',
      bgColor: 'bg-blue-400'
    },
    youtube: {
      icon: FaYoutube,
      label: 'YouTube',
      href: 'https://youtube.com/@Gilson.Mendes-Fitness',
      color: 'hover:!bg-red-600 hover:!border-red-600',
      bgColor: 'bg-red-600'
    },
    tiktok: {
      icon: FaTiktok,
      label: 'TikTok',
      href: 'https://www.tiktok.com/@gilson.coach?_r=1&_d=secCgYIASAHKAESPgo8Ffwa3cTjnC5Bp2IT7%2BzrkDzY8ingcX0oRtElMbDz6nVrFTwLpFUGxXOsRmVzt78V3c5GwlPljCa%2BVuyHGgA%3D&_svg=2&checksum=e90ca44a4e9707a02e8068d3b4f2c816f9b792978f51037839afbc5a35a1b718&item_author_type=1&sec_uid=MS4wLjABAAAAFGtOv8D8wloT4qyM6Dxf1ldLDnQpYrk73ravVLKifkmXiB9nWZ1EawQpcDPmqalX&sec_user_id=MS4wLjABAAAAFGtOv8D8wloT4qyM6Dxf1ldLDnQpYrk73ravVLKifkmXiB9nWZ1EawQpcDPmqalX&share_app_id=1233&share_author_id=7334072145071277089&share_link_id=A87E8DF8-A5D9-4ABC-8AF2-20F5FBF2FC00&share_scene=1&sharer_language=fr&social_share_type=4&source=h5_m&timestamp=1754477359&tt_from=copy&u_code=ecf730ebbg5md0&ug_btm=b8727%2Cb0&user_id=7334072145071277089&utm_campaign=client_share&utm_medium=ios&utm_source=copy',
      color: 'hover:!bg-black hover:!border-black',
      bgColor: 'bg-black'
    },
    linkedin: {
      icon: FaLinkedinIn,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/gml-fitness',
      color: 'hover:!bg-blue-700 hover:!border-blue-700',
      bgColor: 'bg-blue-700'
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'flex flex-wrap gap-2',
          button: 'w-8 h-8 rounded-lg',
          icon: 'text-sm',
          text: 'text-xs'
        };
      case 'footer':
        return {
          container: 'flex flex-wrap gap-4',
          button: 'w-10 h-10 rounded-lg bg-gray-800 hover:bg-primary-600',
          icon: 'text-lg',
          text: 'text-sm'
        };
      default:
        return {
          container: 'flex flex-wrap gap-3',
          button: 'px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 flex-1 min-w-[120px] sm:flex-none transition-all duration-300',
          icon: 'text-lg',
          text: 'text-sm'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} ${className}`}>
      {platforms.map((platform) => {
        const social = socialPlatforms[platform];
        if (!social) return null;

        const IconComponent = social.icon;

        return (
          <motion.a
            key={platform}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.button} flex items-center justify-center transition-all duration-300 ${
              variant === 'footer' 
                ? social.color 
                : variant === 'default'
                  ? `group ${social.color}`
                  : social.color
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={social.label}
          >
            <IconComponent className={`${styles.icon} ${
              variant === 'footer' 
                ? 'text-white' 
                : variant === 'default'
                  ? 'text-gray-600 dark:text-white group-hover:text-white'
                  : 'text-white'
            }`} />
            {showLabels && variant === 'default' && (
              <span className={`ml-2 ${styles.text} text-gray-600 dark:text-white group-hover:text-white font-medium`}>
                {social.label}
              </span>
            )}
          </motion.a>
        );
      })}
    </div>
  );
};

/**
 * Bouton WhatsApp flottant
 * Pattern: Fixed positioning + Animation
 */
export const WhatsAppFloat = ({ 
  message = "Bonjour, je souhaite avoir des informations sur vos services de coaching",
  className = ''
}) => {
  const phoneNumber = "33617043599"; // Gilson Mendes - 06 17 04 35 99
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      title="Contactez-nous sur WhatsApp"
    >
      <FaWhatsapp className="text-white text-xl" />
    </motion.a>
  );
};

/**
 * Section réseaux sociaux complète
 * Pattern: Composite + Configuration
 */
export const SocialMediaSection = ({ 
  title = "💬 Réseaux Sociaux",
  description = "Suivez mes conseils et découvrez les transformations de mes clients",
  platforms = ['facebook', 'tiktok', 'instagram', 'whatsapp'],
  variant = 'default',
  className = ''
}) => {
  return (
    <div className={`bg-gray-900 dark:bg-gray-700 rounded-2xl p-6 text-white shadow-lg dark:shadow-xl dark:shadow-gray-950/50 ${className}`}>
      <h4 className="font-bold mb-4">{title}</h4>
      <p className="mb-4 text-gray-300 dark:text-gray-400">
        {description}
      </p>
      <SocialIcons 
        platforms={platforms}
        variant={variant}
        showLabels={true}
      />
    </div>
  );
};