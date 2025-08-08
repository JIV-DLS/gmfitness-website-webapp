import { ContactFormData } from '@/types/forms';
import { ApiResponse } from '@/types/common';

/**
 * Service d'envoi d'emails utilisant le pattern Strategy
 * Permet de changer facilement le provider (EmailJS, Netlify, API custom)
 */
export interface EmailProvider {
  sendEmail(data: ContactFormData): Promise<ApiResponse>;
}

/**
 * Provider pour EmailJS - REAL IMPLEMENTATION
 */
export class EmailJSProvider implements EmailProvider {
  private serviceId: string;
  private coachTemplateId: string;
  private clientTemplateId: string;
  private publicKey: string;

  constructor(serviceId: string, coachTemplateId: string, clientTemplateId: string, publicKey: string) {
    this.serviceId = serviceId;
    this.coachTemplateId = coachTemplateId;
    this.clientTemplateId = clientTemplateId;
    this.publicKey = publicKey;
  }

  async sendEmail(data: ContactFormData): Promise<ApiResponse> {
    try {
      // Import EmailJS statically at the top of file instead
      const emailjs = await import('@emailjs/browser');
      
      console.log('📧 Début envoi EmailJS...');
      console.log('📧 Configuration:', {
        service: this.serviceId,
        coachTemplate: this.coachTemplateId,
        clientTemplate: this.clientTemplateId,
        publicKey: this.publicKey?.substring(0, 5) + '...' // Log partial key for security
      });
      console.log('📧 Data:', { name: data.name, email: data.email, service: data.service });

      // Initialize EmailJS with public key
      emailjs.default.init(this.publicKey);

      // Préparer les données pour les templates
      const templateParams = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message,
        date: new Date().toLocaleDateString('fr-FR'),
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };

      console.log('📧 Template params:', templateParams);

      // Envoi 1: Email au coach (notification)
      console.log('📧 Envoi email coach...');
      const coachResult = await emailjs.default.send(
        this.serviceId,
        this.coachTemplateId,
        {
          ...templateParams,
          to_email: 'gilson.mendes@gmail.com' // Votre email de réception
        }
      );

      console.log('✅ Email coach envoyé:', coachResult);

      // Envoi 2: Auto-reply au client
      console.log('📧 Envoi email client...');
      const clientResult = await emailjs.default.send(
        this.serviceId,
        this.clientTemplateId,
        {
          ...templateParams,
          to_email: data.email // Votre email de réception
        }
      );

      console.log('✅ Email client envoyé:', clientResult);

      return {
        success: true,
        message: '📧 Emails envoyés avec succès ! Coach notifié + Client confirmé.',
        data: {
          coachEmailId: coachResult.text,
          clientEmailId: clientResult.text
        }
      };

    } catch (error) {
      console.error('❌ Erreur EmailJS complète:', error);
      console.error('❌ Error name:', error.name);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error stack:', error.stack);
      
      return {
        success: false,
        error: error instanceof Error ? `EmailJS Error: ${error.message}` : 'Erreur EmailJS inconnue'
      };
    }
  }
}

/**
 * Provider pour Netlify Forms
 */
export class NetlifyFormsProvider implements EmailProvider {
  async sendEmail(data: ContactFormData): Promise<ApiResponse> {
    try {
      const formData = new FormData();
      formData.append('form-name', 'contact');
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Message envoyé avec succès'
        };
      } else {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur d\'envoi'
      };
    }
  }
}

/**
 * Provider pour API custom
 */
export class CustomApiProvider implements EmailProvider {
  private apiEndpoint: string;

  constructor(apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint;
  }

  async sendEmail(data: ContactFormData): Promise<ApiResponse> {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: result,
          message: 'Message envoyé avec succès'
        };
      } else {
        throw new Error(result.message || 'Erreur serveur');
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur de connexion'
      };
    }
  }
}

/**
 * Service principal d'email utilisant le pattern Strategy
 */
export class EmailService {
  private static instance: EmailService;
  private provider: EmailProvider;

  private constructor(provider: EmailProvider) {
    this.provider = provider;
  }

  public static getInstance(provider?: EmailProvider): EmailService {
    if (!EmailService.instance) {
      if (!provider) {
        // Provider par défaut - REAL EmailJS avec vos clés
        provider = new EmailJSProvider(
          'service_kkc0gz7',        // Votre Service ID
          'template_cw3v3oy',       // Template coach (notification)
          'template_zjtnp3j',       // Template client (auto-reply)
          'JYVZuZEWM9bElEb_B'       // Votre Public Key
        );
      }
      EmailService.instance = new EmailService(provider);
    }
    return EmailService.instance;
  }

  /**
   * Change le provider d'email (Strategy pattern)
   */
  public setProvider(provider: EmailProvider): void {
    this.provider = provider;
  }

  /**
   * Envoie un email via le provider configuré
   */
  public async sendContactEmail(data: ContactFormData): Promise<ApiResponse> {
    try {
      return await this.provider.sendEmail(data);
    } catch (error) {
      return {
        success: false,
        error: 'Service d\'email temporairement indisponible'
      };
    }
  }

  /**
   * Envoie un email de newsletter
   */
  public async sendNewsletterSubscription(email: string, name?: string): Promise<ApiResponse> {
    const newsletterData: ContactFormData = {
      name: name || 'Nouvel abonné',
      email,
      phone: '',
      service: '',
      message: 'Inscription à la newsletter'
    };

    return this.sendContactEmail(newsletterData);
  }
}