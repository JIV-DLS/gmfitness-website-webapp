#!/bin/bash

# 🔥 Script de Setup Firebase pour GM Fitness
# Ce script configure automatiquement les fichiers nécessaires

echo "🔥 Configuration Firebase pour GM Fitness"
echo "=========================================="

# Créer .env.example si n'existe pas
if [ ! -f ".env.example" ]; then
  echo "📝 Création de .env.example..."
  cat > .env.example << 'EOF'
# 🔥 Firebase Configuration
# Copiez ce fichier vers .env.local et remplissez avec vos vraies valeurs

# Firebase Project Config (ces valeurs ne sont PAS secrètes pour une app frontend)
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Environment
VITE_ENVIRONMENT=development

# 🧪 Emulators (développement local)
VITE_USE_FIREBASE_EMULATORS=false
VITE_FIRESTORE_EMULATOR_HOST=localhost:8080
VITE_AUTH_EMULATOR_HOST=localhost:9099
VITE_STORAGE_EMULATOR_HOST=localhost:9199
VITE_FUNCTIONS_EMULATOR_HOST=localhost:5001
EOF
  echo "✅ .env.example créé"
else
  echo "✅ .env.example existe déjà"
fi

# Créer .env.local template si n'existe pas
if [ ! -f ".env.local" ]; then
  echo "📝 Création de .env.local template..."
  cat > .env.local << 'EOF'
# 🔥 Firebase Configuration - Développement Local
# ⚠️ REMPLACEZ ces valeurs par vos vraies credentials Firebase !

# Firebase Project Config
VITE_FIREBASE_API_KEY=AIzaSyDemo_Replace_With_Your_Real_API_Key
VITE_FIREBASE_AUTH_DOMAIN=gmfitness-demo.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gmfitness-demo
VITE_FIREBASE_STORAGE_BUCKET=gmfitness-demo.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456789
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Environment
VITE_ENVIRONMENT=development

# 🧪 Emulators (pour développement local)
VITE_USE_FIREBASE_EMULATORS=false
EOF
  echo "✅ .env.local template créé"
  echo "⚠️  IMPORTANT: Modifiez .env.local avec vos vraies valeurs Firebase !"
else
  echo "✅ .env.local existe déjà"
fi

# Vérifier .gitignore
if ! grep -q ".env.local" .gitignore; then
  echo "🔐 Mise à jour de .gitignore pour protéger les credentials..."
  echo "" >> .gitignore
  echo "# 🔐 Environment variables (contiennent des credentials)" >> .gitignore
  echo ".env.local" >> .gitignore
  echo ".env.production" >> .gitignore
  echo ".env.development" >> .gitignore
  echo ".env.*.local" >> .gitignore
  echo "✅ .gitignore mis à jour"
else
  echo "✅ .gitignore déjà configuré"
fi

echo ""
echo "🎉 Configuration Firebase terminée !"
echo ""
echo "📝 PROCHAINES ÉTAPES:"
echo "1. Créez un projet Firebase sur https://console.firebase.google.com"
echo "2. Ajoutez une app Web à votre projet"
echo "3. Copiez la configuration dans .env.local"
echo "4. Activez Authentication, Firestore et Storage"
echo "5. Testez avec: npm run dev"
echo ""
echo "📚 Guide complet: voir FIREBASE_CREDENTIALS_GUIDE.md"
echo ""

# Afficher l'état actuel
echo "📋 ÉTAT ACTUEL:"
echo "├── .env.example: $([ -f .env.example ] && echo "✅ Créé" || echo "❌ Manquant")"
echo "├── .env.local: $([ -f .env.local ] && echo "✅ Créé" || echo "❌ Manquant")"
echo "├── firestore.rules: $([ -f firestore.rules ] && echo "✅ Créé" || echo "❌ Manquant")"
echo "├── firebase.json: $([ -f firebase.json ] && echo "✅ Créé" || echo "❌ Manquant")"
echo "└── Guide: $([ -f FIREBASE_CREDENTIALS_GUIDE.md ] && echo "✅ Créé" || echo "❌ Manquant")"

echo ""
echo "🚀 Votre site est prêt pour Firebase !"