# 📧 Guide d'activation des emails pour Séance Découverte Gratuite

## 🎯 SOLUTION 1 : EmailJS (RECOMMANDÉE - GRATUIT)

### Étape 1 : Créer un compte EmailJS
1. Allez sur [emailjs.com](https://www.emailjs.com/)
2. Créez un compte gratuit (100 emails/mois gratuits)
3. Vérifiez votre email

### Étape 2 : Configurer le service email
1. Dans le dashboard EmailJS, cliquez sur "Email Services"
2. Cliquez "Add New Service"
3. Choisissez votre fournisseur (Gmail, Yahoo, Outlook, etc.)
4. Suivez les instructions pour connecter votre email
5. **Notez le Service ID** (ex: service_abc123)

### Étape 3 : Créer un template d'email
1. Cliquez sur "Email Templates"
2. Cliquez "Create New Template"
3. Utilisez ce template :

```html
Nouveau message - Séance Découverte Gratuite

Nom: {{name}}
Email: {{email}}
Téléphone: {{phone}}
Service souhaité: {{service}}

Message:
{{message}}

---
Envoyé depuis le site GM Fitness
```

4. **Notez le Template ID** (ex: template_xyz789)

### Étape 4 : Récupérer la clé publique
1. Allez dans "Account" > "General"
2. **Notez votre Public Key** (ex: user_def456)

### Étape 5 : Activer dans votre site
Modifiez le fichier `src/services/EmailService.ts` :

```javascript
// Remplacez les valeurs vides par vos vraies clés
const emailJSProvider = new EmailJSProvider(
  'service_abc123',  // Votre Service ID
  'template_xyz789', // Votre Template ID  
  'user_def456'      // Votre Public Key
);
```

## 🎯 SOLUTION 2 : Netlify Forms (Si vous voulez changer d'hébergement)

Si vous migrez vers Netlify au lieu de GitHub Pages :

### Avantages :
- ✅ Gratuit jusqu'à 100 soumissions/mois
- ✅ Très simple à configurer
- ✅ Emails directement dans votre boîte
- ✅ Dashboard de gestion des formulaires

### Configuration :
1. Hébergez sur Netlify
2. Le code est déjà prêt dans `NetlifyFormsProvider`
3. Aucune configuration supplémentaire nécessaire

## 🎯 SOLUTION 3 : API Custom (Pour plus de contrôle)

Si vous voulez votre propre système backend :

### Options recommandées :
1. **Formspree** (gratuit 50 formulaires/mois)
2. **Getform** (gratuit 25 formulaires/mois)
3. **FormSubmit** (gratuit illimité)

## 🚀 ACTIVATION IMMÉDIATE

### Pour activer EmailJS maintenant :

1. **Installez EmailJS :**
```bash
npm install @emailjs/browser
```

2. **Modifiez `src/services/EmailService.ts` ligne 28-29 :**
```javascript
// AVANT (simulation)
console.log('Envoi via EmailJS:', data);

// REMPLACEZ PAR (vrai envoi)
import emailjs from '@emailjs/browser';

const result = await emailjs.send(
  this.serviceId,
  this.templateId,
  {
    name: data.name,
    email: data.email,
    phone: data.phone,
    service: data.service,
    message: data.message
  },
  this.publicKey
);
```

3. **Ajoutez vos vraies clés**
4. **Redéployez le site**

## 📨 RÉSULTAT

Une fois activé, quand un visiteur remplit le formulaire "Séance Découverte Gratuite" :

1. ✅ **Vous recevez un email** avec toutes les infos
2. ✅ **Le client voit** "Message envoyé !"
3. ✅ **Vous pouvez répondre** directement par email
4. ✅ **Statistiques** dans le dashboard EmailJS

## 🔧 SUPPORT

Si vous avez besoin d'aide pour configurer :
1. Je peux vous guider étape par étape
2. Je peux modifier le code pour vous
3. Je peux tester avec vos clés EmailJS

**Voulez-vous que je vous aide à configurer EmailJS maintenant ?**