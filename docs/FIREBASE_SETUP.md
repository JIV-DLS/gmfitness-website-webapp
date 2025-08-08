# 🔥 Guide de Configuration Firebase

## 🚀 Configuration Initiale

### 1. Créer un Projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com)
2. Cliquez "Créer un projet"
3. Nom du projet : `gmfitness-prod` (ou votre choix)
4. Activez Google Analytics (recommandé)

### 2. Configurer l'Application Web

1. Dans Firebase Console → Paramètres du projet → Applications
2. Cliquez "Ajouter une application" → Web
3. Nom de l'app : `GM Fitness Website`
4. **Copiez la configuration** qui apparaît

### 3. Variables d'Environnement

Créez `.env.local` avec vos vraies valeurs :

```bash
# Copiez .env.example vers .env.local
cp .env.example .env.local

# Éditez avec vos vraies valeurs Firebase
nano .env.local
```

**Exemple de configuration :**
```env
VITE_FIREBASE_API_KEY=AIzaSyC-abcd1234...
VITE_FIREBASE_AUTH_DOMAIN=gmfitness-prod.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gmfitness-prod
VITE_FIREBASE_STORAGE_BUCKET=gmfitness-prod.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🔐 Sécurité Firebase

### 1. Règles Firestore

Les règles sont dans `firestore.rules`. Déployez-les :

```bash
firebase deploy --only firestore:rules
```

**Règles principales :**
- ✅ Lecture publique des témoignages publics
- ✅ Écriture pour utilisateurs authentifiés seulement
- ✅ Validation des données côté serveur
- ✅ Protection contre l'injection/XSS

### 2. Règles Storage

```bash
firebase deploy --only storage
```

**Limitations :**
- 🎥 Vidéos : 100MB max
- 📸 Images : 10MB max  
- 👤 Avatars : 5MB max
- 🔐 Upload pour utilisateurs authentifiés seulement

### 3. Authentication

Activez les méthodes de connexion :

1. Firebase Console → Authentication → Sign-in method
2. Activez :
   - ✅ Email/Password
   - ✅ Google (recommandé)
   - ✅ Facebook (optionnel)

## 🧪 Développement Local avec Emulateurs

### 1. Installer Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 2. Initialiser le Projet

```bash
firebase init
```

Sélectionnez :
- ✅ Firestore
- ✅ Functions  
- ✅ Hosting
- ✅ Storage
- ✅ Emulators

### 3. Démarrer les Emulateurs

```bash
# Démarrer tous les emulateurs
firebase emulators:start

# Ou seulement certains
firebase emulators:start --only firestore,auth,storage
```

**Activez les emulateurs dans `.env.local` :**
```env
VITE_USE_FIREBASE_EMULATORS=true
```

### 4. Interface Web des Emulateurs

URL : http://localhost:4000

- 👤 Auth : Gérer les utilisateurs test
- 🗄️ Firestore : Voir/modifier les données
- 📁 Storage : Gérer les fichiers
- 📊 Logs : Débugger les erreurs

## 🚀 Déploiement en Production

### 1. Build de Production

```bash
npm run build
```

### 2. Déployer sur Firebase Hosting

```bash
# Déployer tout
firebase deploy

# Ou par service
firebase deploy --only hosting
firebase deploy --only firestore:rules
firebase deploy --only storage
```

### 3. Variables d'Environnement Production

Créez `.env.production` pour la prod :

```env
VITE_ENVIRONMENT=production
VITE_FIREBASE_API_KEY=your_prod_api_key
# ... autres variables prod
```

## 🔒 Bonnes Pratiques de Sécurité

### ✅ À FAIRE

1. **Variables d'environnement**
   - ✅ Utilisez toujours `.env.local` pour le dev
   - ✅ `.env.production` pour la prod
   - ✅ Ne committez JAMAIS les vraies clés

2. **Règles Firestore**
   - ✅ Validez toutes les données côté serveur
   - ✅ Utilisez `request.auth.uid` pour l'autorisation
   - ✅ Testez vos règles avec l'émulateur

3. **Gestion des erreurs**
   - ✅ Loggez les erreurs sans exposer les credentials
   - ✅ Utilisez `FirebaseSecurityUtils.secureLog()`
   - ✅ Masquez les informations sensibles

### ❌ À ÉVITER

1. **Credentials en dur**
   - ❌ Jamais de clés API dans le code
   - ❌ Jamais de credentials dans Git
   - ❌ Jamais de console.log avec des tokens

2. **Règles trop permissives**
   - ❌ `allow read, write: if true;`
   - ❌ Pas de validation des données
   - ❌ Règles basées sur les données client

## 📊 Monitoring et Analytics

### 1. Firebase Analytics

Automatiquement activé avec `measurementId` en production.

### 2. Performance Monitoring

```bash
npm install firebase
```

```javascript
import { getPerformance } from 'firebase/performance';

if (import.meta.env.PROD) {
  const perf = getPerformance(app);
}
```

### 3. Crashlytics

Pour le reporting d'erreurs en production.

## 🛠️ Dépannage

### Erreurs Courantes

**1. "Firebase config missing"**
```bash
# Vérifiez votre .env.local
cat .env.local
```

**2. "Permission denied"**
```bash
# Vérifiez vos règles Firestore
firebase firestore:rules:get
```

**3. "Emulator connection failed"**
```bash
# Redémarrez les emulateurs
firebase emulators:start --only firestore,auth
```

**4. "CORS errors"**
- Ajoutez votre domaine dans Firebase Console → Authentication → Settings → Authorized domains

### Logs de Débogage

```javascript
// Mode développement
if (import.meta.env.DEV) {
  console.log('🔥 Firebase config:', firebaseConfig);
}
```

## 📞 Support

- 📖 [Documentation Firebase](https://firebase.google.com/docs)
- 💬 [Stack Overflow - Firebase](https://stackoverflow.com/questions/tagged/firebase)
- 🐛 [Firebase GitHub Issues](https://github.com/firebase/firebase-js-sdk/issues)

---

**⚠️ Important :** Ce guide suppose un usage côté client (React). Pour des opérations côté serveur (Node.js), utilisez Firebase Admin SDK avec des Service Account Keys.