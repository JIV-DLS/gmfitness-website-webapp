# 📧 Instructions EmailJS - Configuration Complète

## 🎯 ÉTAPE 1 : Créer le compte EmailJS

1. Allez sur [emailjs.com](https://www.emailjs.com/)
2. Cliquez "Sign Up"
3. Créez votre compte (gratuit)
4. Vérifiez votre email

## 🔧 ÉTAPE 2 : Ajouter votre service email

1. Dans le dashboard, cliquez **"Email Services"**
2. Cliquez **"Add New Service"**
3. Choisissez votre fournisseur :
   - **Gmail** (recommandé)
   - **Outlook/Hotmail**
   - **Yahoo**
   - Ou autre
4. Suivez les instructions pour connecter votre compte
5. **📝 NOTEZ LE SERVICE ID** (ex: `service_abc123`)

## 📝 ÉTAPE 3 : Créer le template d'email

1. Cliquez **"Email Templates"**
2. Cliquez **"Create New Template"**
3. **Nom du template :** `GM Fitness - Séance Découverte`

### Option A : Template HTML (Professionnel)
- Copiez tout le contenu du fichier `emailjs-template.html`
- Collez-le dans l'éditeur EmailJS

### Option B : Template Simple (Basique)
- Copiez tout le contenu du fichier `emailjs-template-simple.txt`
- Collez-le dans l'éditeur EmailJS

4. **📝 NOTEZ LE TEMPLATE ID** (ex: `template_xyz789`)

## 🔑 ÉTAPE 4 : Récupérer la clé publique

1. Allez dans **"Account"** > **"General"**
2. Dans la section "Public Key"
3. **📝 NOTEZ VOTRE PUBLIC KEY** (ex: `user_def456`)

## ⚙️ ÉTAPE 5 : Configurer les variables

### Variables à utiliser dans EmailJS :

| Variable EmailJS | Correspond à | Description |
|------------------|--------------|-------------|
| `{{name}}`       | Nom du client | Nom complet saisi |
| `{{email}}`      | Email client | Adresse email |
| `{{phone}}`      | Téléphone | Numéro de téléphone |
| `{{service}}`    | Service | Type de coaching demandé |
| `{{message}}`    | Message | Objectifs et message libre |

### Variables automatiques disponibles :
- `{{date}}` - Date d'envoi
- `{{time}}` - Heure d'envoi

## 🎯 ÉTAPE 6 : Tester le template

1. Dans EmailJS, cliquez **"Test"** sur votre template
2. Remplissez les champs test :
   - name: `Test Client`
   - email: `test@example.com`
   - phone: `06 12 34 56 78`
   - service: `Coaching Individuel`
   - message: `Test de message`
3. Envoyez le test
4. Vérifiez que vous recevez l'email

## 🚀 ÉTAPE 7 : Activer sur le site

Une fois que vous avez vos 3 clés, dites-moi :

```
Service ID: service_abc123
Template ID: template_xyz789
Public Key: user_def456
```

Et je modifierai le code pour activer l'envoi d'emails !

## 📧 RÉSULTAT FINAL

Après activation, quand quelqu'un remplit le formulaire :

1. ✅ **Vous recevez un email** avec toutes les infos
2. ✅ **Design professionnel** (ou simple selon votre choix)
3. ✅ **Boutons d'action rapide** :
   - Répondre par email
   - Appeler directement
   - Contacter par WhatsApp
4. ✅ **Toutes les informations** nécessaires pour le suivi

## 💡 CONSEILS

### Email de réception recommandé :
- Utilisez votre email principal (Gmail/Outlook)
- Créez un dossier "Leads GM Fitness" pour organiser

### Réponse rapide :
- Répondez dans les 2h pour maximiser les conversions
- Utilisez les boutons rapides du template
- Proposez 2-3 créneaux pour la séance découverte

**Prêt à configurer ? Suivez les étapes et envoyez-moi vos 3 clés !** 🚀